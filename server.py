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
active_lock = threading.Lock()
prediction_lock = threading.Lock()


def fetch_candles(symbol_key, tf_key):
    """Pull live OHLCV candles and return a clean DataFrame."""
    if symbol_key == "BTC":
        try:
            import requests
            # Map intervals to Binance formats
            binance_tf = tf_key  # 1m, 3m, 5m, 15m, 30m, 1h, 1d are identical
            url = f"https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval={binance_tf}&limit={LOOKBACK}"
            
            headers = {"User-Agent": "Mozilla/5.0"}
            r = requests.get(url, headers=headers, timeout=5)
            r.raise_for_status()
            data = r.json()
            
            df = pd.DataFrame(data, columns=[
                "open_time", "open", "high", "low", "close", "volume",
                "close_time", "quote_volume", "count", "taker_buy_base", "taker_buy_quote", "ignore"
            ])
            
            df["open"] = df["open"].astype(float)
            df["high"] = df["high"].astype(float)
            df["low"] = df["low"].astype(float)
            df["close"] = df["close"].astype(float)
            df["volume"] = df["volume"].astype(float)
            
            df.index = pd.to_datetime(df["open_time"], unit="ms")
            df = df[["open", "high", "low", "close", "volume"]].copy()
            df = df.dropna()
            df = df.tail(LOOKBACK)
            return df
        except Exception as e:
            print(f"[Binance Fetch Error] {e}. Falling back to yfinance.")
            # Fallback to yfinance if Binance has any issues
            pass

    # Fallback / Default: yfinance
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


def _run_prediction_inner(symbol_key, tf_key):
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


def run_prediction(symbol_key, tf_key):
    with prediction_lock:
        return _run_prediction_inner(symbol_key, tf_key)


@app.route("/")
def index():
    return render_template("dashboard.html")


def background_cache_worker():
    """Background worker to continuously compute predictions and keep cache fresh."""
    print("[Kronos] Background cache worker started.")
    
    # Core list of combinations to keep warm even if no one is watching
    default_combinations = [
        ("NIFTY", "1m"), ("NIFTY", "3m"), ("NIFTY", "5m"), ("NIFTY", "15m"), ("NIFTY", "30m"),
        ("BANKNIFTY", "1m"), ("BANKNIFTY", "3m"), ("BANKNIFTY", "5m"), ("BANKNIFTY", "15m"), ("BANKNIFTY", "30m"),
        ("BTC", "1m"), ("BTC", "3m"), ("BTC", "5m"), ("BTC", "15m"), ("BTC", "30m"),
    ]
    
    while True:
        try:
            now = time.time()
            
            # Identify active combinations (requested in the last 5 minutes)
            with active_lock:
                active_items = list(ACTIVE_COMBINATIONS.items())
            active_keys = [
                key for key, last_time in active_items
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
    with active_lock:
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


@app.route("/api/scalper/<symbol>/<tf>")
def api_scalper(symbol, tf):
    symbol = symbol.upper()
    tf = tf.lower()
    key = f"{symbol}:{tf}"
    now = time.time()

    # Record active client interest to keep background cache warm
    with active_lock:
        ACTIVE_COMBINATIONS[key] = now

    with _cache_lock:
        cached = _cache.get(key)

    if not cached:
        try:
            result = run_prediction(symbol, tf)
            with _cache_lock:
                _cache[key] = (now, result)
            cached_result = result
        except Exception as e:
            traceback.print_exc()
            return jsonify({"error": str(e)}), 500
    else:
        cached_result = cached[1]

    try:
        candles = cached_result["candles"]
        if len(candles) < 20:
            return jsonify({"error": "Insufficient history"}), 400

        df = pd.DataFrame(candles)
        df['ema9'] = df['close'].ewm(span=9, adjust=False).mean()
        df['ema15'] = df['close'].ewm(span=15, adjust=False).mean()
        
        df['emaGap'] = df['ema9'] - df['ema15']
        df['emaGap_abs'] = df['emaGap'].abs()
        df['emaGap_abs_prev'] = df['emaGap_abs'].shift(1)
        
        # Filter noise by requiring a minimum EMA gap threshold (e.g. 0.02% of close price)
        df['threshold'] = df['close'] * 0.0002
        df['isExpanding'] = df['emaGap_abs'] > df['emaGap_abs_prev']
        df['upTrend'] = (df['ema9'] > df['ema15']) & df['isExpanding'] & (df['emaGap_abs'] > df['threshold'])
        df['downTrend'] = (df['ema9'] < df['ema15']) & df['isExpanding'] & (df['emaGap_abs'] > df['threshold'])
        
        df['longTrigger'] = df['upTrend'] & (~df['upTrend'].shift(1).fillna(False))
        df['shortTrigger'] = df['downTrend'] & (~df['downTrend'].shift(1).fillna(False))

        # Build markers for TradingView Lightweight Charts
        markers = []
        for _, row in df.iterrows():
            if row['longTrigger']:
                markers.append({
                    "time": int(row['time']),
                    "position": "belowBar",
                    "color": "#2962FF",  # Distinct blue for long triggers
                    "shape": "arrowUp",
                    "text": "Long Trigger"
                })
            elif row['shortTrigger']:
                markers.append({
                    "time": int(row['time']),
                    "position": "aboveBar",
                    "color": "#FF6D00",  # Distinct orange for short triggers
                    "shape": "arrowDown",
                    "text": "Short Trigger"
                })

        state = "Awaiting Setup"
        active_trade = None
        trades_history = []
        
        kronos_dir = cached_result["direction"]
        kronos_pred = "BUY" if kronos_dir == "Long" else ("SELL" if kronos_dir == "Short" else "FLAT")

        for i in range(15, len(df)):
            row = df.iloc[i]
            ts = int(row['time'])
            h = float(row['high'])
            l = float(row['low'])
            c = float(row['close'])
            
            is_latest_bar = (i == len(df) - 1)
            
            # Exit evaluation
            if state == "In Position: Long":
                if l <= active_trade["slPrice"]:
                    active_trade["exitPrice"] = active_trade["slPrice"]
                    active_trade["exitTime"] = ts
                    active_trade["active"] = False
                    active_trade["points"] = round(active_trade["exitPrice"] - active_trade["entryPrice"], 2)
                    active_trade["result"] = "Loss"
                    trades_history.append(active_trade)
                    state = "Awaiting Setup"
                    active_trade = None
                elif h >= active_trade["tpPrice"]:
                    active_trade["exitPrice"] = active_trade["tpPrice"]
                    active_trade["exitTime"] = ts
                    active_trade["active"] = False
                    active_trade["points"] = round(active_trade["exitPrice"] - active_trade["entryPrice"], 2)
                    active_trade["result"] = "Profit"
                    trades_history.append(active_trade)
                    state = "Awaiting Setup"
                    active_trade = None
            elif state == "In Position: Short":
                if h >= active_trade["slPrice"]:
                    active_trade["exitPrice"] = active_trade["slPrice"]
                    active_trade["exitTime"] = ts
                    active_trade["active"] = False
                    active_trade["points"] = round(active_trade["entryPrice"] - active_trade["exitPrice"], 2)
                    active_trade["result"] = "Loss"
                    trades_history.append(active_trade)
                    state = "Awaiting Setup"
                    active_trade = None
                elif l <= active_trade["tpPrice"]:
                    active_trade["exitPrice"] = active_trade["tpPrice"]
                    active_trade["exitTime"] = ts
                    active_trade["active"] = False
                    active_trade["points"] = round(active_trade["entryPrice"] - active_trade["exitPrice"], 2)
                    active_trade["result"] = "Profit"
                    trades_history.append(active_trade)
                    state = "Awaiting Setup"
                    active_trade = None

            # Entry evaluation
            if state in ["Awaiting Setup", "Long Trigger Formed", "Short Trigger Formed"]:
                is_long_trig = bool(row['longTrigger'])
                is_short_trig = bool(row['shortTrigger'])
                
                if is_latest_bar:
                    current_kronos_pred = kronos_pred
                else:
                    current_kronos_pred = "BUY" if is_long_trig else ("SELL" if is_short_trig else "FLAT")
                
                if is_long_trig:
                    if current_kronos_pred == "BUY":
                        risk = c - l
                        if risk <= 0:
                            risk = c * 0.001
                        active_trade = {
                            "type": "Long",
                            "entryPrice": round(c, 2),
                            "entryTime": ts,
                            "slPrice": round(l, 2),
                            "tpPrice": round(c + 2 * risk, 2),
                            "active": True
                        }
                        state = "In Position: Long"
                    else:
                        state = "Long Trigger Formed"
                elif is_short_trig:
                    if current_kronos_pred == "SELL":
                        risk = h - c
                        if risk <= 0:
                            risk = c * 0.001
                        active_trade = {
                            "type": "Short",
                            "entryPrice": round(c, 2),
                            "entryTime": ts,
                            "slPrice": round(h, 2),
                            "tpPrice": round(c - 2 * risk, 2),
                            "active": True
                        }
                        state = "In Position: Short"
                    else:
                        state = "Short Trigger Formed"
                else:
                    if state in ["Long Trigger Formed", "Short Trigger Formed"]:
                        state = "Awaiting Setup"

        # Prepare EMAs output
        ema9_data = []
        ema15_data = []
        for t, e9, e15 in zip(df['time'], df['ema9'], df['ema15']):
            if not pd.isna(e9):
                ema9_data.append({"time": int(t), "value": round(float(e9), 2)})
            if not pd.isna(e15):
                ema15_data.append({"time": int(t), "value": round(float(e15), 2)})

        return jsonify({
            "symbol": symbol,
            "timeframe": tf,
            "candles": candles,
            "ema9": ema9_data,
            "ema15": ema15_data,
            "markers": markers,
            "state": state,
            "active_trade": active_trade,
            "trades_history": trades_history[::-1],
            "kronos_prediction": kronos_dir,
            "updated": time.strftime("%H:%M:%S")
        })

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500



if __name__ == "__main__":
    print(f"[Kronos] Dashboard:  http://0.0.0.0:{PORT}")
    print(f"[Kronos] API sample: http://0.0.0.0:{PORT}/api/signal/NIFTY/5m")
    
    # Start background cache worker
    bg_thread = threading.Thread(target=background_cache_worker, daemon=True)
    bg_thread.start()
    
    app.run(host="0.0.0.0", port=PORT, threaded=True)
