"""
EMA Crossover + Kronos Filter
=============================
Your EMA crossover decides WHEN to enter.
Kronos decides WHETHER to allow that entry.

Logic:
  EMA Long  + Kronos Long  -> TAKE LONG  (full size)
  EMA Long  + Kronos Flat  -> SKIP (or half size, your choice)
  EMA Long  + Kronos Short -> SKIP (conflict)
  EMA Short + Kronos Short -> TAKE SHORT (full size)
  EMA Short + Kronos Flat  -> SKIP (or half size)
  EMA Short + Kronos Long  -> SKIP (conflict)

Usage in your bot, once per closed candle:

    from strategy import StrategyEngine
    engine = StrategyEngine(fast=9, slow=21, device="cpu")

    decision = engine.evaluate(df)   # df = your recent OHLCV candles (>= 400 rows)
    if decision["take_trade"]:
        side = decision["side"]      # "BUY" or "SELL"
        # ... place order with YOUR existing SL/TP/sizing ...
    else:
        print("Skip:", decision["reason"])
"""
import os
import sys
from datetime import timedelta

import numpy as np
import pandas as pd

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from model import Kronos, KronosTokenizer, KronosPredictor


def ema(series, span):
    return series.ewm(span=span, adjust=False).mean()


def ema_crossover_signal(df, fast=9, slow=21):
    """Return 'LONG', 'SHORT', or None based on the LAST closed candle.

    LONG  = fast EMA crossed ABOVE slow EMA on the last candle
    SHORT = fast EMA crossed BELOW slow EMA on the last candle
    None  = no fresh cross on the last candle
    """
    close = df["close"]
    ef = ema(close, fast)
    es = ema(close, slow)

    # state on last two candles
    prev_diff = ef.iloc[-2] - es.iloc[-2]
    curr_diff = ef.iloc[-1] - es.iloc[-1]

    if prev_diff <= 0 and curr_diff > 0:
        return "LONG"
    if prev_diff >= 0 and curr_diff < 0:
        return "SHORT"
    return None


class StrategyEngine:
    def __init__(self, fast=9, slow=21,
                 model="NeoQuasar/Kronos-small",
                 tokenizer="NeoQuasar/Kronos-Tokenizer-base",
                 device="cpu", lookback=400, pred_len=24,
                 flat_threshold=0.0015, allow_flat=False):
        self.fast = fast
        self.slow = slow
        self.lookback = lookback
        self.pred_len = pred_len
        self.flat_threshold = flat_threshold   # below this % move = Flat
        self.allow_flat = allow_flat            # if True, take trade on Flat at reduced size

        print("[Strategy] Loading Kronos...")
        tok = KronosTokenizer.from_pretrained(tokenizer)
        mdl = Kronos.from_pretrained(model)
        self.predictor = KronosPredictor(mdl, tok, device=device, max_context=512)
        print("[Strategy] Ready")

    def kronos_direction(self, df):
        """Run Kronos and return (direction, move_pct, confidence)."""
        df = df.tail(self.lookback).reset_index(drop=True)
        x_df = df[["open", "high", "low", "close", "volume"]]

        # build timestamps
        if "timestamps" in df.columns:
            x_ts = pd.to_datetime(df["timestamps"])
        elif isinstance(df.index, pd.DatetimeIndex):
            x_ts = df.index.to_series().reset_index(drop=True)
        else:
            x_ts = pd.Series(pd.date_range("2020-01-01", periods=len(df), freq="5min"))

        freq = x_ts.diff().median()
        if pd.isna(freq):
            freq = timedelta(minutes=5)
        last = x_ts.iloc[-1]
        y_ts = pd.Series(pd.date_range(start=last + freq, periods=self.pred_len, freq=freq))

        pred = self.predictor.predict(
            df=x_df, x_timestamp=x_ts, y_timestamp=y_ts,
            pred_len=self.pred_len, T=1.0, top_p=0.9,
            sample_count=1, verbose=False,
        )

        current = float(df["close"].iloc[-1])
        final = float(pred["close"].iloc[-1])
        move_pct = (final - current) / current if current else 0.0
        confidence = int(max(50, min(95, 50 + abs(move_pct) * 4000)))

        if abs(move_pct) < self.flat_threshold:
            direction = "FLAT"
        elif move_pct > 0:
            direction = "LONG"
        else:
            direction = "SHORT"
        return direction, move_pct, confidence

    def evaluate(self, df):
        """Combine EMA crossover with Kronos filter. Returns a decision dict."""
        ema_sig = ema_crossover_signal(df, self.fast, self.slow)

        if ema_sig is None:
            return {
                "take_trade": False, "side": None,
                "ema_signal": None, "kronos": None,
                "reason": "No fresh EMA crossover on last candle",
            }

        direction, move_pct, confidence = self.kronos_direction(df)

        # Decision matrix
        if direction == ema_sig:                       # agreement
            side = "BUY" if ema_sig == "LONG" else "SELL"
            return {
                "take_trade": True, "side": side, "size": "full",
                "ema_signal": ema_sig, "kronos": direction,
                "confidence": confidence, "move_pct": round(move_pct * 100, 3),
                "reason": f"EMA {ema_sig} confirmed by Kronos {direction}",
            }

        if direction == "FLAT":                        # no edge
            if self.allow_flat:
                side = "BUY" if ema_sig == "LONG" else "SELL"
                return {
                    "take_trade": True, "side": side, "size": "half",
                    "ema_signal": ema_sig, "kronos": direction,
                    "confidence": confidence, "move_pct": round(move_pct * 100, 3),
                    "reason": f"EMA {ema_sig}, Kronos Flat -> reduced size",
                }
            return {
                "take_trade": False, "side": None,
                "ema_signal": ema_sig, "kronos": direction,
                "confidence": confidence, "move_pct": round(move_pct * 100, 3),
                "reason": f"EMA {ema_sig} but Kronos Flat -> skip",
            }

        # conflict
        return {
            "take_trade": False, "side": None,
            "ema_signal": ema_sig, "kronos": direction,
            "confidence": confidence, "move_pct": round(move_pct * 100, 3),
            "reason": f"EMA {ema_sig} but Kronos {direction} -> conflict, skip",
        }


if __name__ == "__main__":
    # Quick demo on a CSV
    import argparse
    ap = argparse.ArgumentParser()
    ap.add_argument("csv", help="OHLCV csv with at least 400 rows")
    ap.add_argument("--fast", type=int, default=9)
    ap.add_argument("--slow", type=int, default=21)
    args = ap.parse_args()

    df = pd.read_csv(args.csv)
    df.columns = [c.lower() for c in df.columns]

    engine = StrategyEngine(fast=args.fast, slow=args.slow)
    decision = engine.evaluate(df)

    print("\n" + "=" * 50)
    for k, v in decision.items():
        print(f"  {k:14}: {v}")
    print("=" * 50)
    if decision["take_trade"]:
        print(f"\n  >>> PLACE {decision['side']} ({decision['size']} size) <<<")
    else:
        print(f"\n  >>> NO TRADE: {decision['reason']} <<<")
