import sqlite3
import json
import time
import os

DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "predictions.db")

def get_db_connection():
    conn = sqlite3.connect(DB_FILE, timeout=10.0)
    # Enable WAL mode for concurrent read/write
    conn.execute("PRAGMA journal_mode=WAL;")
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    # Create cache table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS cache (
            key TEXT PRIMARY KEY,
            timestamp REAL,
            result TEXT
        );
    """)
    # Create requests table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            symbol TEXT,
            timeframe TEXT,
            status TEXT,
            created_at REAL
        );
    """)
    # Create active combinations tracking table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS active_combos (
            key TEXT PRIMARY KEY,
            last_requested_at REAL
        );
    """)
    # Create index for quick request queries
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_requests_status ON requests (status, created_at);")
    conn.commit()
    conn.close()

class SQLiteCache:
    @staticmethod
    def get(key):
        try:
            conn = get_db_connection()
            row = conn.execute("SELECT timestamp, result FROM cache WHERE key = ?", (key,)).fetchone()
            conn.close()
            if row:
                return row["timestamp"], json.loads(row["result"])
        except Exception as e:
            print(f"[SQLiteCache Error] get failed for key {key}: {e}")
        return None

    @staticmethod
    def set(key, result):
        try:
            timestamp = time.time()
            conn = get_db_connection()
            conn.execute(
                "INSERT OR REPLACE INTO cache (key, timestamp, result) VALUES (?, ?, ?)",
                (key, timestamp, json.dumps(result))
            )
            conn.commit()
            conn.close()
        except Exception as e:
            print(f"[SQLiteCache Error] set failed for key {key}: {e}")

    @staticmethod
    def record_active(key):
        try:
            conn = get_db_connection()
            conn.execute(
                "INSERT OR REPLACE INTO active_combos (key, last_requested_at) VALUES (?, ?)",
                (key, time.time())
            )
            conn.commit()
            conn.close()
        except Exception as e:
            print(f"[SQLiteCache Error] record_active failed for {key}: {e}")

    @staticmethod
    def get_active_keys(cutoff_seconds=300):
        try:
            cutoff_time = time.time() - cutoff_seconds
            conn = get_db_connection()
            rows = conn.execute(
                "SELECT key FROM active_combos WHERE last_requested_at > ?",
                (cutoff_time,)
            ).fetchall()
            conn.close()
            return [r["key"] for r in rows]
        except Exception as e:
            print(f"[SQLiteCache Error] get_active_keys failed: {e}")
            return []

    @staticmethod
    def add_request(symbol, timeframe):
        try:
            conn = get_db_connection()
            # Delete old pending requests for the same combo to avoid queue backup
            conn.execute(
                "DELETE FROM requests WHERE symbol = ? AND timeframe = ? AND status = 'pending'",
                (symbol, timeframe)
            )
            conn.execute(
                "INSERT INTO requests (symbol, timeframe, status, created_at) VALUES (?, ?, 'pending', ?)",
                (symbol, timeframe, time.time())
            )
            conn.commit()
            conn.close()
        except Exception as e:
            print(f"[SQLiteCache Error] add_request failed for {symbol}:{timeframe}: {e}")

    @staticmethod
    def get_pending_requests():
        try:
            conn = get_db_connection()
            rows = conn.execute(
                "SELECT id, symbol, timeframe FROM requests WHERE status = 'pending' ORDER BY created_at ASC"
            ).fetchall()
            conn.close()
            return [(r["id"], r["symbol"], r["timeframe"]) for r in rows]
        except Exception as e:
            print(f"[SQLiteCache Error] get_pending_requests failed: {e}")
            return []

    @staticmethod
    def mark_request_completed(request_id):
        try:
            conn = get_db_connection()
            conn.execute("UPDATE requests SET status = 'completed' WHERE id = ?", (request_id,))
            conn.commit()
            conn.close()
        except Exception as e:
            print(f"[SQLiteCache Error] mark_request_completed failed for id {request_id}: {e}")

    @staticmethod
    def clear_old_requests():
        try:
            conn = get_db_connection()
            # Delete requests older than 5 minutes
            conn.execute("DELETE FROM requests WHERE created_at < ?", (time.time() - 300,))
            conn.commit()
            conn.close()
        except Exception as e:
            print(f"[SQLiteCache Error] clear_old_requests failed: {e}")

# Automatically initialize DB on import
init_db()
