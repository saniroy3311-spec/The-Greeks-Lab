import os
import sys
import time
import traceback
import pandas as pd
from datetime import timedelta, datetime
import torch

# Limit PyTorch to 1 thread for CPU execution on 1-core VPS to avoid thread-scheduling overhead
torch.set_num_threads(1)
torch.set_num_interop_threads(1)

# Ensure project path is in sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from model import Kronos, KronosTokenizer, KronosPredictor
from db_cache import SQLiteCache
from data_utils import (
    fetch_candles, _safe_float, LOOKBACK, PRED_LEN, TF_MINUTES, IST
)

# Configuration from environment
MODEL_NAME      = os.environ.get("KRONOS_MODEL", "NeoQuasar/Kronos-small")
TOKENIZER_NAME  = os.environ.get("KRONOS_TOKENIZER", "NeoQuasar/Kronos-Tokenizer-base")
DEVICE          = os.environ.get("KRONOS_DEVICE", "cpu")

print(f"[Worker] Starting prediction worker subprocess on device={DEVICE}...")
print(f"[Worker] Loading tokenizer: {TOKENIZER_NAME}")
tokenizer = KronosTokenizer.from_pretrained(TOKENIZER_NAME)
print(f"[Worker] Loading model: {MODEL_NAME}")
model = Kronos.from_pretrained(MODEL_NAME)
predictor = KronosPredictor(model, tokenizer, device=DEVICE, max_context=512)
print(f"[Worker] Model ready on device={DEVICE}")


def run_prediction(symbol_key, tf_key):
    """Run Kronos on the latest candles and return the signal payload."""
    df = fetch_candles(symbol_key, tf_key)
    if df is None or len(df) < 50:
        raise RuntimeError(f"Only {len(df)} candles available, need more history.")

    x_df = df[["open", "high", "low", "close", "volume"]].copy()
    x_timestamp = df.index.to_series().reset_index(drop=True)

    minutes = TF_MINUTES.get(tf_key, 5)
    freq = timedelta(minutes=minutes)
    last_ts = df.index[-1]
    y_index = pd.date_range(start=last_ts + freq, periods=PRED_LEN, freq=freq)
    y_timestamp = pd.Series(y_index)

    try:
        # Use last 150 candles as context to speed up autoregressive model inference by 3x
        context_len = min(150, len(x_df))
        pred_df = predictor.predict(
            df=x_df.tail(context_len).reset_index(drop=True),
            x_timestamp=x_timestamp.tail(context_len).reset_index(drop=True),
            y_timestamp=y_timestamp,
            pred_len=PRED_LEN,
            T=1.0, top_p=0.9, sample_count=1, verbose=False,
        )
    except Exception as e:
        print(f"[Worker Error] Prediction failed for {symbol_key}:{tf_key}: {e}. Using fallback flat.")
        # Fallback: repeat last candle.
        last_row = x_df.iloc[-1]
        pred_df = pd.DataFrame([last_row.to_dict() for _ in range(PRED_LEN)])

    current = _safe_float(df["close"].iloc[-1])
    pred_5  = _safe_float(pred_df["close"].iloc[min(4, PRED_LEN - 1)], current)
    pred_n  = _safe_float(pred_df["close"].iloc[-1], current)
    move    = pred_n - current
    move_pct = move / current if abs(current) > 1e-12 else 0.0

    if abs(move_pct) < 0.0015:
        direction, action, bias = "Flat", "Skip", "No clear edge"
    elif move_pct > 0:
        direction, action, bias = "Long", "Trade", "Long bias only"
    else:
        direction, action, bias = "Short", "Trade", "Short bias only"

    confidence = int(max(50, min(95, 50 + abs(move_pct) * 4000)))

    # Build candlestick arrays for Candl Canvas Chart (unix seconds, IST-localized)
    hist_candles = [{
        "time": int(ts.timestamp()),
        "open": round(_safe_float(r.open, 0), 2),
        "high": round(_safe_float(r.high, 0), 2),
        "low":  round(_safe_float(r.low, 0), 2),
        "close": round(_safe_float(r.close, 0), 2),
    } for ts, r in zip(df.index, df.itertuples())]

    pred_candles = [{
        "time": int(ts.timestamp()),
        "open": round(_safe_float(o, 0), 2),
        "high": round(_safe_float(h, 0), 2),
        "low":  round(_safe_float(l, 0), 2),
        "close": round(_safe_float(c, 0), 2),
    } for ts, o, h, l, c in zip(
        y_index,
        pred_df["open"], pred_df["high"], pred_df["low"], pred_df["close"])]

    # IST-formatted "updated" field
    ist_now = datetime.now(IST).strftime("%H:%M:%S")

    return {
        "symbol": symbol_key,
        "timeframe": tf_key,
        "direction": direction,
        "action": action,
        "bias": bias,
        "confidence": confidence,
        "current": round(current, 2),
        "pred_5": round(pred_5, 2),
        "pred_n": round(pred_n, 2),
        "move": round(move, 2),
        "move_pct": round(move_pct * 100, 3),
        "pred_len": PRED_LEN,
        "candles": hist_candles,
        "predicted": pred_candles,
        "updated": ist_now,
    }


def get_max_age(tf_key, is_active):
    """Dynamic max age based on timeframe to save resources and CPU."""
    if is_active:
        mapping = {
            "1m": 8,
            "3m": 15,
            "5m": 25,
            "15m": 60,
            "30m": 120,
            "1h": 300,
            "1d": 86400,
        }
    else:
        # Idle/inactive combos: refresh very infrequently to save CPU resources
        mapping = {
            "1m": 1800,
            "3m": 1800,
            "5m": 1800,
            "15m": 3600,
            "30m": 3600,
            "1h": 7200,
            "1d": 86400,
        }
    return mapping.get(tf_key, 30 if is_active else 60)


def background_cache_worker():
    """Continuously computes predictions, checks request queue, and keeps cache fresh."""
    print("[Worker] Background cache loop started.")
    
    # Core list of combinations to keep warm even if no one is watching
    default_combinations = [
        ("NIFTY", "1m"), ("NIFTY", "3m"), ("NIFTY", "5m"), ("NIFTY", "15m"), ("NIFTY", "30m"),
        ("BANKNIFTY", "1m"), ("BANKNIFTY", "3m"), ("BANKNIFTY", "5m"), ("BANKNIFTY", "15m"), ("BANKNIFTY", "30m"),
        ("BTC", "1m"), ("BTC", "3m"), ("BTC", "5m"), ("BTC", "15m"), ("BTC", "30m"),
        ("GOLD", "1m"), ("GOLD", "3m"), ("GOLD", "5m"), ("GOLD", "15m"), ("GOLD", "30m"),
    ]
    
    while True:
        try:
            # 1. Process all pending manual requests from SQLite queue first
            pending = SQLiteCache.get_pending_requests()
            if pending:
                for req_id, sym, tf in pending:
                    key = f"{sym}:{tf}"
                    print(f"[Worker] Processing queued request for {key}")
                    try:
                        res = run_prediction(sym, tf)
                        SQLiteCache.set(key, res)
                        SQLiteCache.mark_request_completed(req_id)
                    except Exception as ex:
                        print(f"[Worker] Error processing queued request {key}: {ex}")
                        SQLiteCache.mark_request_completed(req_id)
                SQLiteCache.clear_old_requests()
                # Yield execution quickly after queue clearing
                time.sleep(0.05)
                continue
            
            # 2. Check scheduled updates for active / default combinations
            now = time.time()
            active_keys = SQLiteCache.get_active_keys(cutoff_seconds=300)
            
            to_update = []
            # Active combos first
            for key in active_keys:
                sym, tf = key.split(":")
                to_update.append((sym, tf, True))
                
            # Default warm combos
            for sym, tf in default_combinations:
                key = f"{sym}:{tf}"
                if key not in active_keys:
                    to_update.append((sym, tf, False))
            
            updated_any = False
            for sym, tf, is_active in to_update:
                # Prioritize any new manual queue requests that might have come in during iteration
                if SQLiteCache.get_pending_requests():
                    break
                    
                key = f"{sym}:{tf}"
                cached = SQLiteCache.get(key)
                max_age = get_max_age(tf, is_active)
                
                # Check age
                if not cached or (now - cached[0]) >= max_age:
                    try:
                        print(f"[Worker] Updating cache for {key} (active={is_active}, age_limit={max_age}s)")
                        res = run_prediction(sym, tf)
                        SQLiteCache.set(key, res)
                        updated_any = True
                        
                        # Throttle based on active vs idle
                        time.sleep(0.5 if is_active else 5.0)
                    except Exception as e:
                        print(f"[Worker Error] Cache update failed for {key}: {e}")
                        time.sleep(1.0)
            
            if not updated_any:
                # If everything is fresh, sleep briefly
                time.sleep(0.2)
                
        except Exception as e:
            print(f"[Worker] Exception in background_cache_worker loop: {e}")
            traceback.print_exc()
            time.sleep(2.0)


if __name__ == "__main__":
    background_cache_worker()
