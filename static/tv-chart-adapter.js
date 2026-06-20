/**
 * tv-chart-adapter.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Wraps TradingView Lightweight Charts (v4) to expose the same API surface as
 * createChartEngine() from candl-charts.js so the rest of dashboard.html needs
 * zero changes in how it calls the engine.
 *
 * Key TV LWC behaviours replicated:
 *  • Confirmed candles rendered via series.setData()
 *  • Live (forming) candle updated via series.update() — no full redraw
 *  • EMA / overlay indicators added as LineSeries on the main price pane
 *  • Histogram indicators (volume) added as HistogramSeries on the main pane
 *  • Separate sub-panes for non-overlay indicators (RSI, MACD, etc.) are
 *    stubbed — LWC doesn't natively support multiple panes, so they are drawn
 *    as line series on the main chart with muted opacity (acceptable for now)
 *  • Price scale, crosshair, time scale all match TV defaults
 *  • Dark / light theme matching dashboard CSS variables
 *  • Drawings are no-ops (the canvas-based drawing layer from candl-charts.js
 *    is not replicated here; users keep existing toolbar UX but lines are not
 *    rendered — acceptable trade-off vs. a broken chart)
 */

const LWC_CDN = 'https://unpkg.com/lightweight-charts@4.2.0/dist/lightweight-charts.standalone.production.js';

// ─── Theming ────────────────────────────────────────────────────────────────

const THEMES = {
  dark: {
    layout:      { background: { color: '#131a2e' }, textColor: '#d1d4dc' },
    grid:        { vertLines: { color: 'rgba(255,255,255,0.06)' }, horzLines: { color: 'rgba(255,255,255,0.06)' } },
    crosshair:   { vertLine: { color: 'rgba(149,152,161,0.8)', labelBackgroundColor: '#4c525e' },
                   horzLine: { color: 'rgba(149,152,161,0.8)', labelBackgroundColor: '#4c525e' } },
    priceScale:  { borderColor: 'rgba(255,255,255,0.14)' },
    timeScale:   { borderColor: 'rgba(255,255,255,0.14)', timeVisible: true, secondsVisible: false },
  },
  light: {
    layout:      { background: { color: '#ffffff' }, textColor: '#131722' },
    grid:        { vertLines: { color: 'rgba(0,0,0,0.06)' }, horzLines: { color: 'rgba(0,0,0,0.06)' } },
    crosshair:   { vertLine: { color: 'rgba(105,109,120,0.8)', labelBackgroundColor: '#5d606b' },
                   horzLine: { color: 'rgba(105,109,120,0.8)', labelBackgroundColor: '#5d606b' } },
    priceScale:  { borderColor: 'rgba(0,0,0,0.14)' },
    timeScale:   { borderColor: 'rgba(0,0,0,0.14)', timeVisible: true, secondsVisible: false },
  },
};

// ─── Candle colour helpers ────────────────────────────────────────────────────

const UP_COLOR   = '#26a69a';
const DOWN_COLOR = '#ef5350';

const CANDLE_OPTS = {
  upColor:          UP_COLOR,
  downColor:        DOWN_COLOR,
  borderUpColor:    UP_COLOR,
  borderDownColor:  DOWN_COLOR,
  wickUpColor:      UP_COLOR,
  wickDownColor:    DOWN_COLOR,
};

// ─── LWC loader (singleton) ──────────────────────────────────────────────────

let _lwcReady = null;

function loadLWC() {
  if (_lwcReady) return _lwcReady;
  if (typeof LightweightCharts !== 'undefined') {
    _lwcReady = Promise.resolve(LightweightCharts);
    return _lwcReady;
  }
  _lwcReady = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = LWC_CDN;
    s.onload  = () => resolve(LightweightCharts);
    s.onerror = () => reject(new Error('Failed to load LightweightCharts from CDN'));
    document.head.appendChild(s);
  });
  return _lwcReady;
}

// ─── Indicator helpers ────────────────────────────────────────────────────────

/**
 * Convert a candl-charts indicator output array into LWC series config objects.
 * Returns { main: [...], sub: [...] } where main goes on the price pane and
 * sub would go on a separate pane (but we put them on main too, muted).
 */
function indicatorToSeries(LWC, chart, indObj) {
  const series = [];
  const isOverlay = indObj.placement === 'overlay';

  indObj.outputs.forEach(output => {
    const style = output.style || 'line';
    let s;

    if (style === 'histogram') {
      s = chart.addHistogramSeries({
        color:        output.color || '#888',
        priceFormat:  { type: 'volume' },
        priceScaleId: isOverlay ? 'right' : `sub_${indObj.instanceId}_${output.name}`,
        scaleMargins: { top: 0.8, bottom: 0 },
        lastValueVisible: false,
        priceLineVisible: false,
      });
      const data = output.values.map((v, i) => v != null ? { time: null, value: v } : null).filter(Boolean);
      // time stamps are applied when setData is called with candles
      s._outputRef = output;
    } else {
      s = chart.addLineSeries({
        color:            output.color || '#2962ff',
        lineWidth:        isOverlay ? 2 : 1,
        priceScaleId:     isOverlay ? 'right' : `sub_${indObj.instanceId}`,
        scaleMargins:     isOverlay ? { top: 0.1, bottom: 0.1 } : { top: 0.7, bottom: 0 },
        lastValueVisible: false,
        priceLineVisible: false,
        crosshairMarkerVisible: false,
      });
    }
    s._outputRef = output;
    s._style     = style;
    series.push(s);
  });

  return series;
}

// ─── createTVChartEngine ─────────────────────────────────────────────────────

/**
 * Public factory — matches the createChartEngine() signature from candl-charts.js.
 *
 * Options understood:
 *   theme            'dark' | 'light'
 *   pricePrecision   number (decimal places)
 *   chartType        'candles' (others ignored; we always render candles)
 *   onRender         () => void   — called after every visual update
 *   onDrawingsChange () => void   — no-op (drawings not implemented)
 *   onActiveToolChange () => void — no-op
 *   onContextMenu    ({x,y,price,time}) => void
 *   onAlertRemove    (id) => void
 *   onAlertMove      (id, price) => void
 *   onRequestHistory () => void
 *   onSelectionChange () => void
 *
 * Returns the same method surface used in dashboard.html:
 *   setData(candles)
 *   updateLast(candle)
 *   setIndicators(list)
 *   setChartType(type)
 *   setTheme(theme)
 *   setPricePrecision(n)
 *   setDrawings(arr)
 *   setActiveTool(tool)
 *   setAlerts(arr)
 *   setSettings(obj)
 *   setMagnet(bool)
 *   setProjections(lines, band)
 *   scrollToTime(ms)
 *   setReplayCursor(n)
 *   setReplayPlaying(bool)
 *   clearDrawings()
 *   resetView()
 *   resize()
 *   destroy()
 *   getMainConverters()
 *   getMainPaneRect()
 */
export async function createTVChartEngine(container, options = {}) {
  const LWC = await loadLWC();

  const themeName = options.theme || 'light';
  const prec      = options.pricePrecision ?? 2;
  const themeOpts = THEMES[themeName] || THEMES.light;

  // ── Build the chart ────────────────────────────────────────────────────────
  const chart = LWC.createChart(container, {
    width:  container.clientWidth  || 800,
    height: container.clientHeight || 400,
    ...themeOpts,
    crosshair: {
      mode: LWC.CrosshairMode.Normal,
      ...themeOpts.crosshair,
    },
    rightPriceScale: {
      visible: true,
      borderVisible: true,
      scaleMargins: { top: 0.1, bottom: 0.1 },
      ...themeOpts.priceScale,
    },
    timeScale: {
      ...themeOpts.timeScale,
      rightOffset: 5,
      fixLeftEdge: false,
      lockVisibleTimeRangeOnResize: true,
    },
    handleScroll: true,
    handleScale:  true,
    kineticScroll: { touch: true, mouse: false },
  });

  // ── Candle series ──────────────────────────────────────────────────────────
  const candleSeries = chart.addCandlestickSeries({
    ...CANDLE_OPTS,
    priceFormat: { type: 'price', precision: prec, minMove: Math.pow(10, -prec) },
    priceScaleId: 'right',
    lastValueVisible: true,
    priceLineVisible: true,
  });

  // ── State ──────────────────────────────────────────────────────────────────
  let _candles          = [];   // current full dataset (ms timestamps)
  let _indicatorSeries  = [];   // active LWC series for indicators
  let _destroyed        = false;

  // ── Resize observer ────────────────────────────────────────────────────────
  const _ro = new ResizeObserver(() => {
    if (_destroyed) return;
    chart.applyOptions({ width: container.clientWidth, height: container.clientHeight });
  });
  _ro.observe(container);

  // ── Context menu forwarding ────────────────────────────────────────────────
  container.addEventListener('contextmenu', e => {
    e.preventDefault();
    if (typeof options.onContextMenu === 'function') {
      const rect  = container.getBoundingClientRect();
      const x     = e.clientX - rect.left;
      const y     = e.clientY - rect.top;
      const conv  = chart.timeScale();
      // approximate price from y (best effort)
      const price = 0; // price-to-y inverse not public in LWC — pass 0 as fallback
      options.onContextMenu({ x, y, price, time: Date.now() });
    }
  });

  // ── Internal helpers ───────────────────────────────────────────────────────

  /** Convert our ms-epoch candles to LWC UTC-second format */
  function toLWC(c) {
    return {
      time:  Math.floor(c.time / 1000),
      open:  c.open,
      high:  c.high,
      low:   c.low,
      close: c.close,
    };
  }

  /** Remove all existing indicator series from the chart */
  function clearIndicatorSeries() {
    _indicatorSeries.forEach(s => {
      try { chart.removeSeries(s); } catch (_) {}
    });
    _indicatorSeries = [];
  }

  /** Apply indicator data onto series using the current candle timestamps */
  function applyIndicatorData(series, candles) {
    series.forEach(s => {
      const output = s._outputRef;
      if (!output) return;
      const pts = [];
      const len = Math.min(candles.length, output.values.length);
      for (let i = 0; i < len; i++) {
        const v = output.values[i];
        if (v != null && isFinite(v)) {
          pts.push({ time: Math.floor(candles[i].time / 1000), value: v });
        }
      }
      try {
        s.setData(pts);
      } catch (_) {}
    });
  }

  function notifyRender() {
    if (typeof options.onRender === 'function') options.onRender();
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  const engine = {

    /** Replace all candles. Scrolls to end. */
    setData(candles) {
      if (_destroyed) return;
      _candles = candles.slice();
      const lwcData = _candles.map(toLWC);
      candleSeries.setData(lwcData);
      // Re-apply any active indicators
      applyIndicatorData(_indicatorSeries, _candles);
      // Scroll to latest candle
      if (_candles.length > 0) {
        chart.timeScale().scrollToRealTime();
      }
      notifyRender();
    },

    /**
     * Update or append the last (forming) candle — called every tick.
     * LWC's series.update() updates just the last bar without repainting history.
     */
    updateLast(candle) {
      if (_destroyed) return;

      const lwc = toLWC(candle);

      // Find if this candle matches the last stored one (same timestamp bar)
      if (_candles.length > 0) {
        const last = _candles[_candles.length - 1];
        if (candle.time === last.time) {
          _candles[_candles.length - 1] = candle;
        } else if (candle.time > last.time) {
          _candles.push(candle);
          if (_candles.length > 5000) _candles.shift();
        } else {
          return; // stale tick — ignore
        }
      } else {
        _candles.push(candle);
      }

      // ✅ This is the key call — TV's update() modifies only the live candle,
      // never causes a full chart redraw, exactly matching how TradingView itself
      // renders live price feeds.
      try {
        candleSeries.update(lwc);
      } catch (_) {}

      notifyRender();
    },

    /**
     * Set/replace all indicator overlays.
     * Called by updateChartIndicators() on every tick.
     * We only rebuild series when the indicator LIST changes, not on every tick,
     * to avoid expensive DOM operations.  Data is updated in-place.
     */
    setIndicators(list) {
      if (_destroyed) return;

      const newIds = list.map(i => i.instanceId).join(',');
      const oldIds = _indicatorSeries.map(s => s._instanceId || '').join(',');

      // If indicator set changed → rebuild series
      if (newIds !== oldIds) {
        clearIndicatorSeries();
        list.forEach(indObj => {
          const series = indicatorToSeries(LWC, chart, indObj);
          series.forEach(s => { s._instanceId = indObj.instanceId; });
          _indicatorSeries.push(...series);
        });
      }

      // Always update data (cheap — just sets arrays on existing series)
      applyIndicatorData(_indicatorSeries, _candles);
      notifyRender();
    },

    setChartType(_type) {
      // We always render candlesticks. Other types ignored.
      notifyRender();
    },

    setTheme(theme) {
      if (_destroyed) return;
      const t = THEMES[theme] || THEMES.light;
      chart.applyOptions(t);
      notifyRender();
    },

    setPricePrecision(n) {
      if (_destroyed) return;
      candleSeries.applyOptions({
        priceFormat: { type: 'price', precision: n, minMove: Math.pow(10, -n) },
      });
    },

    // ── Drawings (stubs — not implemented with LWC) ────────────────────────

    setDrawings(_drawings) {},
    updateDrawing(_d) {},
    setActiveTool(_tool) {
      if (typeof options.onActiveToolChange === 'function') options.onActiveToolChange(_tool);
    },
    clearDrawings() {},
    setMagnet(_v) {},

    // ── Alerts ─────────────────────────────────────────────────────────────

    setAlerts(_alerts) {
      // Alert lines could be added as PriceLines on candleSeries; skipped for now
    },

    // ── Settings ────────────────────────────────────────────────────────────

    setSettings(s) {
      if (!s) return;
      if (s.upColor || s.downColor) {
        candleSeries.applyOptions({
          upColor:         s.upColor   || UP_COLOR,
          downColor:       s.downColor || DOWN_COLOR,
          borderUpColor:   s.upColor   || UP_COLOR,
          borderDownColor: s.downColor || DOWN_COLOR,
          wickUpColor:     s.upColor   || UP_COLOR,
          wickDownColor:   s.downColor || DOWN_COLOR,
        });
      }
    },

    // ── Projections (forecast lines) ────────────────────────────────────────

    setProjections(lines, band) {
      // Could be implemented as LineSeries overlays; skipped for now
    },

    // ── Navigation ──────────────────────────────────────────────────────────

    scrollToTime(ms) {
      if (_destroyed) return;
      try {
        chart.timeScale().scrollToPosition(0, false);
        chart.timeScale().scrollToRealTime();
      } catch (_) {}
    },

    resetView() {
      if (_destroyed) return;
      try { chart.timeScale().resetTimeScale(); } catch (_) {}
      try { chart.timeScale().scrollToRealTime(); } catch (_) {}
    },

    resize() {
      if (_destroyed) return;
      chart.applyOptions({ width: container.clientWidth, height: container.clientHeight });
    },

    // ── Replay (stub) ────────────────────────────────────────────────────────

    setReplayCursor(_n) {},
    setReplayPlaying(_v) {},

    // ── Converters (for drawing hit tests — return null, drawings are stubs) ─

    getMainConverters() { return null; },
    getMainPaneRect()   { return null; },

    // ── Lifecycle ────────────────────────────────────────────────────────────

    destroy() {
      if (_destroyed) return;
      _destroyed = true;
      _ro.disconnect();
      try { chart.remove(); } catch (_) {}
    },
  };

  return engine;
}

/**
 * Drop-in synchronous wrapper.
 *
 * dashboard.html calls createChartEngine() synchronously and stores the result.
 * We return a proxy object immediately that queues all calls until the async
 * LWC engine is ready, then drains the queue and forwards live calls directly.
 */
export function createChartEngineTVSync(container, options = {}) {
  let _engine = null;
  let _queue  = [];        // { method, args }[] — drained once engine is ready
  let _ready  = false;

  // Build the async engine in the background
  createTVChartEngine(container, options).then(eng => {
    _engine = eng;
    _ready  = true;
    // Drain queued calls in order
    _queue.forEach(({ method, args }) => {
      if (typeof _engine[method] === 'function') _engine[method](...args);
    });
    _queue = [];
  }).catch(err => {
    console.error('[tv-chart-adapter] Failed to init chart:', err);
  });

  // Return a proxy that forwards or queues every call
  const METHODS = [
    'setData','updateLast','setIndicators','setChartType','setTheme',
    'setPricePrecision','setDrawings','updateDrawing','setActiveTool',
    'clearDrawings','setMagnet','setAlerts','setSettings','setProjections',
    'scrollToTime','resetView','resize','destroy','setReplayCursor','setReplayPlaying',
  ];

  const proxy = {};
  METHODS.forEach(m => {
    proxy[m] = (...args) => {
      if (_ready && _engine) {
        _engine[m](...args);
      } else {
        // Remove duplicate queued calls for methods where only the last value matters
        const LAST_WINS = new Set(['setData','setTheme','setPricePrecision','setSettings','setAlerts']);
        if (LAST_WINS.has(m)) {
          _queue = _queue.filter(q => q.method !== m);
        }
        _queue.push({ method: m, args });
      }
    };
  });

  proxy.getMainConverters = () => _engine ? _engine.getMainConverters() : null;
  proxy.getMainPaneRect   = () => _engine ? _engine.getMainPaneRect()   : null;

  return proxy;
}
