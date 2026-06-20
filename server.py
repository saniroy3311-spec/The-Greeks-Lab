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
from datetime import timedelta, datetime, timezone

import numpy as np
import pandas as pd
from flask import Flask, jsonify, render_template, request, send_from_directory
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room, leave_room
import websocket as ws_client  # websocket-client library

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from model import Kronos, KronosTokenizer, KronosPredictor
from ema_kronos_strategy import EmaKronosStrategy
from echoes import build_echo_scan
from a1_strategy import A1Strategy

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

# symbols on yfinance.  ^NSEI = Nifty 50, ^NSEBANK = Bank Nifty, BTCUSD = Bitcoin, XAUTUSD = Gold
SYMBOL_MAP = {
    "NIFTY":     "^NSEI",
    "BANKNIFTY": "^NSEBANK",
    "BTC":       "BTCUSD",     # Delta Exchange India
    "GOLD":      "XAUTUSD",    # Delta Exchange India (Tether Gold)
}

YFINANCE_FALLBACK_MAP = {
    "BTC":  "BTC-USD",
    "GOLD": "GC=F",
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

import mimetypes
mimetypes.add_type('application/javascript', '.js')

# Asia/Kolkata timezone constant for all datetime operations
IST = timezone(timedelta(hours=5, minutes=30))

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode="threading", ping_timeout=30, ping_interval=15)

# ----------------------------------------------------------------------------
# Load model once at startup
# ----------------------------------------------------------------------------
print(f"[Kronos] Loading tokenizer: {TOKENIZER_NAME}")
tokenizer = KronosTokenizer.from_pretrained(TOKENIZER_NAME)
print(f"[Kronos] Loading model: {MODEL_NAME}")
model = Kronos.from_pretrained(MODEL_NAME)
predictor = KronosPredictor(model, tokenizer, device=DEVICE, max_context=512)
print(f"[Kronos] Model ready on device={DEVICE}")

import json

PERSISTENT_CACHE_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "persistent_cache.json")

_cache = {}        # key -> (timestamp, result_dict)
_cache_lock = threading.Lock()

def load_persistent_cache():
    global _cache
    if os.path.exists(PERSISTENT_CACHE_FILE):
        try:
            with open(PERSISTENT_CACHE_FILE, "r") as f:
                data = json.load(f)
            with _cache_lock:
                for key, val in data.items():
                    # val is [timestamp, result_dict]
                    _cache[key] = (val[0], val[1])
            print(f"[Kronos] Loaded {len(data)} cached entries from {PERSISTENT_CACHE_FILE}")
        except Exception as e:
            print(f"[Kronos] Error loading persistent cache: {e}")

def save_persistent_cache():
    try:
        with _cache_lock:
            # Serialise the current memory cache
            data = {k: list(v) for k, v in _cache.items()}
        with open(PERSISTENT_CACHE_FILE, "w") as f:
            json.dump(data, f, indent=2)
    except Exception as e:
        print(f"[Kronos] Error saving persistent cache: {e}")

# Load cache on startup
load_persistent_cache()

ACTIVE_COMBINATIONS = {}  # key -> last_request_time
active_lock = threading.Lock()
prediction_lock = threading.Lock()

# ----------------------------------------------------------------------------
# Live Tick State — tracks current candle per symbol for real-time updates
# ----------------------------------------------------------------------------
_live_prices = {}  # symbol -> {price, time, candle: {time, open, high, low, close, volume}}
_live_prices_lock = threading.Lock()
_tick_subscribers = {}  # room_name -> set of session IDs (for tracking)


def _localize_index(df, symbol_key):
    """Ensure DataFrame index is timezone-aware in Asia/Kolkata."""
    if df is None or len(df) == 0:
        return df
    if not hasattr(df.index, 'tz'):
        return df
    idx = pd.to_datetime(df.index)
    if idx.tz is None:
        # Binance returns UTC timestamps; yfinance returns exchange-local
        if symbol_key == "BTC":
            idx = idx.tz_localize('UTC')
        else:
            idx = idx.tz_localize('Asia/Kolkata')
    else:
        idx = idx.tz_convert('Asia/Kolkata')
    df.index = idx
    return df


def fetch_delta_exchange_candles(symbol_key, tf_key):
    """Fetch candles from Delta Exchange India API."""
    import requests
    symbol = SYMBOL_MAP.get(symbol_key, "BTCUSD")
    resolution = tf_key  # "1m", "3m", "5m", "15m", "30m", "1h", "1d"
    
    minutes = TF_MINUTES.get(tf_key, 5)
    resolution_seconds = minutes * 60
    
    end_time = int(time.time())
    # Request slightly more than LOOKBACK to ensure we get enough candles
    start_time = end_time - (LOOKBACK + 50) * resolution_seconds
    
    url = "https://api.india.delta.exchange/v2/history/candles"
    params = {
        "symbol": symbol,
        "resolution": resolution,
        "start": start_time,
        "end": end_time
    }
    
    headers = {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
    }
    
    r = requests.get(url, params=params, headers=headers, timeout=5)
    r.raise_for_status()
    resp_json = r.json()
    if not resp_json.get("success"):
        error_msg = resp_json.get("error", {}).get("context", {}).get("message", "Unknown error")
        raise RuntimeError(f"Delta Exchange API error: {error_msg}")
        
    data = resp_json.get("result", [])
    if not data:
        raise RuntimeError(f"No candles returned from Delta Exchange for {symbol} {resolution}")
        
    df = pd.DataFrame(data)
    
    # Delta Exchange returns newest candles first; sort oldest first
    df = df.sort_values(by="time", ascending=True)
    
    # Set floats
    df["open"] = df["open"].astype(float)
    df["high"] = df["high"].astype(float)
    df["low"] = df["low"].astype(float)
    df["close"] = df["close"].astype(float)
    df["volume"] = df["volume"].astype(float)
    
    # Timestamp is Unix seconds (UTC) -> convert to Asia/Kolkata
    df.index = pd.to_datetime(df["time"], unit="s", utc=True)
    df.index = df.index.tz_convert('Asia/Kolkata')
    
    df = df[["open", "high", "low", "close", "volume"]].copy()
    df = df.dropna()
    df = df.tail(LOOKBACK)
    return df


def fetch_candles(symbol_key, tf_key):
    """Pull live OHLCV candles and return a clean DataFrame with Asia/Kolkata timezone index."""
    if symbol_key in ["BTC", "GOLD"]:
        try:
            return fetch_delta_exchange_candles(symbol_key, tf_key)
        except Exception as e:
            print(f"[Delta Exchange Fetch Error] {e}. Falling back to yfinance.")
            pass

    # Fallback / Default: yfinance
    import yfinance as yf
    if symbol_key in YFINANCE_FALLBACK_MAP:
        ticker = YFINANCE_FALLBACK_MAP[symbol_key]
    else:
        ticker = SYMBOL_MAP.get(symbol_key, "^NSEI")
    interval, period = TF_MAP.get(tf_key, ("5m", "5d"))

    df = yf.download(ticker, period=period, interval=interval,
                     progress=False, auto_adjust=False)
    if df is None or len(df) == 0:
        raise RuntimeError(f"No data returned for {ticker} {interval}")

    if isinstance(df.columns, pd.MultiIndex):
        df.columns = [c[0] for c in df.columns]
    df.columns = [str(c).strip().lower() for c in df.columns]

    # Ensure all required columns are present, case-insensitively
    required_cols = ["open", "high", "low", "close", "volume"]
    for col in required_cols:
        if col not in df.columns:
            matched = False
            for c in df.columns:
                if str(c).strip().lower() == col:
                    df.rename(columns={c: col}, inplace=True)
                    matched = True
                    break
            if not matched:
                raise RuntimeError(f"Missing required column: {col} in data. Available: {list(df.columns)}")

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
    if len(df) == 0:
        raise RuntimeError(f"No valid data remaining after dropping NaNs for {ticker} {interval}")
    df = df.tail(LOOKBACK)
    
    # Standardise timezone: localise to Asia/Kolkata for all assets
    df = _localize_index(df, symbol_key)
    return df


def _safe_float(val, fallback=0.0):
    """Return a safe float, guarding against None/NaN/Inf."""
    if val is None:
        return fallback
    try:
        f = float(val)
        if not np.isfinite(f):
            return fallback
        return f
    except (ValueError, TypeError):
        return fallback


def _run_prediction_inner(symbol_key, tf_key):
    """Run Kronos on the latest candles and build a signal dict."""
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
        pred_df = predictor.predict(
            df=x_df.reset_index(drop=True),
            x_timestamp=x_timestamp,
            y_timestamp=y_timestamp,
            pred_len=PRED_LEN,
            T=1.0, top_p=0.9, sample_count=1, verbose=False,
        )
    except Exception as e:
        print(f"[Kronos Prediction Error] {e}. Using fallback flat prediction.")
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

    # Build candlestick arrays for lightweight-charts (unix seconds, IST-localized)
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


def run_prediction(symbol_key, tf_key):
    with prediction_lock:
        return _run_prediction_inner(symbol_key, tf_key)


@app.route("/")
def index():
    return app.send_static_file("dashboard.html")


@app.route("/candl")
def candl_index():
    candl_app_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Candl", "examples", "basic", "dist")
    return send_from_directory(candl_app_dir, "index.html")


@app.route("/candl/<path:path>")
def candl_assets(path):
    candl_app_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Candl", "examples", "basic", "dist")
    return send_from_directory(candl_app_dir, path)


def get_max_age(tf_key, is_active):
    """Dynamic max age based on timeframe to save resources and CPU."""
    if is_active:
        mapping = {
            "1m": 25,
            "3m": 55,
            "5m": 110,
            "15m": 290,
            "30m": 580,
            "1h": 1160,
            "1d": 86400,
        }
    else:
        mapping = {
            "1m": 60,
            "3m": 120,
            "5m": 300,
            "15m": 600,
            "30m": 1200,
            "1h": 3600,
            "1d": 86400,
        }
    return mapping.get(tf_key, 30 if is_active else 90)


def background_cache_worker():
    """Background worker to continuously compute predictions and keep cache fresh."""
    print("[Kronos] Background cache worker started.")
    
    # Core list of combinations to keep warm even if no one is watching
    default_combinations = [
        ("NIFTY", "1m"), ("NIFTY", "3m"), ("NIFTY", "5m"), ("NIFTY", "15m"), ("NIFTY", "30m"),
        ("BANKNIFTY", "1m"), ("BANKNIFTY", "3m"), ("BANKNIFTY", "5m"), ("BANKNIFTY", "15m"), ("BANKNIFTY", "30m"),
        ("BTC", "1m"), ("BTC", "3m"), ("BTC", "5m"), ("BTC", "15m"), ("BTC", "30m"),
        ("GOLD", "1m"), ("GOLD", "3m"), ("GOLD", "5m"), ("GOLD", "15m"), ("GOLD", "30m"),
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
                
                max_age = get_max_age(tf, is_active)
                
                if not cached or (time.time() - cached[0]) >= max_age:
                    try:
                        result = run_prediction(sym, tf)
                        with _cache_lock:
                            _cache[key] = (time.time(), result)
                        save_persistent_cache()
                        # Only sleep after an actual compute/download to save CPU/yfinance rate limit
                        time.sleep(0.5 if is_active else 2.0)
                    except Exception as e:
                        print(f"[Background Cache] Error updating {key}: {e}")
                        time.sleep(1.0)
                else:
                    # Very tiny sleep to yield thread execution but not slow down iterating
                    time.sleep(0.01)
                
        except Exception as e:
            print(f"[Background Cache] Worker error: {e}")
            time.sleep(5)


@app.route("/api/scan_all")
def api_scan_all():
    now = time.time()
    symbols = ["NIFTY", "BANKNIFTY", "BTC", "GOLD"]
    timeframes = ["1m", "3m", "5m", "15m", "30m"]
    
    # Record active client interest for all combinations to keep them updating fast
    with active_lock:
        for symbol in symbols:
            for tf in timeframes:
                key = f"{symbol}:{tf}"
                ACTIVE_COMBINATIONS[key] = now

    results = {}
    with _cache_lock:
        for symbol in symbols:
            for tf in timeframes:
                key = f"{symbol}:{tf}"
                cached = _cache.get(key)
                if cached:
                    res_dict = cached[1]
                    # Check if stale
                    is_active = True
                    max_age = get_max_age(tf, is_active)
                    is_stale = (now - cached[0]) >= max_age

                    light_res = {
                        "symbol": res_dict.get("symbol"),
                        "timeframe": res_dict.get("timeframe"),
                        "direction": res_dict.get("direction"),
                        "action": res_dict.get("action"),
                        "bias": res_dict.get("bias"),
                        "confidence": res_dict.get("confidence"),
                        "current": res_dict.get("current"),
                        "pred_5": res_dict.get("pred_5"),
                        "pred_n": res_dict.get("pred_n"),
                        "move": res_dict.get("move"),
                        "move_pct": res_dict.get("move_pct"),
                        "pred_len": res_dict.get("pred_len"),
                        "updated": res_dict.get("updated"),
                    }
                    if is_stale or res_dict.get("stale"):
                        light_res["stale"] = True

                    if "predicted" in res_dict:
                        light_res["predicted"] = res_dict["predicted"]
                    if "candles" in res_dict:
                        light_res["candles"] = res_dict["candles"][-50:]
                    results[key] = light_res
                else:
                    results[key] = None
    return jsonify(results)


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
        if cached:
            # Serve immediately if present to make switching instant
            is_active = True
            max_age = get_max_age(tf, is_active)
            is_stale = (now - cached[0]) >= max_age
            res = cached[1].copy()
            if is_stale:
                res["stale"] = True
            return jsonify(res)

    # Fallback: compute synchronously if not in cache at all
    try:
        result = run_prediction(symbol, tf)
        with _cache_lock:
            _cache[key] = (now, result)
        save_persistent_cache()
        return jsonify(result)
    except Exception as e:
        traceback.print_exc()
        with _cache_lock:
            cached = _cache.get(key)
        if cached:
            res = cached[1].copy()
            res["stale"] = True
            return jsonify(res)
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
            save_persistent_cache()
            cached_result = result
        except Exception as e:
            traceback.print_exc()
            return jsonify({"error": str(e)}), 500
    else:
        # Check if cache is stale
        is_active = True
        max_age = get_max_age(tf, is_active)
        is_stale = (now - cached[0]) >= max_age
        cached_result = cached[1].copy()
        if is_stale:
            cached_result["stale"] = True

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
            "direction": kronos_dir,
            "move_pct": cached_result.get("move_pct"),
            "pred_len": cached_result.get("pred_len"),
            "predicted": cached_result.get("predicted", []),
            "current": cached_result.get("current"),
            "confidence": cached_result.get("confidence"),
            "action": cached_result.get("action"),
            "bias": cached_result.get("bias"),
            "pred_5": cached_result.get("pred_5"),
            "pred_n": cached_result.get("pred_n"),
            "move": cached_result.get("move"),
            "updated": datetime.now(IST).strftime("%H:%M:%S")
        })

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500



@app.route("/api/ema_kronos/<symbol>/<tf>")
def api_ema_kronos(symbol, tf):
    """EMA/Kronos confluence strategy endpoint - Pine Script v5 logic."""
    symbol = symbol.upper()
    tf = tf.lower()
    key = f"{symbol}:{tf}"
    now = time.time()

    with active_lock:
        ACTIVE_COMBINATIONS[key] = now

    with _cache_lock:
        cached = _cache.get(key)

    if cached:
        # Check if cache is stale
        is_active = True
        max_age = get_max_age(tf, is_active)
        is_stale = (now - cached[0]) >= max_age
        cached_result = cached[1].copy()
        if is_stale:
            cached_result["stale"] = True
    else:
        try:
            result = run_prediction(symbol, tf)
            with _cache_lock:
                _cache[key] = (now, result)
            save_persistent_cache()
            cached_result = result
        except Exception as e:
            traceback.print_exc()
            return jsonify({"error": str(e)}), 500

    try:
        candles = cached_result["candles"]
        if len(candles) < 30:
            return jsonify({"error": "Insufficient history"}), 400

        df = pd.DataFrame(candles)
        df.set_index('time', inplace=True)
        # Ensure timezone-aware index: candles are Unix seconds (UTC), convert to IST
        df.index = pd.to_datetime(df.index, unit='s', utc=True).tz_convert('Asia/Kolkata')

        kronos_dir = cached_result["direction"]
        confidence = cached_result.get("confidence", 0)
        strat = EmaKronosStrategy()
        df = df.tail(500)
        out = strat.evaluate(df, kronos_direction=kronos_dir, kronos_confidence=confidence)

        return jsonify({
            "symbol": symbol,
            "timeframe": tf,
            "state": out["state"],
            "trend": out["trend"],
            "bars_since_cross": out["bars_since_cross"],
            "body_touches_both": out["body_touches_both"],
            "kronos_direction": kronos_dir,
            "confluence": out["confluence"],
            "active_trade": out["active_trade"],
            "trades_history": out["trades_history"],
            "ema_fast": out["ema_fast"],
            "ema_slow": out["ema_slow"],
            "markers": out["markers"],
            "candles": candles,
            "predicted": cached_result.get("predicted", []),
            "current": cached_result.get("current"),
            "confidence": confidence,
            "direction": kronos_dir,
            "move_pct": cached_result.get("move_pct"),
            "updated": datetime.now(IST).strftime("%H:%M:%S")
        })

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@app.route("/api/a1/<symbol>/<tf>")
def api_a1(symbol, tf):
    """A1 Standalone System — 6-Gate confluence of EMA, Kronos AI, and Echoes."""
    symbol = symbol.upper()
    tf = tf.lower()
    key = f"{symbol}:{tf}"
    now = time.time()

    with active_lock:
        ACTIVE_COMBINATIONS[key] = now

    with _cache_lock:
        cached = _cache.get(key)

    if cached:
        is_active = True
        max_age = get_max_age(tf, is_active)
        is_stale = (now - cached[0]) >= max_age
        cached_result = cached[1].copy()
        if is_stale:
            cached_result["stale"] = True
    else:
        try:
            result = run_prediction(symbol, tf)
            with _cache_lock:
                _cache[key] = (now, result)
            save_persistent_cache()
            cached_result = result
        except Exception as e:
            traceback.print_exc()
            return jsonify({"error": str(e)}), 500

    try:
        candles = cached_result["candles"]
        if len(candles) < 80:
            return jsonify({"error": "Insufficient history"}), 400

        df = pd.DataFrame(candles)
        df.set_index('time', inplace=True)
        df.index = pd.to_datetime(df.index, unit='s', utc=True).tz_convert('Asia/Kolkata')

        # Run Echoes scan on the candle data
        echo_window = 30
        echo_horizon = PRED_LEN
        echo_k = 5
        echoes_result = build_echo_scan(df, window_len=echo_window, horizon=echo_horizon, k=echo_k)

        # Run A1 strategy
        kronos_dir = cached_result.get("direction", "Flat")
        kronos_conf = cached_result.get("confidence", 0)
        kronos_move_pct = cached_result.get("move_pct", 0.0)
        # move_pct in cached_result is stored as % (e.g. 0.4 for 0.40%)
        kronos_move_decimal = kronos_move_pct / 100.0 if abs(kronos_move_pct) > 0 else 0.0

        strat = A1Strategy()
        a1_out = strat.evaluate(
            df.tail(500),
            kronos_direction=kronos_dir,
            kronos_confidence=kronos_conf,
            kronos_move_pct=kronos_move_decimal,
            echoes_stats=echoes_result,
        )

        return jsonify({
            "symbol": symbol,
            "timeframe": tf,
            "decision": a1_out["decision"],
            "trend": a1_out["trend"],
            "bars_since_cross": a1_out["bars_since_cross"],
            "gates": a1_out["gates"],
            "skip_reasons": a1_out["skip_reasons"],
            "kronos_direction": kronos_dir,
            "kronos_confidence": kronos_conf,
            "kronos_move_pct": kronos_move_pct,
            "echoes": echoes_result,
            "echo_win_rate": a1_out["echo_win_rate"],
            "echo_asymmetry_long": a1_out["echo_asymmetry_long"],
            "echo_asymmetry_short": a1_out["echo_asymmetry_short"],
            "echo_count": a1_out["echo_count"],
            "echo_up_count": a1_out["echo_up_count"],
            "echo_best_end_pct": a1_out["echo_best_end_pct"],
            "echo_worst_end_pct": a1_out["echo_worst_end_pct"],
            "candles": candles,
            "predicted": cached_result.get("predicted", []),
            "current": cached_result.get("current"),
            "updated": datetime.now(IST).strftime("%H:%M:%S")
        })

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


# ----------------------------------------------------------------------------
# Socket.IO Events — real-time tick push
# ----------------------------------------------------------------------------
@socketio.on('connect')
def handle_connect():
    print(f"[SocketIO] Client connected: {request.sid}")

@socketio.on('disconnect')
def handle_disconnect():
    print(f"[SocketIO] Client disconnected: {request.sid}")

@socketio.on('subscribe')
def handle_subscribe(data):
    """Client subscribes to tick updates for a symbol+timeframe."""
    symbol = data.get('symbol', '').upper()
    tf = data.get('timeframe', '5m').lower()
    room = f"tick:{symbol}:{tf}"
    join_room(room)
    print(f"[SocketIO] {request.sid} joined room {room}")
    # Send the latest known price immediately
    with _live_prices_lock:
        price_data = _live_prices.get(symbol)
    if price_data:
        emit('tick', price_data)

@socketio.on('unsubscribe')
def handle_unsubscribe(data):
    """Client unsubscribes from tick updates."""
    symbol = data.get('symbol', '').upper()
    tf = data.get('timeframe', '5m').lower()
    room = f"tick:{symbol}:{tf}"
    leave_room(room)
    print(f"[SocketIO] {request.sid} left room {room}")


@app.route("/api/price/<symbol>")
def api_price(symbol):
    """Lightweight endpoint returning just the latest known price."""
    symbol = symbol.upper()
    with _live_prices_lock:
        price_data = _live_prices.get(symbol)
    if price_data:
        return jsonify(price_data)
    # Fallback to cached prediction data
    for tf in ["1m", "3m", "5m"]:
        key = f"{symbol}:{tf}"
        with _cache_lock:
            cached = _cache.get(key)
        if cached:
            result = cached[1]
            candles = result.get("candles", [])
            if candles:
                last = candles[-1]
                return jsonify({
                    "symbol": symbol,
                    "price": last["close"],
                    "time": last["time"],
                    "source": "cache"
                })
    return jsonify({"error": "No price data available"}), 404


# ----------------------------------------------------------------------------
# Server-Side Delta Exchange WebSocket (BTC & GOLD real-time candles)
# ----------------------------------------------------------------------------
def _emit_tick(symbol, tf, candle_data):
    """Emit a tick event to all clients subscribed to this symbol+timeframe."""
    room = f"tick:{symbol}:{tf}"
    tick_payload = {
        "symbol": symbol,
        "timeframe": tf,
        "time": candle_data["time"],
        "open": candle_data["open"],
        "high": candle_data["high"],
        "low": candle_data["low"],
        "close": candle_data["close"],
        "volume": candle_data.get("volume", 0),
        "source": "delta_ws"
    }
    with _live_prices_lock:
        _live_prices[symbol] = {
            "symbol": symbol,
            "price": candle_data["close"],
            "time": candle_data["time"],
            "source": "delta_ws"
        }
    socketio.emit('tick', tick_payload, room=room)


def _delta_ws_thread():
    """Maintain persistent WebSocket connection to Delta Exchange for BTC & GOLD."""
    DELTA_TFS = ["1m", "3m", "5m", "15m", "30m"]
    DELTA_SYMBOLS = {
        "BTCUSD": "BTC",
        "XAUTUSD": "GOLD"
    }
    
    def on_message(ws_conn, message):
        try:
            msg = json.loads(message)
            msg_type = msg.get("type", "")
            
            # Match candlestick_Xm messages
            matched_tf = None
            for tf in DELTA_TFS:
                if msg_type == f"candlestick_{tf}":
                    matched_tf = tf
                    break
            
            if not matched_tf:
                return
            
            delta_symbol = msg.get("symbol") or msg.get("sy")
            if delta_symbol not in DELTA_SYMBOLS:
                return
            
            kronos_symbol = DELTA_SYMBOLS[delta_symbol]
            
            raw_time = msg.get("candle_start_time") or msg.get("cst")
            if raw_time is None:
                return
            
            # Normalize timestamp to seconds
            if raw_time > 1000000000000000:
                t = raw_time // 1000000000  # Nanoseconds
            elif raw_time > 100000000000:
                t = raw_time // 1000  # Milliseconds
            else:
                t = raw_time  # Already seconds
            
            o = float(msg.get("open") or msg.get("o", 0))
            h = float(msg.get("high") or msg.get("h", 0))
            l = float(msg.get("low") or msg.get("l", 0))
            c = float(msg.get("close") or msg.get("c", 0))
            v = float(msg.get("volume") or msg.get("v", 0))
            
            candle = {"time": int(t), "open": o, "high": h, "low": l, "close": c, "volume": v}
            _emit_tick(kronos_symbol, matched_tf, candle)
            
        except Exception as e:
            print(f"[Delta WS] Error processing message: {e}")
    
    def on_error(ws_conn, error):
        print(f"[Delta WS] WebSocket error: {error}")
    
    def on_close(ws_conn, close_status_code, close_msg):
        print(f"[Delta WS] Connection closed: {close_status_code} - {close_msg}")
    
    def on_open(ws_conn):
        # Subscribe to all timeframes for both symbols
        channels = []
        for tf in DELTA_TFS:
            channels.append({
                "name": f"candlestick_{tf}",
                "symbols": list(DELTA_SYMBOLS.keys())
            })
        
        subscribe_msg = {
            "type": "subscribe",
            "payload": {"channels": channels}
        }
        ws_conn.send(json.dumps(subscribe_msg))
        print(f"[Delta WS] Subscribed to {len(channels)} candlestick channels for {list(DELTA_SYMBOLS.keys())}")
    
    while True:
        try:
            print("[Delta WS] Connecting to wss://socket.india.delta.exchange ...")
            ws = ws_client.WebSocketApp(
                "wss://socket.india.delta.exchange",
                on_message=on_message,
                on_error=on_error,
                on_close=on_close,
                on_open=on_open
            )
            ws.run_forever(ping_interval=20, ping_timeout=10)
        except Exception as e:
            print(f"[Delta WS] Connection failed: {e}")
        
        print("[Delta WS] Reconnecting in 3 seconds...")
        time.sleep(3)


# ----------------------------------------------------------------------------
# yfinance Rapid-Poll Thread (NIFTY & BANKNIFTY real-time candle approximation)
# ----------------------------------------------------------------------------
def _yfinance_poll_thread():
    """Poll yfinance every 3-5s for NSE symbols to get near-real-time prices."""
    import yfinance as yf
    
    NSE_SYMBOLS = {
        "NIFTY": "^NSEI",
        "BANKNIFTY": "^NSEBANK"
    }
    POLL_INTERVAL = 4  # seconds between polls
    
    print("[yfinance Poll] Started rapid polling for NSE symbols.")
    
    while True:
        for kronos_sym, yf_ticker in NSE_SYMBOLS.items():
            try:
                # Fetch just the latest 1-minute candle
                df = yf.download(yf_ticker, period="1d", interval="1m",
                                 progress=False, auto_adjust=False)
                if df is None or len(df) == 0:
                    continue
                
                if isinstance(df.columns, pd.MultiIndex):
                    df.columns = [c[0] for c in df.columns]
                df.columns = [str(c).strip().lower() for c in df.columns]
                
                last_row = df.iloc[-1]
                last_time = df.index[-1]
                
                # Convert to IST timestamp in seconds
                if hasattr(last_time, 'tz') and last_time.tz is not None:
                    ts = int(last_time.timestamp())
                else:
                    # Assume IST if no timezone
                    import pytz
                    ist = pytz.timezone('Asia/Kolkata')
                    ts = int(ist.localize(last_time.to_pydatetime()).timestamp())
                
                price = float(last_row['close'])
                
                # Check if price actually changed
                with _live_prices_lock:
                    prev = _live_prices.get(kronos_sym, {})
                    if prev.get('price') == price and prev.get('time') == ts:
                        continue  # No change
                
                candle = {
                    "time": ts,
                    "open": round(float(last_row['open']), 2),
                    "high": round(float(last_row['high']), 2),
                    "low": round(float(last_row['low']), 2),
                    "close": round(price, 2),
                    "volume": int(float(last_row.get('volume', 0)))
                }
                
                # Emit to ALL timeframe rooms — client will handle candle aggregation
                for tf in ["1m", "3m", "5m", "15m", "30m"]:
                    _emit_tick(kronos_sym, tf, candle)
                
            except Exception as e:
                # Don't spam logs — yfinance can fail during market close
                pass
        
        time.sleep(POLL_INTERVAL)


if __name__ == "__main__":
    print(f"[Kronos] Dashboard:  http://0.0.0.0:{PORT}")
    print(f"[Kronos] API sample: http://0.0.0.0:{PORT}/api/signal/NIFTY/5m")
    print(f"[Kronos] WebSocket:  ws://0.0.0.0:{PORT}/socket.io/")
    
    # Start background cache worker
    bg_thread = threading.Thread(target=background_cache_worker, daemon=True)
    bg_thread.start()
    
    # Start Delta Exchange WebSocket client for BTC & GOLD real-time ticks
    delta_thread = threading.Thread(target=_delta_ws_thread, daemon=True)
    delta_thread.start()
    
    # Start yfinance rapid-poll thread for NIFTY & BANKNIFTY
    yf_thread = threading.Thread(target=_yfinance_poll_thread, daemon=True)
    yf_thread.start()
    
    # Use socketio.run() instead of app.run() for WebSocket support
    socketio.run(app, host="0.0.0.0", port=PORT, allow_unsafe_werkzeug=True)
