# Kronos Live Trading System — Simple Guide

A plain-English guide to what this system is, how it works, and how to use it
with your EMA crossover in the live market.

---

## 1. What is this in one sentence?

It is an AI "second opinion" that looks at recent candles and predicts which way
price is likely to move next — and you use that to **confirm or block** your EMA
crossover trades.

It does **not** trade for you. It does **not** replace your strategy. It is a filter.

---

## 2. The mental model

Think of it like a co-pilot:

- **You (EMA crossover)** decide *when* to enter — the 9/21 EMA cross is the trigger.
- **Kronos (the AI)** decides *whether to allow* that entry — it predicts the next
  candles and says Long, Short, or Flat.
- **Your existing SL / TP / position sizing** stays exactly the same.

```
EMA crossover fires  →  ask Kronos  →  agree? take it   /   disagree? skip it
```

---

## 3. What Kronos actually does (under the hood)

1. Takes your last 400 candles (open, high, low, close, volume).
2. Predicts the next 24 candles (you can change this number).
3. Compares the predicted future close to the current close.
4. Returns a direction:
   - Predicted clearly higher → **Long**
   - Predicted clearly lower → **Short**
   - Predicted roughly flat → **Flat** (no edge)

That is it. It is a forecast, turned into a one-word lean.

---

## 4. How accuracy really works (read this before risking money)

**The published research numbers are real but easy to misread.**

The Kronos paper (accepted to AAAI 2026, trained on 12+ billion candles from 45+
exchanges) reports strong "RankIC" improvements over other models. But:

- `RankIC` measures *ranking correlation*, **not** win rate. "93% better RankIC"
  does NOT mean "93% of trades win."
- A state-of-the-art forecasting model can still be wrong on direction 45–48% of
  the time. That is normal for markets.
- The model's authors themselves call the included backtest a **demo** and warn it
  ignores transaction costs, slippage, and risk controls.
- It was trained mostly on crypto and global equities — **nobody has published a
  win rate for Nifty / Bank Nifty.**

**Bottom line:** there is no honest "X% accurate" number for your specific use.
The ONLY way to know how well it works on your instrument and timeframe is to
**backtest it on your own historical Nifty / Bank Nifty data first.**

If anyone quotes you a fixed accuracy for live Indian index trading, they are guessing.

---

## 5. The decision table (the heart of the system)

| Your EMA crossover | Kronos says | What happens          |
|--------------------|-------------|-----------------------|
| Long               | Long        | Take long, full size  |
| Long               | Flat        | Skip (or half size)   |
| Long               | Short       | Skip — conflict       |
| Short              | Short       | Take short, full size |
| Short              | Flat        | Skip (or half size)   |
| Short              | Long        | Skip — conflict       |

Only trades where **EMA and Kronos agree** get through. The conflicting ones —
often the false breakouts that stop you out — get filtered.

This also means you will get **fewer trades** than raw EMA. That is the point.
But you must confirm the filter removes losers, not winners (see backtesting).

---

## 6. How to run it — three ways

### Way 1: Live dashboard (just watch the signal)

```bash
cd kronos_live
bash setup.sh                       # one time
source venv/bin/activate
python server.py
```

Open `http://YOUR_VPS_IP:8080`. You see a live candlestick chart with predicted
candles in amber and a Long/Short/Flat signal that refreshes every 60 seconds.
Good for manual trading or just sanity-checking your bot.

### Way 2: Inside your bot (auto-filter your EMA trades)

Add this to your existing bot, once per closed candle:

```python
from strategy import StrategyEngine

engine = StrategyEngine(fast=9, slow=21, device="cpu")   # load once at startup

# each time a candle closes:
decision = engine.evaluate(df)      # df = your last 400+ candles

if decision["take_trade"]:
    side = decision["side"]         # "BUY" or "SELL"
    place_order(side)               # <-- your existing order code, SL, TP, sizing
else:
    print("Skip:", decision["reason"])
```

You only use `take_trade` and `side`. Everything else is for your logs.

### Way 3: Quick test on a CSV (no live data needed)

```bash
source venv/bin/activate
python strategy.py mydata.csv --fast 9 --slow 21
```

Prints whether it would take the trade and why.

---

## 7. The settings you can tune

When you create the engine:

| Setting           | Default  | What it does                                            |
|-------------------|----------|---------------------------------------------------------|
| `fast`            | 9        | Fast EMA period (your crossover)                        |
| `slow`            | 21       | Slow EMA period                                         |
| `flat_threshold`  | 0.0015   | Moves under 0.15% = Flat. Raise it to be stricter.      |
| `allow_flat`      | False    | True = still trade on Flat at half size                 |
| `pred_len`        | 24       | How many candles ahead Kronos looks                     |
| `device`          | "cpu"    | "cuda:0" if you have a GPU                               |

Match `pred_len` roughly to how long you usually hold a trade.

---

## 8. The daily live-trading routine

1. Start the bot / dashboard before market open.
2. Bot watches candles. When 9/21 EMA crosses, it calls `engine.evaluate(df)`.
3. If Kronos agrees → order goes through with your normal SL/TP.
4. If Kronos disagrees or is Flat → trade is skipped, logged with the reason.
5. At end of day, review the log: which skips would have lost? which would have won?
6. Adjust `flat_threshold` over time based on what you learn.

---

## 9. Honest limits and cautions

- **It is a probabilistic aid, not a crystal ball.** It will be wrong a meaningful
  fraction of the time. Always keep your stop-loss.
- **Free data lags.** yfinance can be a few minutes behind and may rate-limit. For
  serious live trading, switch to a broker feed (Kite, Dhan, Fyers, Upstox).
- **CPU is slow.** One prediction takes ~5–15 seconds, which is why the dashboard
  refreshes on a 60s+ timer.
- **Fewer trades.** The filter cuts trade count. Confirm it cuts losers, not winners.
- **No native 1m/3m on free data.** True fast intraday needs a broker feed.
- **This is not financial advice.** You are responsible for your own risk.

---

## 10. The one thing to do before going live

**Backtest on your own Nifty / Bank Nifty history.** Run your raw EMA crossover and
the EMA+Kronos version side by side over a few months of candles, and compare:

- Number of trades
- Win rate
- Average win vs average loss
- Net result after costs

If the Kronos filter improves your numbers, use it. If it does not, you have lost
nothing but a little time — and you have avoided risking real money on an untested
assumption. That is the whole point of testing first.
