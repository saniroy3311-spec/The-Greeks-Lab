"""
Kronos Live Trading Dashboard - Backend Server
================================================
Serves:
  - A live auto-refreshing candlestick dashboard (TradingView lightweight-charts)
  - A JSON API that runs the real Kronos model on live NSE data

Run:  python server.py
Open: http://YOUR_VPS_IP:8080
"""

import os
import sys
import time
import threading
import traceback
from datetime import timedelta

import numpy as np
import pandas as pd
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from model import Kronos, KronosTokenizer, KronosPredictor

# ----------------------------------------------------------------------------
# Config (override with environment variables if you want)
# ----------------------------------------------------------------------------
MODEL_NAME      = os.environ.get("KRONOS_MODEL", "NeoQuasar/Kronos-small")
TOKENIZER_NAME  = os.environ.get("KRONOS_TOKENIZER", "NeoQuasar/Kronos-Tokenizer-base")
DEVICE          = os.environ.get("KRONOS_DEVICE", "cpu")   # "cpu" or "cuda:0"
LOOKBACK        = int(os.environ.get("KRONOS_LOOKBACK", "400"))
PRED_LEN        = int(os.environ.get("KRONOS_PRED_LEN", "24"))
PORT            = int(os.environ.get("KRONOS_PORT", "8080"))
CACHE_SECONDS   = int(os.environ.get("KRONOS_CACHE", "10"))  # min seconds between recomputes per symbol/tf

# symbols on yfinance.  ^NSEI = Nifty 50, ^NSEBANK = Bank Nifty, BTC-USD = Bitcoin
SYMBOL_MAP = {
    "NIFTY":     "^NSEI",
    "BANKNIFTY": "^NSEBANK",
    "BTC":       "BTC-USD",
}

# yfinance supports: 1m,2m,5m,15m,30m,60m,90m,1h,1d ... (1m only last 7 days)
TF_MAP = {
    "1m":  ("1m",  "5d"),
    "3m":  ("1m",  "7d"),    # We fetch 1m and resample to 3m
    "5m":  ("5m",  "5d"),
    "15m": ("15m", "1mo"),
    "30m": ("30m", "1mo"),
    "1h":  ("60m", "3mo"),
    "1d":  ("1d",  "2y"),
}
TF_MINUTES = {"1m":1,"3m":3,"5m":5,"15m":15,"30m":30,"1h":60,"1d":1440}

app = Flask(__name__)
CORS(app)

# ----------------------------------------------------------------------------
# Load model once at startup
# ----------------------------------------------------------------------------
print(f"[Kronos] Loading tokenizer: {TOKENIZER_NAME}")
tokenizer = KronosTokenizer.from_pretrained(TOKENIZER_NAME)
print(f"[Kronos] Loading model: {MODEL_NAME}")
model = Kronos.from_pretrained(MODEL_NAME)
predictor = KronosPredictor(model, tokenizer, device=DEVICE, max_context=512)
print(f"[Kronos] Model ready on device={DEVICE}")

_cache = {}        # key -> (timestamp, result_dict)
_cache_lock = threading.Lock()
ACTIVE_COMBINATIONS = {}  # key -> last_request_time


def fetch_candles(symbol_key, tf_key):
    """Pull live OHLCV candles from yfinance and return a clean DataFrame."""
    import yfinance as yf
    ticker = SYMBOL_MAP.get(symbol_key, "^NSEI")
    interval, period = TF_MAP.get(tf_key, ("5m", "5d"))

    df = yf.download(ticker, period=period, interval=interval,
                     progress=False, auto_adjust=False)
    if df is None or len(df) == 0:
        raise RuntimeError(f"No data returned for {ticker} {interval}")

    # yfinance may return a MultiIndex column set; flatten it
    if isinstance(df.columns, pd.MultiIndex):
        df.columns = [c[0] for c in df.columns]
    df.columns = [str(c).lower() for c in df.columns]

    if tf_key == "3m":
        df = df.resample('3min').agg({
            'open': 'first',
            'high': 'max',
            'low': 'min',
            'close': 'last',
            'volume': 'sum'
        })

    df = df[["open", "high", "low", "close", "volume"]].copy()
    df = df.dropna()
    df = df.tail(LOOKBACK)
    df.index = pd.to_datetime(df.index)
    return df


def run_prediction(symbol_key, tf_key):
    """Run Kronos on the latest candles and build a signal dict."""
    df = fetch_candles(symbol_key, tf_key)
    if len(df) < 50:
        raise RuntimeError(f"Only {len(df)} candles available, need more history.")

    x_df = df[["open", "high", "low", "close", "volume"]].copy()
    x_timestamp = df.index.to_series().reset_index(drop=True)

    minutes = TF_MINUTES.get(tf_key, 5)
    freq = timedelta(minutes=minutes)
    last_ts = df.index[-1]
    y_index = pd.date_range(start=last_ts + freq, periods=PRED_LEN, freq=freq)
    y_timestamp = pd.Series(y_index)

    pred_df = predictor.predict(
        df=x_df.reset_index(drop=True),
        x_timestamp=x_timestamp,
        y_timestamp=y_timestamp,
        pred_len=PRED_LEN,
        T=1.0, top_p=0.9, sample_count=1, verbose=False,
    )

    current = float(df["close"].iloc[-1])
    pred_5  = float(pred_df["close"].iloc[min(4, PRED_LEN - 1)])
    pred_n  = float(pred_df["close"].iloc[-1])
    move    = pred_n - current
    move_pct = move / current if current else 0.0

    if abs(move_pct) < 0.0015:
        direction, action, bias = "Flat", "Skip", "No clear edge"
    elif move_pct > 0:
        direction, action, bias = "Long", "Trade", "Long bias only"
    else:
        direction, action, bias = "Short", "Trade", "Short bias only"

    confidence = int(max(50, min(95, 50 + abs(move_pct) * 4000)))

    # Build candlestick arrays for lightweight-charts (unix seconds)
    hist_candles = [{
        "time": int(ts.timestamp()),
        "open": round(float(r.open), 2),
        "high": round(float(r.high), 2),
        "low":  round(float(r.low), 2),
        "close": round(float(r.close), 2),
    } for ts, r in zip(df.index, df.itertuples())]

    pred_candles = [{
        "time": int(ts.timestamp()),
        "open": round(float(o), 2),
        "high": round(float(h), 2),
        "low":  round(float(l), 2),
        "close": round(float(c), 2),
    } for ts, o, h, l, c in zip(
        y_index,
        pred_df["open"], pred_df["high"], pred_df["low"], pred_df["close"])]

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
        "updated": time.strftime("%H:%M:%S"),
    }


@app.route("/")
def index():
    return render_template("dashboard.html")


def background_cache_worker():
    """Background worker to continuously compute predictions and keep cache fresh."""
    print("[Kronos] Background cache worker started.")
    
    # Core list of combinations to keep warm even if no one is watching
    default_combinations = [
        ("NIFTY", "5m"),
        ("BANKNIFTY", "5m"),
        ("BTC", "5m"),
        ("BTC", "3m"),
    ]
    
    while True:
        try:
            now = time.time()
            
            # Identify active combinations (requested in the last 5 minutes)
            active_keys = [
                key for key, last_time in ACTIVE_COMBINATIONS.items()
                if (now - last_time) < 300
            ]
            
            to_update = []
            for key in active_keys:
                sym, tf = key.split(":")
                to_update.append((sym, tf, True))  # (symbol, tf, is_active)
                
            for sym, tf in default_combinations:
                key = f"{sym}:{tf}"
                if key not in active_keys:
                    to_update.append((sym, tf, False))
            
            if not to_update:
                time.sleep(5)
                continue
                
            for sym, tf, is_active in to_update:
                key = f"{sym}:{tf}"
                
                with _cache_lock:
                    cached = _cache.get(key)
                
                # Active combinations updated if older than 10 seconds.
                # Passive (default) combinations updated if older than 90 seconds.
                max_age = 10 if is_active else 90
                
                if not cached or (time.time() - cached[0]) >= max_age:
                    try:
                        result = run_prediction(sym, tf)
                        with _cache_lock:
                            _cache[key] = (time.time(), result)
                    except Exception as e:
                        print(f"[Background Cache] Error updating {key}: {e}")
                        
                # Sleep a short duration to save CPU cycles
                time.sleep(0.5 if is_active else 2.0)
                
        except Exception as e:
            print(f"[Background Cache] Worker error: {e}")
            time.sleep(5)


@app.route("/api/signal/<symbol>/<tf>")
def api_signal(symbol, tf):
    symbol = symbol.upper()
    tf = tf.lower()
    key = f"{symbol}:{tf}"
    now = time.time()

    # Record active client interest
    ACTIVE_COMBINATIONS[key] = now

    with _cache_lock:
        cached = _cache.get(key)
        # Serve immediately if present to make switching instant
        if cached:
            return jsonify(cached[1])

    # Fallback: compute synchronously if not in cache at all
    try:
        result = run_prediction(symbol, tf)
        with _cache_lock:
            _cache[key] = (now, result)
        return jsonify(result)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@app.route("/api/health")
def health():
    return jsonify({"status": "ok", "model": MODEL_NAME, "device": DEVICE})


if __name__ == "__main__":
    print(f"[Kronos] Dashboard:  http://0.0.0.0:{PORT}")
    print(f"[Kronos] API sample: http://0.0.0.0:{PORT}/api/signal/NIFTY/5m")
    
    # Start background cache worker
    bg_thread = threading.Thread(target=background_cache_worker, daemon=True)
    bg_thread.start()
    
    app.run(host="0.0.0.0", port=PORT, threaded=True)
