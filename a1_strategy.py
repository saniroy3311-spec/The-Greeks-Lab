"""
A1 Standalone System — Full Entry Gates
========================================
Combines three systems:

  System 1 — EMA Engine   (Fast=5, Slow=10, MinCrossGap=5)
  System 2 — Kronos AI    (Confidence>=80%, Move>=0.40%)
  System 3 — Echoes Engine (WinRate>=80%, Asymmetry>=3.0x)

Full Long (BUY)  — ALL 6 gates must be TRUE
Full Short (SELL) — ALL 6 gates must be TRUE
Skip if ANY of 8 skip conditions blocks the trade.

Usage:
    from a1_strategy import A1Strategy
    strat = A1Strategy()
    decision = strat.evaluate(df, kronos_direction, kronos_confidence,
                              kronos_move_pct, echoes_stats)
"""

import numpy as np
import pandas as pd


def ema(series, span):
    return series.ewm(span=span, adjust=False).mean()


class A1Strategy:
    """
    A1 Standalone System.

    Parameters match the Master Parameter Sheet:
      fast_ema        = 5
      slow_ema        = 10
      min_bars_since  = 5
      kronos_min_conf = 80
      min_move_long   = 0.004    (+0.40%)
      min_move_short  = -0.004   (-0.40%)
      flat_threshold  = 0.0015   (0.15%)
      echoes_k        = 5
      long_win_rate   = 0.80
      short_win_rate  = 0.20
      asym_min        = 3.0
    """

    def __init__(self,
                 fast_ema=5,
                 slow_ema=10,
                 min_bars_since=5,
                 kronos_min_conf=80,
                 min_move_long=0.004,
                 min_move_short=-0.004,
                 flat_threshold=0.0015,
                 echoes_k=5,
                 long_win_rate=0.80,
                 short_win_rate=0.20,
                 asym_min=3.0):
        self.fast_ema = fast_ema
        self.slow_ema = slow_ema
        self.min_bars_since = min_bars_since
        self.kronos_min_conf = kronos_min_conf
        self.min_move_long = min_move_long
        self.min_move_short = min_move_short
        self.flat_threshold = flat_threshold
        self.echoes_k = echoes_k
        self.long_win_rate = long_win_rate
        self.short_win_rate = short_win_rate
        self.asym_min = asym_min

    def evaluate(self, df, kronos_direction="Flat", kronos_confidence=0,
                 kronos_move_pct=0.0, echoes_stats=None):
        """
        Evaluate the A1 Standalone System on the latest candle.

        Parameters
        ----------
        df : pandas.DataFrame
            OHLCV DataFrame with columns: open, high, low, close, volume.
            Must have at least `slow_ema + min_bars_since + 1` rows.
        kronos_direction : str
            "Long", "Short", or "Flat" from Kronos AI.
        kronos_confidence : int
            0-100 confidence score from Kronos AI.
        kronos_move_pct : float
            Predicted move % as decimal (e.g. 0.004 for +0.40%).
        echoes_stats : dict or None
            Stats from echoes.build_echo_scan(), or None if not available.

        Returns
        -------
        dict with keys:
            decision : "BUY", "SELL", or "SKIP"
            gates : dict of 6 gate results
            skip_reasons : list of active skip reasons
            trend : "Up", "Down", or "Flat"
            bars_since_cross : int
            echo_win_rate : float or None
            echo_asymmetry : float or None
        """
        if echoes_stats is None:
            echoes_stats = {}

        close = df["close"].values
        high = df["high"].values
        low = df["low"].values
        open_p = df["open"].values

        ema_fast_vals = ema(df["close"], self.fast_ema).values
        ema_slow_vals = ema(df["close"], self.slow_ema).values

        # --- Trend ---
        fast_is_above = ema_fast_vals[-1] > ema_slow_vals[-1]
        fast_is_below = ema_fast_vals[-1] < ema_slow_vals[-1]
        trend = "Up" if fast_is_above else ("Down" if fast_is_below else "Flat")

        # --- Bars since last crossover ---
        bars_since = len(df)
        for i in range(1, len(df)):
            diff = ema_fast_vals[i] - ema_slow_vals[i]
            prev_diff = ema_fast_vals[i - 1] - ema_slow_vals[i - 1]
            if (prev_diff <= 0 and diff > 0) or (prev_diff >= 0 and diff < 0):
                bars_since = 0
            else:
                bars_since += 1

        cross_ok = bars_since >= self.min_bars_since

        # --- Latest candle body ---
        last_open = open_p[-1]
        last_close = close[-1]
        is_green = last_close > last_open
        is_red = last_close < last_open

        # --- Kronos checks ---
        kronos_is_long = kronos_direction == "Long"
        kronos_is_short = kronos_direction == "Short"
        kronos_is_flat = kronos_direction == "Flat"
        conf_ok = kronos_confidence >= self.kronos_min_conf
        move_pct = kronos_move_pct

        # --- Echoes checks ---
        echo_count = echoes_stats.get('count', 0)
        echo_up_count = echoes_stats.get('up_count', 0)
        echo_best = echoes_stats.get('best_end_pct', 0.0)
        echo_worst = echoes_stats.get('worst_end_pct', 0.0)

        echo_win_rate = None
        echo_asymmetry = None

        if echo_count > 0:
            echo_win_rate = echo_up_count / echo_count
        else:
            echo_win_rate = 0.0

        # Asymmetry ratios (with division by zero guard)
        # Long:  abs(bestEndPct) / abs(worstEndPct) >= 3.0
        # Short: abs(worstEndPct) / abs(bestEndPct) >= 3.0
        echo_asymmetry_long = None
        echo_asymmetry_short = None
        if echo_count > 0 and echo_worst != 0 and echo_best != 0:
            echo_asymmetry_long = abs(echo_best) / abs(echo_worst)
            echo_asymmetry_short = abs(echo_worst) / abs(echo_best)
        else:
            echo_asymmetry_long = 0.0
            echo_asymmetry_short = 0.0

        long_echo_ok = (
            echo_count > 0
            and echo_worst != 0
            and echo_best != 0
            and echo_win_rate >= self.long_win_rate
            and echo_asymmetry_long >= self.asym_min
        )

        # For short: upCount/count <= 0.20  (at most 1/5 ended UP)
        short_echo_ok = (
            echo_count > 0
            and echo_worst != 0
            and echo_best != 0
            and echo_win_rate <= self.short_win_rate
            and echo_asymmetry_short >= self.asym_min
        )

        # ========= GATE EVALUATION =========

        gates = {}
        skip_reasons = []

        # --- Skip conditions (any one blocks) ---
        if kronos_is_flat:
            skip_reasons.append("Kronos direction is Flat")

        if abs(move_pct) < self.flat_threshold:
            skip_reasons.append(f"abs(move_pct) {abs(move_pct):.4f} < flat threshold {self.flat_threshold}")

        if not conf_ok:
            skip_reasons.append(f"Kronos confidence {kronos_confidence} < {self.kronos_min_conf}")

        if echo_count == 0:
            skip_reasons.append("Echoes count == 0")
        if echo_worst == 0:
            skip_reasons.append("Echoes worstEndPct == 0 (division by zero)")
        if (kronos_is_long and echo_asymmetry_long is not None and echo_asymmetry_long < self.asym_min
                and echo_count > 0 and echo_worst != 0):
            skip_reasons.append(f"Echoes long asymmetry {echo_asymmetry_long:.2f} < {self.asym_min}")
        if (kronos_is_short and echo_asymmetry_short is not None and echo_asymmetry_short < self.asym_min
                and echo_count > 0 and echo_worst != 0):
            skip_reasons.append(f"Echoes short asymmetry {echo_asymmetry_short:.2f} < {self.asym_min}")

        if not cross_ok:
            skip_reasons.append(f"Bars since cross {bars_since} < {self.min_bars_since}")

        # --- Long gates (native bool for JSON) ---
        gates['long_g1_ema'] = bool(fast_is_above)
        gates['long_g2_cross_gap'] = bool(cross_ok)
        gates['long_g3_green_candle'] = bool(is_green)
        gates['long_g4_kronos_conf'] = bool(kronos_is_long and conf_ok)
        gates['long_g5_kronos_move'] = bool(move_pct >= self.min_move_long)
        gates['long_g6_echoes'] = bool(long_echo_ok)

        # --- Short gates ---
        gates['short_g1_ema'] = bool(fast_is_below)
        gates['short_g2_cross_gap'] = bool(cross_ok)
        gates['short_g3_red_candle'] = bool(is_red)
        gates['short_g4_kronos_conf'] = bool(kronos_is_short and conf_ok)
        gates['short_g5_kronos_move'] = bool(move_pct <= self.min_move_short)
        gates['short_g6_echoes'] = bool(short_echo_ok)

        # --- Candle body direction conflicts with EMA direction (Skip 8) ---
        if trend == "Up" and is_red:
            skip_reasons.append("Candle body (RED) conflicts with EMA trend (Up)")
        if trend == "Down" and is_green:
            skip_reasons.append("Candle body (GREEN) conflicts with EMA trend (Down)")

        # --- Decision ---
        long_gates_all = all([
            gates['long_g1_ema'],
            gates['long_g2_cross_gap'],
            gates['long_g3_green_candle'],
            gates['long_g4_kronos_conf'],
            gates['long_g5_kronos_move'],
            gates['long_g6_echoes'],
        ])

        short_gates_all = all([
            gates['short_g1_ema'],
            gates['short_g2_cross_gap'],
            gates['short_g3_red_candle'],
            gates['short_g4_kronos_conf'],
            gates['short_g5_kronos_move'],
            gates['short_g6_echoes'],
        ])

        # If skip reasons exist, block trade regardless of gates
        if skip_reasons:
            decision = "SKIP"
        elif long_gates_all:
            decision = "BUY"
        elif short_gates_all:
            decision = "SELL"
        else:
            decision = "SKIP"
            if not skip_reasons:
                # Collect which gates failed
                failed = []
                if not gates['long_g1_ema']:
                    failed.append('G1 EMA')
                if not gates['long_g2_cross_gap']:
                    failed.append('G2 CrossGap')
                if not gates['long_g3_green_candle']:
                    failed.append('G3 GreenCandle')
                if not gates['long_g4_kronos_conf']:
                    failed.append('G4 KronosConf')
                if not gates['long_g5_kronos_move']:
                    failed.append('G5 KronosMove')
                if not gates['long_g6_echoes']:
                    failed.append('G6 Echoes')
                if failed:
                    skip_reasons.append(f"Gates not met: {', '.join(failed)}")

        return {
            'decision': decision,
            'gates': gates,
            'skip_reasons': skip_reasons,
            'trend': trend,
            'bars_since_cross': int(bars_since),
            'echo_win_rate': float(echo_win_rate) if echo_win_rate is not None else None,
            'echo_asymmetry_long': float(echo_asymmetry_long) if echo_asymmetry_long is not None else None,
            'echo_asymmetry_short': float(echo_asymmetry_short) if echo_asymmetry_short is not None else None,
            'echo_count': int(echo_count),
            'echo_up_count': int(echo_up_count),
            'echo_best_end_pct': float(echo_best),
            'echo_worst_end_pct': float(echo_worst),
            'long_gates_all': bool(long_gates_all),
            'short_gates_all': bool(short_gates_all),
        }
