"""
EMA/Kronos Strategy Module
===========================
Pine Script v5 logic ported to Python:

- Fast EMA (5) / Slow EMA (10)
- Trend State, Crossover Filter (barsSinceCross >= 5)
- Real Body Conditions (body touches both EMAs)
- High-confidence bypass (>75% confidence skips body-touch requirement)
- Confluence Guard with Kronos AI
- SL (1x risk) / TP (2x risk) per Pine Script spec

Call evaluate(df, kronos_direction, kronos_confidence) once per bar close.
"""

import numpy as np
import pandas as pd
from datetime import timedelta, timezone

# Asia/Kolkata timezone
IST = timezone(timedelta(hours=5, minutes=30))


def ema(series, span):
    return series.ewm(span=span, adjust=False).mean()


class EmaKronosStrategy:
    def __init__(self, fast=5, slow=10):
        self.fast = fast
        self.slow = slow
        self.state = "Awaiting Setup"
        self.active_trade = None
        self.trades_history = []
        self.last_cross_bar = -999

    def evaluate(self, df, kronos_direction="Flat", kronos_confidence=0):
        """
        Evaluate the strategy on a DataFrame of OHLCV candles.
        kronos_direction: "Long", "Short", or "Flat" from the Kronos model.
        kronos_confidence: 0-100 confidence score from Kronos.

        Returns a dict with:
          - state: current FSM state string
          - active_trade: current trade dict or None
          - trades_history: list of completed trades
          - ema9 / ema15: indicator arrays for chart
          - markers: trigger markers for chart
          - trend: "Up", "Down", or "Flat"
          - bars_since_cross: int
          - body_touches_both: bool
          - confluence: bool (EMA & Kronos agree)
        """
        # Force timezone to Asia/Kolkata for timestamp correctness
        if hasattr(df.index, 'tz') and df.index.tz is None:
            df.index = df.index.tz_localize('Asia/Kolkata')
        elif hasattr(df.index, 'tz'):
            df.index = df.index.tz_convert('Asia/Kolkata')

        close = df["close"].values
        high = df["high"].values
        low = df["low"].values
        open_p = df["open"].values

        ema_fast = ema(df["close"], self.fast).values
        ema_slow = ema(df["close"], self.slow).values

        # Detect last crossover
        bars_since_cross = len(df)
        prev_diff = 0
        for i in range(1, len(df)):
            diff = ema_fast[i] - ema_slow[i]
            if i >= 1:
                prev_diff = ema_fast[i - 1] - ema_slow[i - 1]
            if (prev_diff <= 0 and diff > 0) or (prev_diff >= 0 and diff < 0):
                bars_since_cross = 0
            else:
                bars_since_cross += 1

        markers = []
        trades_out = []

        kronos_buy = kronos_direction == "Long"
        kronos_sell = kronos_direction == "Short"

        for i in range(max(self.fast, self.slow) + 1, len(df)):
            try:
                ts = int(df.index[i].timestamp())
            except (AttributeError, OSError, ValueError):
                ts = int(i)
            c = close[i]
            o = open_p[i]
            h = high[i]
            l = low[i]
            e_fast = ema_fast[i]
            e_slow = ema_slow[i]

            up_trend = e_fast > e_slow
            down_trend = e_fast < e_slow

            body_high = max(o, c)
            body_low = min(o, c)
            top_ema = max(e_fast, e_slow)
            bottom_ema = min(e_fast, e_slow)
            body_touches_both = (body_high >= top_ema) and (body_low <= bottom_ema)

            cross_age = bars_since_cross - (len(df) - 1 - i) if bars_since_cross < len(df) else bars_since_cross
            cross_ok = cross_age >= 5

            is_latest = (i == len(df) - 1)
            high_conf = is_latest and kronos_confidence >= 75
            current_kronos_buy = kronos_buy if is_latest else (up_trend and cross_ok)
            current_kronos_sell = kronos_sell if is_latest else (down_trend and cross_ok)

            body_or_conf = body_touches_both or high_conf

            # Exit checks
            if self.state == "In Position: Long" and self.active_trade:
                if l <= self.active_trade["slPrice"]:
                    self.active_trade["exitPrice"] = self.active_trade["slPrice"]
                    self.active_trade["exitTime"] = ts
                    self.active_trade["active"] = False
                    self.active_trade["points"] = round(self.active_trade["exitPrice"] - self.active_trade["entryPrice"], 2)
                    self.active_trade["result"] = "Loss"
                    self.active_trade["pnl_pct"] = round((self.active_trade["exitPrice"] / self.active_trade["entryPrice"] - 1) * 100, 2)
                    trades_out.append(self.active_trade)
                    self.trades_history.append(self.active_trade)
                    self.state = "Awaiting Setup"
                    self.active_trade = None
                elif h >= self.active_trade["tpPrice"]:
                    self.active_trade["exitPrice"] = self.active_trade["tpPrice"]
                    self.active_trade["exitTime"] = ts
                    self.active_trade["active"] = False
                    self.active_trade["points"] = round(self.active_trade["exitPrice"] - self.active_trade["entryPrice"], 2)
                    self.active_trade["result"] = "Profit"
                    self.active_trade["pnl_pct"] = round((self.active_trade["exitPrice"] / self.active_trade["entryPrice"] - 1) * 100, 2)
                    trades_out.append(self.active_trade)
                    self.trades_history.append(self.active_trade)
                    self.state = "Awaiting Setup"
                    self.active_trade = None

            elif self.state == "In Position: Short" and self.active_trade:
                if h >= self.active_trade["slPrice"]:
                    self.active_trade["exitPrice"] = self.active_trade["slPrice"]
                    self.active_trade["exitTime"] = ts
                    self.active_trade["active"] = False
                    self.active_trade["points"] = round(self.active_trade["entryPrice"] - self.active_trade["exitPrice"], 2)
                    self.active_trade["result"] = "Loss"
                    self.active_trade["pnl_pct"] = round((1 - self.active_trade["exitPrice"] / self.active_trade["entryPrice"]) * 100, 2)
                    trades_out.append(self.active_trade)
                    self.trades_history.append(self.active_trade)
                    self.state = "Awaiting Setup"
                    self.active_trade = None
                elif l <= self.active_trade["tpPrice"]:
                    self.active_trade["exitPrice"] = self.active_trade["tpPrice"]
                    self.active_trade["exitTime"] = ts
                    self.active_trade["active"] = False
                    self.active_trade["points"] = round(self.active_trade["entryPrice"] - self.active_trade["exitPrice"], 2)
                    self.active_trade["result"] = "Profit"
                    self.active_trade["pnl_pct"] = round((1 - self.active_trade["exitPrice"] / self.active_trade["entryPrice"]) * 100, 2)
                    trades_out.append(self.active_trade)
                    self.trades_history.append(self.active_trade)
                    self.state = "Awaiting Setup"
                    self.active_trade = None

            # Entry checks
            if self.state == "Awaiting Setup":
                long_trigger = up_trend and (c > o) and body_or_conf and cross_ok
                short_trigger = down_trend and (c < o) and body_or_conf and cross_ok

                if long_trigger:
                    if current_kronos_buy:
                        risk = c - l
                        if risk <= 0:
                            risk = c * 0.001
                        self.active_trade = {
                            "type": "Long",
                            "entryPrice": round(c, 2),
                            "entryTime": ts,
                            "slPrice": round(l, 2),
                            "tpPrice": round(c + 2 * risk, 2),
                            "active": True
                        }
                        self.state = "In Position: Long"
                        markers.append({
                            "time": ts,
                            "position": "belowBar",
                            "color": "#089981",
                            "shape": "arrowUp",
                            "text": "EMA/Kronos Long"
                        })
                    else:
                        self.state = "Long Trigger Formed"
                        markers.append({
                            "time": ts,
                            "position": "belowBar",
                            "color": "#2962FF",
                            "shape": "arrowUp",
                            "text": "Long Trigger (no confluence)"
                        })
                elif short_trigger:
                    if current_kronos_sell:
                        risk = h - c
                        if risk <= 0:
                            risk = c * 0.001
                        self.active_trade = {
                            "type": "Short",
                            "entryPrice": round(c, 2),
                            "entryTime": ts,
                            "slPrice": round(h, 2),
                            "tpPrice": round(c - 2 * risk, 2),
                            "active": True
                        }
                        self.state = "In Position: Short"
                        markers.append({
                            "time": ts,
                            "position": "aboveBar",
                            "color": "#f23645",
                            "shape": "arrowDown",
                            "text": "EMA/Kronos Short"
                        })
                    else:
                        self.state = "Short Trigger Formed"
                        markers.append({
                            "time": ts,
                            "position": "aboveBar",
                            "color": "#FF6D00",
                            "shape": "arrowDown",
                            "text": "Short Trigger (no confluence)"
                        })
                else:
                    if self.state in ["Long Trigger Formed", "Short Trigger Formed"]:
                        self.state = "Awaiting Setup"

        # Build output (safe timestamp conversion)
        def _ts(idx):
            try:
                return int(idx.timestamp())
            except (AttributeError, OSError, ValueError):
                return int(0)

        ema_fast_out = [{"time": _ts(df.index[i]), "value": round(float(ema_fast[i]), 2)}
                     for i in range(len(df)) if not np.isnan(ema_fast[i])]
        ema_slow_out = [{"time": _ts(df.index[i]), "value": round(float(ema_slow[i]), 2)}
                     for i in range(len(df)) if not np.isnan(ema_slow[i])]

        current_trend = "Up" if ema_fast[-1] > ema_slow[-1] else ("Down" if ema_fast[-1] < ema_slow[-1] else "Flat")

        return {
            "state": self.state,
            "active_trade": self.active_trade,
            "trades_history": self.trades_history[::-1],
            "ema_fast": ema_fast_out,
            "ema_slow": ema_slow_out,
            "markers": markers,
            "trend": current_trend,
            "bars_since_cross": bars_since_cross,
            "body_touches_both": bool(
                max(close[-1], open_p[-1]) >= max(ema_fast[-1], ema_slow[-1]) and
                min(close[-1], open_p[-1]) <= min(ema_fast[-1], ema_slow[-1])
            ),
            "kronos_direction": kronos_direction,
            "kronos_confidence": kronos_confidence,
            "confluence": (
                (kronos_direction == "Long" and current_trend == "Up") or
                (kronos_direction == "Short" and current_trend == "Down")
            ),
        }
