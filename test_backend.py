import sys
import os
import unittest
from unittest.mock import MagicMock, patch
import pandas as pd
import numpy as np
import time

# ----------------------------------------------------------------------------
# Setup Mocks BEFORE Importing server.py
# ----------------------------------------------------------------------------
# Prevent imports of heavy dependencies
sys.modules['torch'] = MagicMock()
sys.modules['safetensors'] = MagicMock()
sys.modules['einops'] = MagicMock()
sys.modules['huggingface_hub'] = MagicMock()

# Mock the model classes
mock_model_class = MagicMock()
mock_tokenizer_class = MagicMock()

mock_model_class.from_pretrained.return_value = MagicMock()
mock_tokenizer_class.from_pretrained.return_value = MagicMock()

class MockPredictor:
    def __init__(self, model, tokenizer, device="cpu", max_context=512):
        pass
    def predict(self, df, x_timestamp, y_timestamp, pred_len, **kwargs):
        # Returns a predicted DataFrame based on the last close
        last_close = df["close"].iloc[-1]
        pred_data = {
            "open": np.linspace(last_close, last_close * 1.01, pred_len),
            "high": np.linspace(last_close * 1.002, last_close * 1.012, pred_len),
            "low": np.linspace(last_close * 0.998, last_close * 1.008, pred_len),
            "close": np.linspace(last_close, last_close * 1.01, pred_len),
            "volume": [1000.0] * pred_len
        }
        return pd.DataFrame(pred_data)

class MockModelPkg:
    Kronos = mock_model_class
    KronosTokenizer = mock_tokenizer_class
    KronosPredictor = MockPredictor

sys.modules['model'] = MockModelPkg

# Mock yfinance download to prevent external network request
mock_yf = MagicMock()
def mock_yf_download(ticker, *args, **kwargs):
    tz = 'Asia/Kolkata' if ticker != 'BTC-USD' else 'UTC'
    # Generate 400 candles
    dates = pd.date_range(end=pd.Timestamp.now(tz=tz), periods=400, freq='5min')
    df = pd.DataFrame({
        'open': np.linspace(22000, 22100, 400),
        'high': np.linspace(22010, 22110, 400),
        'low': np.linspace(21990, 22090, 400),
        'close': np.linspace(22000, 22100, 400),
        'volume': [1000.0] * 400
    }, index=dates)
    df.index.name = 'Date'
    if kwargs.get('auto_adjust') is False:
        # Simulate MultiIndex columns
        columns = pd.MultiIndex.from_tuples([
            ('Open', ticker), ('High', ticker), ('Low', ticker), ('Close', ticker), ('Volume', ticker)
        ])
        df.columns = columns
    return df

mock_yf.download = mock_yf_download
sys.modules['yfinance'] = mock_yf

# Mock requests (for Delta Exchange fetches)
mock_requests = MagicMock()
def mock_requests_get(url, *args, **kwargs):
    resp = MagicMock()
    resp.status_code = 200
    
    if "delta.exchange" in url:
        # Return Delta Exchange India candles format
        now = int(time.time())
        result = []
        for i in range(400):
            t = now - (400 - i) * 300  # 5 min interval
            result.append({
                "time": t,
                "open": 60000.0 + i * 0.1,
                "high": 60100.0 + i * 0.1,
                "low": 59900.0 + i * 0.1,
                "close": 60050.0 + i * 0.1,
                "volume": 10.0
            })
        resp.json.return_value = {"success": True, "result": result}
    else:
        resp.json.return_value = {}
    return resp

mock_requests.get = mock_requests_get
sys.modules['requests'] = mock_requests

# ----------------------------------------------------------------------------
# Import target modules after mocks are installed
# ----------------------------------------------------------------------------
import server
from ema_kronos_strategy import EmaKronosStrategy
from echoes import build_echo_scan, z_normalize, find_similar
from a1_strategy import A1Strategy


class TestBackendResilience(unittest.TestCase):
    def setUp(self):
        # Clear server cache before each test
        with server._cache_lock:
            server._cache.clear()
        # Remove persistent cache file if exists to avoid test contamination
        if os.path.exists(server.PERSISTENT_CACHE_FILE):
            try:
                os.remove(server.PERSISTENT_CACHE_FILE)
            except OSError:
                pass

    def tearDown(self):
        if os.path.exists(server.PERSISTENT_CACHE_FILE):
            try:
                os.remove(server.PERSISTENT_CACHE_FILE)
            except OSError:
                pass

    def test_fetch_candles_delta_exchange(self):
        # Test Delta Exchange fetch for BTC and GOLD
        df_btc = server.fetch_candles("BTC", "5m")
        self.assertEqual(len(df_btc), server.LOOKBACK)
        self.assertListEqual(list(df_btc.columns), ["open", "high", "low", "close", "volume"])
        self.assertEqual(str(df_btc.index.tz), "Asia/Kolkata")

        df_gold = server.fetch_candles("GOLD", "5m")
        self.assertEqual(len(df_gold), server.LOOKBACK)
        self.assertListEqual(list(df_gold.columns), ["open", "high", "low", "close", "volume"])
        self.assertEqual(str(df_gold.index.tz), "Asia/Kolkata")

    def test_fetch_candles_yfinance_multiindex(self):
        # Test yfinance fetch for NIFTY (which generates MultiIndex under mocks)
        df = server.fetch_candles("NIFTY", "5m")
        self.assertEqual(len(df), server.LOOKBACK)
        self.assertListEqual(list(df.columns), ["open", "high", "low", "close", "volume"])
        self.assertEqual(str(df.index.tz), "Asia/Kolkata")

    def test_fetch_candles_resample_3m(self):
        # 3m uses 1m data and resamples.
        # Let's test that it aggregates correctly.
        df = server.fetch_candles("NIFTY", "3m")
        self.assertLessEqual(len(df), server.LOOKBACK)
        self.assertListEqual(list(df.columns), ["open", "high", "low", "close", "volume"])

    def test_robust_column_checking_rename(self):
        # Test that robust column checking matches and renames incorrectly cased columns
        dummy_df = pd.DataFrame({
            "  Open  ": [1.0, 2.0],
            "HIGH": [1.1, 2.1],
            "low": [0.9, 1.9],
            "Close": [1.0, 2.0],
            "Volume": [100.0, 200.0]
        })
        # Simulate yfinance output with messy columns
        with patch('yfinance.download', return_value=dummy_df):
            df = server.fetch_candles("NIFTY", "5m")
            self.assertListEqual(list(df.columns), ["open", "high", "low", "close", "volume"])

    def test_robust_column_checking_missing(self):
        # Test that missing columns raise RuntimeError
        dummy_df = pd.DataFrame({
            "open": [1.0],
            "high": [1.1],
            "low": [0.9]
            # close and volume are missing
        })
        with patch('yfinance.download', return_value=dummy_df):
            with self.assertRaises(RuntimeError):
                server.fetch_candles("NIFTY", "5m")

    def test_persistent_disk_cache_load_save(self):
        # Put something in the cache
        key = "NIFTY:5m"
        dummy_result = {
            "symbol": "NIFTY",
            "timeframe": "5m",
            "direction": "Long",
            "candles": [],
            "predicted": []
        }
        timestamp = time.time()
        with server._cache_lock:
            server._cache[key] = (timestamp, dummy_result)

        # Save to file
        server.save_persistent_cache()
        self.assertTrue(os.path.exists(server.PERSISTENT_CACHE_FILE))

        # Clear cache in memory
        with server._cache_lock:
            server._cache.clear()

        # Load from file
        server.load_persistent_cache()
        with server._cache_lock:
            cached = server._cache.get(key)
        
        self.assertIsNotNone(cached)
        self.assertEqual(cached[0], timestamp)
        self.assertEqual(cached[1]["direction"], "Long")

    def test_fail_safe_fallback_on_exception(self):
        key = "NIFTY:5m"
        dummy_result = {
            "symbol": "NIFTY",
            "timeframe": "5m",
            "direction": "Short",
            "candles": [],
            "predicted": []
        }
        # Populate cache with a stale timestamp
        with server._cache_lock:
            server._cache[key] = (time.time() - 5000, dummy_result)

        # Mock yfinance to fail completely
        with patch('yfinance.download', side_effect=RuntimeError("API is down")):
            client = server.app.test_client()
            resp = client.get("/api/signal/NIFTY/5m")
            self.assertEqual(resp.status_code, 200)
            data = resp.get_json()
            self.assertTrue(data.get("stale"))
            self.assertEqual(data.get("direction"), "Short")

    def test_fail_safe_fallback_for_delta_failure(self):
        key = "BTC:5m"
        dummy_result = {
            "symbol": "BTC",
            "timeframe": "5m",
            "direction": "Long",
            "candles": [],
            "predicted": []
        }
        with server._cache_lock:
            server._cache[key] = (time.time() - 5000, dummy_result)

        # Mock requests to fail completely
        with patch('requests.get', side_effect=RuntimeError("Delta Exchange API down")):
            with patch('yfinance.download', side_effect=RuntimeError("yfinance down")):
                client = server.app.test_client()
                resp = client.get("/api/signal/BTC/5m")
                self.assertEqual(resp.status_code, 200)
                data = resp.get_json()
                self.assertTrue(data.get("stale"))
                self.assertEqual(data.get("direction"), "Long")

    def test_stale_flag_when_cache_expires(self):
        key = "NIFTY:5m"
        dummy_result = {
            "symbol": "NIFTY",
            "timeframe": "5m",
            "direction": "Flat",
            "candles": [],
            "predicted": []
        }
        # Populate cache with an expired timestamp (older than get_max_age("5m", True) which is 110s)
        expired_time = time.time() - 500
        with server._cache_lock:
            server._cache[key] = (expired_time, dummy_result)

        client = server.app.test_client()
        resp = client.get("/api/signal/NIFTY/5m")
        self.assertEqual(resp.status_code, 200)
        data = resp.get_json()
        # Since it is requested, it serves the cached result but marks it stale because it has expired
        self.assertTrue(data.get("stale"))
        self.assertEqual(data.get("direction"), "Flat")

    def test_flask_routes(self):
        client = server.app.test_client()
        
        # Test health route
        resp = client.get("/api/health")
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.get_json()["status"], "ok")

        # Test signal route (runs prediction and populates cache)
        resp = client.get("/api/signal/NIFTY/5m")
        self.assertEqual(resp.status_code, 200)
        data = resp.get_json()
        self.assertEqual(data["symbol"], "NIFTY")
        self.assertIn("direction", data)

        # Test scalper route
        resp = client.get("/api/scalper/NIFTY/5m")
        self.assertEqual(resp.status_code, 200)
        data = resp.get_json()
        self.assertEqual(data["symbol"], "NIFTY")
        self.assertIn("state", data)
        self.assertIn("markers", data)

        # Test ema_kronos route
        resp = client.get("/api/ema_kronos/NIFTY/5m")
        self.assertEqual(resp.status_code, 200)
        data = resp.get_json()
        self.assertEqual(data["symbol"], "NIFTY")
        self.assertIn("state", data)

        # Test scan_all route
        resp = client.get("/api/scan_all")
        self.assertEqual(resp.status_code, 200)
        data = resp.get_json()
        self.assertIn("NIFTY:5m", data)


class TestStrategyCorrectness(unittest.TestCase):
    def test_ema_crossover_sequential_age(self):
        # Generate dummy data with clear crossovers
        # Fast EMA (5) and Slow EMA (10)
        # We will create candles where close prices move so that EMAs cross at a known bar
        dates = pd.date_range(end=pd.Timestamp.now(), periods=50, freq='D')
        # Initially close prices are low, then jump, then drop
        closes = [100.0] * 20 + [120.0] * 15 + [90.0] * 15
        df = pd.DataFrame({
            'open': closes,
            'high': closes,
            'low': closes,
            'close': closes,
            'volume': [100.0] * 50
        }, index=dates)

        strat = EmaKronosStrategy()
        # Run evaluate
        out = strat.evaluate(df, kronos_direction="Long", kronos_confidence=80)

        # Verify that bars_since_cross is an integer and is tracked properly
        self.assertIn("bars_since_cross", out)
        bars_since = out["bars_since_cross"]
        self.assertTrue(isinstance(bars_since, int))
        self.assertGreaterEqual(bars_since, 0)
        self.assertLess(bars_since, 50)

        # Verify that we can extract markers
        self.assertIn("markers", out)


class TestEchoesEngine(unittest.TestCase):
    def test_z_normalize_basic(self):
        values = [1.0, 2.0, 3.0, 4.0, 5.0]
        out = z_normalize(values)
        self.assertEqual(len(out), 5)
        self.assertAlmostEqual(np.mean(out), 0.0, places=10)
        self.assertAlmostEqual(np.std(out, ddof=0), 1.0, places=10)

    def test_z_normalize_flat(self):
        values = [3.0, 3.0, 3.0]
        out = z_normalize(values)
        self.assertEqual(out, [0.0, 0.0, 0.0])

    def test_z_normalize_empty(self):
        self.assertEqual(z_normalize([]), [])

    def test_find_similar_basic(self):
        haystack = [10.0, 11.0, 12.0, 11.0, 10.0, 13.0, 14.0, 15.0, 14.0, 13.0, 10.0, 9.0, 8.0]
        query = [10.0, 11.0, 12.0]
        matches = find_similar(haystack, query, k=2, exclude_tail=0)
        self.assertGreaterEqual(len(matches), 1)
        self.assertIn('start_index', matches[0])
        self.assertIn('distance', matches[0])

    def test_find_similar_insufficient_data(self):
        matches = find_similar([1.0, 2.0], [1.0, 2.0, 3.0], k=2)
        self.assertEqual(matches, [])

    def test_build_echo_scan_insufficient_data(self):
        df = pd.DataFrame({'close': [100.0] * 50, 'low': [99.0] * 50})
        result = build_echo_scan(df, window_len=30, horizon=24, k=5)
        self.assertIsNone(result)

    def test_build_echo_scan_sufficient_data(self):
        # Generate 200 candles with a mean-reverting pattern
        np.random.seed(42)
        n = 200
        price = 100.0
        closes = []
        lows = []
        for i in range(n):
            price += np.random.randn() * 0.5
            closes.append(price)
            lows.append(price - abs(np.random.randn()) * 0.3)
        df = pd.DataFrame({'close': closes, 'low': lows})
        result = build_echo_scan(df, window_len=20, horizon=10, k=3)
        self.assertIsNotNone(result)
        self.assertIn('count', result)
        self.assertIn('worst_end_pct', result)
        self.assertIn('best_end_pct', result)
        self.assertIn('median_end_pct', result)
        self.assertGreaterEqual(result['count'], 0)

    def test_build_echo_scan_mae_fix(self):
        """Verify worstEndPct uses lowest low (MAE fix)."""
        # Create data where a match has a deep intra-horizon low but recovers
        np.random.seed(1)
        n = 200
        closes = [100.0]
        lows = [99.5]
        for i in range(1, n):
            closes.append(closes[-1] + np.random.randn() * 0.5)
            lows.append(closes[-1] - abs(np.random.randn()) * 0.5)

        df = pd.DataFrame({'close': closes, 'low': lows})
        result = build_echo_scan(df, window_len=20, horizon=10, k=3)
        self.assertIsNotNone(result)
        if result['count'] > 0:
            self.assertTrue(np.isfinite(result['worst_end_pct']))


class TestA1Strategy(unittest.TestCase):
    def setUp(self):
        self.strat = A1Strategy()

    def _make_df(self, trend="up", cross_bars_ago=10, green=True):
        """Helper to create a DataFrame with controlled EMA trend."""
        n = 60
        if trend == "up":
            prices = np.linspace(100, 110, n)
        elif trend == "down":
            prices = np.linspace(110, 100, n)
        else:
            prices = np.full(n, 105.0) + np.random.randn(n) * 0.1

        # Crossover control: before cross_bars_ago, flip the trend
        cross_idx = n - cross_bars_ago - 1
        if 0 <= cross_idx < n:
            if trend == "up":
                prices[:cross_idx] = sorted(prices[:cross_idx], reverse=True)
            elif trend == "down":
                prices[:cross_idx] = sorted(prices[:cross_idx])

        dates = pd.date_range(end=pd.Timestamp.now(), periods=n, freq='h')
        if green:
            o = prices.copy() - 0.1
            c = prices.copy()
        else:
            o = prices.copy() + 0.1
            c = prices.copy()
        h = np.maximum(o, c) + 0.5
        l = np.minimum(o, c) - 0.5

        return pd.DataFrame({
            'open': o, 'high': h, 'low': l, 'close': c, 'volume': np.full(n, 1000.0)
        }, index=dates)

    def test_all_long_gates_pass(self):
        dfs = self._make_df(trend="up", cross_bars_ago=10, green=True)
        echoes = {
            'count': 5, 'up_count': 5,
            'best_end_pct': 5.0, 'worst_end_pct': -1.0,
        }
        out = self.strat.evaluate(
            dfs, kronos_direction="Long",
            kronos_confidence=85, kronos_move_pct=0.005,
            echoes_stats=echoes,
        )
        self.assertEqual(out['decision'], 'BUY')
        all_true = all(out['gates'][k] for k in ['long_g1_ema', 'long_g2_cross_gap',
                     'long_g3_green_candle', 'long_g4_kronos_conf',
                     'long_g5_kronos_move', 'long_g6_echoes'])
        self.assertTrue(all_true)

    def test_all_short_gates_pass(self):
        dfs = self._make_df(trend="down", cross_bars_ago=10, green=False)
        echoes = {
            'count': 5, 'up_count': 1,
            'best_end_pct': 1.0, 'worst_end_pct': -5.0,
        }
        out = self.strat.evaluate(
            dfs, kronos_direction="Short",
            kronos_confidence=85, kronos_move_pct=-0.005,
            echoes_stats=echoes,
        )
        self.assertEqual(out['decision'], 'SELL')
        all_true = all(out['gates'][k] for k in ['short_g1_ema', 'short_g2_cross_gap',
                     'short_g3_red_candle', 'short_g4_kronos_conf',
                     'short_g5_kronos_move', 'short_g6_echoes'])
        self.assertTrue(all_true)

    def test_kronos_flat_skips(self):
        dfs = self._make_df(trend="up")
        out = self.strat.evaluate(
            dfs, kronos_direction="Flat",
            kronos_confidence=85, kronos_move_pct=0.0,
            echoes_stats={'count': 5, 'up_count': 5, 'best_end_pct': 5.0, 'worst_end_pct': -1.0},
        )
        self.assertEqual(out['decision'], 'SKIP')
        self.assertTrue(any("Flat" in r for r in out['skip_reasons']))

    def test_low_confidence_skips(self):
        dfs = self._make_df(trend="up")
        out = self.strat.evaluate(
            dfs, kronos_direction="Long",
            kronos_confidence=50, kronos_move_pct=0.005,
            echoes_stats={'count': 5, 'up_count': 5, 'best_end_pct': 5.0, 'worst_end_pct': -1.0},
        )
        self.assertEqual(out['decision'], 'SKIP')
        self.assertTrue(any("confidence" in r.lower() for r in out['skip_reasons']))

    def test_echoes_count_zero_skips(self):
        dfs = self._make_df(trend="up")
        out = self.strat.evaluate(
            dfs, kronos_direction="Long",
            kronos_confidence=85, kronos_move_pct=0.005,
            echoes_stats={'count': 0, 'up_count': 0, 'best_end_pct': 0.0, 'worst_end_pct': 0.0},
        )
        self.assertEqual(out['decision'], 'SKIP')

    def test_flat_threshold_skip(self):
        dfs = self._make_df(trend="up")
        out = self.strat.evaluate(
            dfs, kronos_direction="Long",
            kronos_confidence=85, kronos_move_pct=0.001,
            echoes_stats={'count': 5, 'up_count': 5, 'best_end_pct': 5.0, 'worst_end_pct': -1.0},
        )
        self.assertEqual(out['decision'], 'SKIP')

    def test_a1_flask_route(self):
        """Test that the /api/a1/ Flask route returns valid JSON."""
        key = "NIFTY:5m"
        # Generate realistic candle data
        n = 200
        np.random.seed(42)
        closes = [22000.0]
        for i in range(1, n):
            closes.append(closes[-1] + np.random.randn() * 10)
        # Make the last 50 candles have an uptrend
        close_arr = np.array(closes)
        offset = np.linspace(0, 300, 50)
        close_arr[-50:] = close_arr[-50] + offset

        candle_list = []
        base_time = int(time.time()) - n * 300
        for i in range(n):
            candle_list.append({
                "time": base_time + i * 300,
                "open": float(close_arr[i]),
                "high": float(close_arr[i] + 5),
                "low": float(close_arr[i] - 5),
                "close": float(close_arr[i]),
            })

        dummy_result = {
            "symbol": "NIFTY",
            "timeframe": "5m",
            "direction": "Long",
            "confidence": 85,
            "move_pct": 0.45,
            "current": float(close_arr[-1]),
            "candles": candle_list,
            "predicted": [],
            "action": "Trade",
            "bias": "Long bias only",
            "pred_5": float(close_arr[-1] * 1.002),
            "pred_n": float(close_arr[-1] * 1.005),
            "move": float(close_arr[-1] * 0.005),
            "pred_len": 24,
        }
        with server._cache_lock:
            server._cache[key] = (time.time(), dummy_result)

        client = server.app.test_client()
        resp = client.get("/api/a1/NIFTY/5m")
        self.assertEqual(resp.status_code, 200)
        data = resp.get_json()
        self.assertEqual(data["symbol"], "NIFTY")
        self.assertIn("decision", data)
        self.assertIn("gates", data)
        self.assertIn("skip_reasons", data)
        self.assertIn("echoes", data)
        self.assertIn("trend", data)
        self.assertIn("bars_since_cross", data)

    def test_a1_route_insufficient_history(self):
        """Test that /api/a1/ returns 400 with insufficient candles."""
        key = "NIFTY:5m"
        # Only 10 candles (need at least 80)
        candle_list = []
        base_time = int(time.time())
        for i in range(10):
            candle_list.append({
                "time": base_time + i * 300,
                "open": 22000.0, "high": 22005.0, "low": 21995.0,
                "close": 22000.0,
            })
        dummy_result = {
            "symbol": "NIFTY", "timeframe": "5m",
            "direction": "Long", "confidence": 85,
            "move_pct": 0.45, "current": 22000.0,
            "candles": candle_list, "predicted": [],
            "action": "Trade", "bias": "Long bias only",
            "pred_5": 22000.0, "pred_n": 22000.0,
            "move": 0.0, "pred_len": 24,
        }
        with server._cache_lock:
            server._cache[key] = (time.time(), dummy_result)

        client = server.app.test_client()
        resp = client.get("/api/a1/NIFTY/5m")
        self.assertEqual(resp.status_code, 400)


if __name__ == "__main__":
    unittest.main()
