"""
Predict from a CSV file (no live data needed).
Useful for backtesting, testing the model, or when you have your own broker export.

CSV must have columns: timestamps, open, high, low, close, volume

Usage:
    python predict_csv.py your_data.csv
    python predict_csv.py your_data.csv --lookback 400 --pred 24
"""
import argparse
import os
import sys

import pandas as pd

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from model import Kronos, KronosTokenizer, KronosPredictor


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("csv", help="Path to OHLCV csv")
    ap.add_argument("--lookback", type=int, default=400)
    ap.add_argument("--pred", type=int, default=24)
    ap.add_argument("--device", default="cpu")
    ap.add_argument("--model", default="NeoQuasar/Kronos-small")
    ap.add_argument("--tokenizer", default="NeoQuasar/Kronos-Tokenizer-base")
    args = ap.parse_args()

    df = pd.read_csv(args.csv)
    df.columns = [c.lower() for c in df.columns]
    ts_col = "timestamps" if "timestamps" in df.columns else (
        "timestamp" if "timestamp" in df.columns else "date")
    df[ts_col] = pd.to_datetime(df[ts_col])

    print(f"Loaded {len(df)} rows from {args.csv}")
    print("Loading Kronos model...")
    tok = KronosTokenizer.from_pretrained(args.tokenizer)
    mdl = Kronos.from_pretrained(args.model)
    predictor = KronosPredictor(mdl, tok, device=args.device, max_context=512)

    lookback, pred_len = args.lookback, args.pred
    df = df.tail(lookback).reset_index(drop=True)

    x_df = df[["open", "high", "low", "close", "volume"]]
    x_ts = df[ts_col]
    freq = df[ts_col].diff().median()
    last = df[ts_col].iloc[-1]
    y_ts = pd.Series(pd.date_range(start=last + freq, periods=pred_len, freq=freq))

    print(f"Predicting next {pred_len} candles...")
    pred = predictor.predict(df=x_df, x_timestamp=x_ts, y_timestamp=y_ts,
                             pred_len=pred_len, T=1.0, top_p=0.9,
                             sample_count=1, verbose=True)

    current = float(df["close"].iloc[-1])
    final = float(pred["close"].iloc[-1])
    move = final - current
    print("\n" + "=" * 48)
    print(f"Current close:    {current:,.2f}")
    print(f"Predicted close:  {final:,.2f}")
    print(f"Expected move:    {move:+,.2f} ({move/current*100:+.2f}%)")
    direction = "LONG" if move > 0 else ("SHORT" if move < 0 else "FLAT")
    if abs(move / current) < 0.0015:
        direction = "FLAT / skip"
    print(f"Kronos signal:    {direction}")
    print("=" * 48)
    print("\nPredicted candles:")
    print(pred.round(2).to_string())


if __name__ == "__main__":
    main()
