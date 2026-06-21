import os
import time
import pandas as pd
import numpy as np
from datetime import timedelta, datetime, timezone

LOOKBACK = int(os.environ.get("KRONOS_LOOKBACK", "400"))
PRED_LEN = int(os.environ.get("KRONOS_PRED_LEN", "24"))

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

# Asia/Kolkata timezone constant for all datetime operations
IST = timezone(timedelta(hours=5, minutes=30))

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
