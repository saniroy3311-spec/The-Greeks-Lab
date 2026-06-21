import os
import sys
import time
import traceback
import pandas as pd
from datetime import datetime, timedelta

# Ensure project path is in sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

print("=== Kronos VPS Diagnostic Start ===")
print(f"Python executable: {sys.executable}")
print(f"Current working dir: {os.getcwd()}")
print(f"User ID (UID): {os.getuid() if hasattr(os, 'getuid') else 'N/A'}")

# 1. Test SQLite Connection & Write Permissions
print("\n[Step 1] Testing SQLite Connection & Permissions...")
try:
    from db_cache import SQLiteCache, get_db_connection, DB_FILE
    print(f"Database file path: {DB_FILE}")
    if os.path.exists(DB_FILE):
        stat = os.stat(DB_FILE)
        print(f"Database owner UID: {stat.st_uid}, GID: {stat.st_gid}")
        print(f"Database permissions: {oct(stat.st_mode)}")
    
    # Try a simple write/read
    test_key = "DIAGNOSTIC_TEST_KEY"
    test_payload = {"status": "ok", "timestamp": time.time()}
    SQLiteCache.set(test_key, test_payload)
    cached = SQLiteCache.get(test_key)
    if cached and cached[1].get("status") == "ok":
        print("SQLite read/write test: SUCCESS")
    else:
        print("SQLite read/write test: FAILED (mismatch)")
except Exception as e:
    print("SQLite test: FAILED with exception:")
    traceback.print_exc()

# 2. Test Candle Fetching
print("\n[Step 2] Testing Candle Fetching...")
try:
    from data_utils import fetch_candles
    print("Fetching BTC:5m candles...")
    t0 = time.time()
    df = fetch_candles("BTC", "5m")
    t1 = time.time()
    if df is not None:
        print(f"Successfully fetched {len(df)} candles in {t1 - t0:.2f} seconds.")
        print(df.tail(2))
    else:
        print("Fetched DataFrame is None")
except Exception as e:
    print("Candle fetching: FAILED with exception:")
    traceback.print_exc()

# 3. Test Model Loading & Autoregressive Inference
print("\n[Step 3] Testing Model Loading (This may download files if not cached)...")
try:
    MODEL_NAME = os.environ.get("KRONOS_MODEL", "NeoQuasar/Kronos-small")
    TOKENIZER_NAME = os.environ.get("KRONOS_TOKENIZER", "NeoQuasar/Kronos-Tokenizer-base")
    DEVICE = "cpu"
    
    print(f"Using Model: {MODEL_NAME}")
    print(f"Using Tokenizer: {TOKENIZER_NAME}")
    
    t_load_start = time.time()
    from model import Kronos, KronosTokenizer, KronosPredictor
    
    print("Loading tokenizer...")
    t0 = time.time()
    tokenizer = KronosTokenizer.from_pretrained(TOKENIZER_NAME)
    print(f"Tokenizer loaded in {time.time() - t0:.2f}s")
    
    print("Loading model...")
    t0 = time.time()
    model = Kronos.from_pretrained(MODEL_NAME)
    print(f"Model loaded in {time.time() - t0:.2f}s")
    
    print("Initializing predictor...")
    t0 = time.time()
    predictor = KronosPredictor(model, tokenizer, device=DEVICE, max_context=512)
    print(f"Predictor ready in {time.time() - t0:.2f}s")
    print(f"Total load time: {time.time() - t_load_start:.2f}s")
    
    # 4. Test running one prediction
    print("\n[Step 4] Running single prediction inference...")
    if 'df' in locals() and df is not None and len(df) >= 50:
        from data_utils import TF_MINUTES, PRED_LEN, _safe_float
        x_df = df[["open", "high", "low", "close", "volume"]].copy()
        x_timestamp = df.index.to_series().reset_index(drop=True)
        
        minutes = TF_MINUTES.get("5m", 5)
        freq = timedelta(minutes=minutes)
        last_ts = df.index[-1]
        y_index = pd.date_range(start=last_ts + freq, periods=PRED_LEN, freq=freq)
        y_timestamp = pd.Series(y_index)
        
        t_pred_start = time.time()
        pred_df = predictor.predict(
            df=x_df.reset_index(drop=True),
            x_timestamp=x_timestamp,
            y_timestamp=y_timestamp,
            pred_len=PRED_LEN,
            T=1.0, top_p=0.9, sample_count=1, verbose=False,
        )
        print(f"Inference completed in {time.time() - t_pred_start:.2f} seconds.")
        print("Prediction results:")
        print(pred_df.tail(2))
    else:
        print("Skipping inference test because candle data was missing.")
except Exception as e:
    print("Model load/inference: FAILED with exception:")
    traceback.print_exc()

print("\n=== Kronos VPS Diagnostic End ===")
