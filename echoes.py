"""
Echoes Engine — Historical Pattern Similarity
==============================================
Python port of the Candl TypeScript Echoes engine.
Finds historical windows that resemble the most recent price action
and studies what happened next.

MAE Fix: worstEndPct tracks the lowest LOW reached during the full
horizon window (Maximum Adverse Excursion), not just the final close.
"""

import numpy as np


def z_normalize(values):
    """Z-normalize a series: (v - mean) / std, using population std."""
    n = len(values)
    if n == 0:
        return []
    mean = np.mean(values)
    std = np.std(values, ddof=0)
    if not (std > 0) or not np.isfinite(std) or not np.isfinite(mean):
        return [0.0] * n
    inv = 1.0 / std
    return [(v - mean) * inv for v in values]


def find_similar(haystack_closes, query, k=5, min_gap=None, exclude_tail=0):
    """
    Slide query window over haystack, return k most similar windows
    by z-normalized Euclidean distance, best first.

    Parameters
    ----------
    haystack_closes : list[float]
        Full history of close prices.
    query : list[float]
        The pattern to search for (last N closes).
    k : int
        Maximum number of matches (default 5).
    min_gap : int or None
        Minimum gap between match start indices (default: len(query)).
    exclude_tail : int
        Skip windows whose end falls within last exclude_tail indices.

    Returns
    -------
    list[dict]
        Each dict: {start_index, end_index, distance}
    """
    m = len(query)
    n = len(haystack_closes)
    k = max(1, int(k))
    if min_gap is None:
        min_gap = m
    min_gap = max(1, int(min_gap))
    exclude_tail = max(0, int(exclude_tail))

    if k < 1 or m < 2:
        return []

    last_start = n - exclude_tail - m
    if last_start < 0:
        return []
    num_windows = last_start + 1

    zq = z_normalize(query)
    if any(not np.isfinite(v) for v in zq):
        return []

    clean = np.array(haystack_closes, dtype=np.float64)
    bad_mask = ~np.isfinite(clean)
    clean[bad_mask] = 0.0
    bad_prefix = np.zeros(n + 1, dtype=np.int32)
    for i in range(n):
        bad_prefix[i + 1] = bad_prefix[i] + (1 if bad_mask[i] else 0)

    distances = np.full(num_windows, np.inf)

    for s in range(num_windows):
        if bad_prefix[s + m] - bad_prefix[s] > 0:
            continue

        window = clean[s:s + m]
        w_mean = np.mean(window)
        w_var = np.var(window, ddof=0)
        if w_var < 0:
            w_var = 0.0
        w_std = np.sqrt(w_var)

        if w_std > 0:
            inv = 1.0 / w_std
            d2 = 0.0
            for j in range(m):
                diff = (window[j] - w_mean) * inv - zq[j]
                d2 += diff * diff
        else:
            d2 = sum(v * v for v in zq)

        if np.isfinite(d2):
            distances[s] = np.sqrt(d2)

    order = np.argsort(distances)

    picked = []
    taken_starts = []
    for s_idx in order:
        d = distances[s_idx]
        if not np.isfinite(d):
            break
        ok = True
        for t in taken_starts:
            if abs(s_idx - t) < min_gap:
                ok = False
                break
        if not ok:
            continue
        taken_starts.append(s_idx)
        picked.append({
            'start_index': int(s_idx),
            'end_index': int(s_idx + m - 1),
            'distance': float(d),
        })
        if len(picked) >= k:
            break

    return picked


def build_echo_scan(candles_df, window_len=30, horizon=24, k=5):
    """
    Build a full Echoes scan.

    Takes the last `window_len` closes as the query, finds up to `k`
    similar historical windows, and records what the market did over
    the `horizon` bars following each match.

    Parameters
    ----------
    candles_df : pandas.DataFrame
        Must contain columns 'close' and 'low' (OHLCV data).
    window_len : int
        Number of bars for the query pattern (default 30).
    horizon : int
        Number of bars to look ahead after each match (default 24).
    k : int
        Maximum number of historical matches (default 5).

    Returns
    -------
    dict or None
        None if insufficient data.
        Otherwise: {count, up_count, median_end_pct, best_end_pct,
                    worst_end_pct (MAE-fixed), results, etc.}
    """
    n = len(candles_df)
    if n < window_len * 3 or window_len < 2 or horizon < 1 or k < 1:
        return None

    closes = candles_df['close'].values.astype(np.float64)
    lows = candles_df['low'].values.astype(np.float64) if 'low' in candles_df.columns else closes.copy()

    query = closes[-window_len:].tolist()

    matches = find_similar(
        closes.tolist(), query,
        k=k, min_gap=window_len,
        exclude_tail=window_len + horizon,
    )

    results = []
    end_pcts = []
    worst_low_pcts = []
    up_count = 0

    for match in matches:
        end = match['end_index']
        base = closes[end]

        if end + horizon >= n or not np.isfinite(base) or base == 0:
            results.append({
                'match': match,
                'aftermath_pct': None,
                'min_low_pct': None,
                'end_pct': None,
            })
            continue

        aftermath_pct = []
        valid = True
        for off in range(1, horizon + 1):
            pct = (closes[end + off] / base - 1) * 100
            if not np.isfinite(pct):
                valid = False
                break
            aftermath_pct.append(pct)

        if not valid:
            results.append({
                'match': match,
                'aftermath_pct': None,
                'min_low_pct': None,
                'end_pct': None,
            })
            continue

        end_pct = aftermath_pct[-1]
        end_pcts.append(end_pct)
        if end_pct > 0:
            up_count += 1

        # MAE fix: track lowest LOW reached during full horizon
        min_low_pct = 0.0
        for off in range(1, horizon + 1):
            low_pct = (lows[end + off] / base - 1) * 100
            if np.isfinite(low_pct):
                min_low_pct = min(min_low_pct, low_pct)

        worst_low_pcts.append(min_low_pct)

        results.append({
            'match': match,
            'aftermath_pct': aftermath_pct,
            'min_low_pct': min_low_pct,
            'end_pct': end_pct,
        })

    count = len(end_pcts)

    if count > 0:
        sorted_ends = sorted(end_pcts)
        median_end_pct = float(np.median(sorted_ends))
        best_end_pct = sorted_ends[-1]

        if worst_low_pcts:
            worst_end_pct = min(worst_low_pcts)
        else:
            worst_end_pct = sorted_ends[0]
    else:
        median_end_pct = 0.0
        best_end_pct = 0.0
        worst_end_pct = 0.0

    # Convert results to JSON-safe native types
    safe_results = []
    for r in results:
        safe_results.append({
            'match': {k: int(v) if isinstance(v, (np.integer, int)) else float(v)
                      for k, v in r['match'].items()},
            'aftermath_pct': [float(x) for x in r['aftermath_pct']]
                if r['aftermath_pct'] is not None else None,
            'min_low_pct': float(r['min_low_pct'])
                if r['min_low_pct'] is not None else None,
            'end_pct': float(r['end_pct'])
                if r['end_pct'] is not None else None,
        })

    return {
        'window_len': int(window_len),
        'horizon': int(horizon),
        'count': int(count),
        'up_count': int(up_count),
        'median_end_pct': float(median_end_pct),
        'best_end_pct': float(best_end_pct),
        'worst_end_pct': float(worst_end_pct),
        'results': safe_results,
    }
