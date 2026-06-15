# Kronos Live Trading Dashboard

A standalone live signal dashboard for **Nifty 50** and **Bank Nifty** powered by the
Kronos forecasting model. Shows a real candlestick chart (TradingView lightweight-charts)
with the historical candles plus Kronos's predicted future candles, a live LONG/SHORT/FLAT
signal, confidence, and expected move. Auto-refreshes on a timer.

> **What this is:** a *direction filter / second screen*. Kronos predicts where price is
> likely to go next; you still use your own entry signals (EMA cross, RSI, etc.) for the
> actual trade. Kronos just tells you which side to take — or to skip.

---

## Folder contents

```
kronos_live/
├── model/                  # Kronos model code (from the original repo)
│   ├── __init__.py
│   ├── kronos.py
│   └── module.py
├── templates/
│   └── dashboard.html      # Candlestick dashboard (lightweight-charts)
├── server.py               # Flask server: live data + model + API + dashboard
├── strategy.py             # EMA crossover + Kronos filter (your live trading logic)
├── predict_csv.py          # Offline: predict from your own CSV (no live data)
├── requirements.txt
├── setup.sh                # One-time VPS setup
├── ecosystem.config.js     # PM2 config to keep it running
└── README.md
```

---

## Quick start (VPS or local)

```bash
# 1. unzip and enter
unzip kronos_live.zip && cd kronos_live

# 2. one-time setup (creates venv, installs torch + deps)
bash setup.sh

# 3. run
source venv/bin/activate
python server.py
```

Then open **http://YOUR_VPS_IP:8080** in any browser (works on phone too).

The first launch downloads the Kronos model (~100 MB) from HuggingFace, then caches it.

---

## Keep it running 24/7 with PM2

```bash
# install pm2 once
npm install -g pm2

# start
pm2 start ecosystem.config.js
pm2 save
pm2 startup        # follow the printed command to enable on boot

# monitor
pm2 logs kronos-dashboard
pm2 status
```

---

## How it works

```
Browser dashboard  ──fetch every 60s──►  Flask /api/signal/NIFTY/5m
                                               │
                                               ▼
                                   yfinance: last 400 candles
                                               │
                                               ▼
                                   Kronos.predict() → 24 future candles
                                               │
                                               ▼
                              direction + confidence + candle arrays  ──► chart
```

- **Actual candles** render in green/red.
- **Predicted candles** render in amber, continuing from the last real candle.
- The signal panel turns green (Long), red (Short), or gray (Flat/Skip).

---

## Configuration (environment variables)

| Variable           | Default                         | Meaning                                  |
|--------------------|---------------------------------|------------------------------------------|
| `KRONOS_MODEL`     | `NeoQuasar/Kronos-small`        | Model size (mini / small / base)         |
| `KRONOS_TOKENIZER` | `NeoQuasar/Kronos-Tokenizer-base` | Tokenizer                              |
| `KRONOS_DEVICE`    | `cpu`                           | `cpu` or `cuda:0` if you have a GPU      |
| `KRONOS_LOOKBACK`  | `400`                           | Candles fed to the model                 |
| `KRONOS_PRED_LEN`  | `24`                            | Candles predicted ahead                  |
| `KRONOS_PORT`      | `8080`                          | Web port                                 |
| `KRONOS_CACHE`     | `60`                            | Min seconds between recomputes per symbol|

Example:
```bash
KRONOS_DEVICE=cuda:0 KRONOS_PRED_LEN=48 python server.py
```

---

## Timeframes

yfinance has no native 3-minute candle, so `3m` is served using `5m` data. Native
support: `5m`, `15m`, `30m`, `1h`, `1d`. (1-minute data is limited to the last 7 days.)

For true 1m / 3m intraday on Indian indices you'll eventually want a broker feed
(Zerodha Kite, Dhan, Fyers, Upstox). Swap the `fetch_candles()` function in `server.py`
to pull from your broker's historical-candle API — everything downstream stays the same.

---

## Using it for live trading (EMA crossover + Kronos filter)

`strategy.py` combines your EMA crossover with the Kronos direction filter. Your EMA
crossover decides **when** to enter; Kronos decides **whether to allow** it.

| EMA crossover | Kronos says | Result            |
|---------------|-------------|-------------------|
| Long          | Long        | Take long, full   |
| Long          | Flat        | Skip (or half)    |
| Long          | Short       | Skip (conflict)   |
| Short         | Short       | Take short, full  |
| Short         | Flat        | Skip (or half)    |
| Short         | Long        | Skip (conflict)   |

In your existing bot, call it once per closed candle:

```python
from strategy import StrategyEngine

engine = StrategyEngine(fast=9, slow=21, device="cpu")  # load once at startup

# inside your per-candle loop:
decision = engine.evaluate(df)   # df = your recent OHLCV, >= 400 rows

if decision["take_trade"]:
    side = decision["side"]      # "BUY" or "SELL"
    # >>> use YOUR existing order placement, SL, TP, sizing here <<<
    place_order(side, size=decision["size"])
else:
    print("Skip:", decision["reason"])
```

Quick CLI test on a CSV:

```bash
source venv/bin/activate
python strategy.py mydata.csv --fast 9 --slow 21
```

Tunables when you create the engine:
- `flat_threshold=0.0015` — moves smaller than 0.15% count as Flat (raise it to be stricter)
- `allow_flat=False` — set `True` to still trade on Flat at half size instead of skipping
- `pred_len=24` — how many candles ahead Kronos looks

**Your SL/TP/sizing never changes.** Kronos only gates the entry — everything after the
entry stays in your existing bot exactly as it is.

---

## Predict from your own CSV (offline, Option A)

If you have an exported CSV (`timestamps, open, high, low, close, volume`):

```bash
source venv/bin/activate
python predict_csv.py mydata.csv --lookback 400 --pred 24
```

Prints the predicted candles and the LONG/SHORT/FLAT signal in the terminal.

---

## Notes & limits

- This is a **forecasting aid, not financial advice**. Kronos is probabilistic; always
  combine it with your own risk management and stop-loss.
- Free yfinance data can lag a few minutes and may rate-limit; for production trading use
  a paid broker feed.
- Predictions only make sense during/near market hours when fresh candles exist.
- CPU inference of one prediction takes ~5–15 s; that's why the dashboard refreshes on a
  60s+ timer and the server caches results per symbol/timeframe.
