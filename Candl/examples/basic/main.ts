// Live CandL Charts + Kronos AI App Integration.
// Fetches live candles + forecasts, and streams ticks via Socket.IO.
import { createChartEngine, lab, getIndicator } from '../../src/index'

let currentSymbol = 'BTC'
let currentTimeframe = '5m'
const activeIndicators = new Set<string>(['sma', 'ema']) // default checked in HTML
let currentCandles: any[] = []
let predictedCandles: any[] = []
let socket: any = null

const container = document.getElementById('chart')
if (!container) throw new Error('#chart container not found')

const engine = createChartEngine(container, {
  theme: document.body.classList.contains('light-theme') ? 'light' : 'dark',
  pricePrecision: 2,
  chartType: 'candles',
})

// @ts-ignore
window.chartEngine = engine;

function updateConnectionStatus(connected: boolean, text: string) {
  const dot = document.getElementById('status-dot')
  const label = document.getElementById('status-text')
  if (dot && label) {
    dot.className = 'status-dot' + (connected ? ' connected' : '')
    label.textContent = text
  }
}

// Compute dynamic port targeting for dev vs production deployments
const API_BASE = window.location.port === '5173' ? 'http://localhost:8080' : ''

async function loadSignalData(symbol: string, tf: string) {
  try {
    const res = await fetch(`${API_BASE}/api/signal/${symbol}/${tf}`)
    const data = await res.json()
    if (data.error) throw new Error(data.error)

    // Normalize timestamps (standardize seconds vs milliseconds)
    const candles = data.candles.map((c: any) => ({
      ...c,
      time: c.time * 1000 < 1e11 ? c.time * 1000 : c.time,
    }))

    const predicted = data.predicted.map((c: any) => ({
      ...c,
      time: c.time * 1000 < 1e11 ? c.time * 1000 : c.time,
    }))

    currentCandles = candles
    predictedCandles = predicted

    // Update Forecast Overlay panel
    const forecastSub = document.getElementById('forecast-sub')
    if (forecastSub) forecastSub.textContent = `${symbol} - ${tf} FORECAST`

    const badge = document.getElementById('forecast-badge')
    if (badge) {
      badge.textContent = data.direction
      badge.className = 'forecast-badge ' + data.direction.toLowerCase()
    }

    const priceEl = document.getElementById('metric-price')
    if (priceEl) {
      priceEl.textContent = Number(data.current).toLocaleString('en-IN', {
        minimumFractionDigits: 2,
      })
    }

    const confEl = document.getElementById('metric-conf')
    if (confEl) confEl.textContent = `${data.confidence}%`

    const moveEl = document.getElementById('metric-move')
    if (moveEl) {
      moveEl.textContent = `${data.move >= 0 ? '+' : ''}${data.move.toFixed(2)} (${data.move_pct}%)`
    }

    const targetEl = document.getElementById('metric-target')
    if (targetEl) {
      targetEl.textContent = Number(data.pred_n).toLocaleString('en-IN', {
        minimumFractionDigits: 2,
      })
    }

    // Populate Prediction Table
    const tbody = document.getElementById('prediction-table-body')
    if (tbody) {
      if (predicted.length > 0) {
        const lastClose = candles[candles.length - 1].close
        tbody.innerHTML = predicted
          .slice(0, 5)
          .map((c: any, idx: number) => {
            const changePct = ((c.close - lastClose) / lastClose) * 100
            const isUp = c.close >= lastClose
            const arrow = isUp ? '↗' : '↘'
            const changeClass = isUp ? 'trend-up' : 'trend-down'
            return `
            <tr>
              <td>+${idx + 1}</td>
              <td style="text-align: right; font-weight: 600;">${Number(c.close).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
              <td style="text-align: right;" class="${changeClass}">${arrow} ${changePct >= 0 ? '+' : ''}${changePct.toFixed(2)}%</td>
            </tr>
          `
          })
          .join('')
      } else {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: var(--muted); padding: 12px 0;">No predictions available</td></tr>`
      }
    }

    // Feed merged historical + forecast candles to chart
    const allCandles = candles.concat(predicted)
    engine.setData(allCandles)

    // Render Oracle bands + median predictions
    updateChartProjections(candles, predicted)

    // Calculate indicators
    updateIndicators()
  } catch (e: any) {
    console.error('[Kronos Live Load Error]', e)
  }
}

function updateChartProjections(historical: any[], predicted: any[]) {
  if (historical.length === 0) return
  const lastClose = historical[historical.length - 1].close
  const horizon = predicted.length || 24

  // Run the library's client-side Oracle path-resampling simulation
  const oracleResult = lab.buildOracle(historical, horizon, 1000)

  const projLines: any[] = []
  let projBand: any = null

  if (oracleResult) {
    const upperPoints = [{ barOffset: 0, price: lastClose }]
    const lowerPoints = [{ barOffset: 0, price: lastClose }]
    const medianPoints = [{ barOffset: 0, price: lastClose }]

    oracleResult.bandsPct.forEach((band: any, idx: number) => {
      const barOffset = idx + 1
      upperPoints.push({ barOffset, price: lastClose * (1 + band.p95 / 100) })
      lowerPoints.push({ barOffset, price: lastClose * (1 + band.p5 / 100) })
      medianPoints.push({ barOffset, price: lastClose * (1 + band.p50 / 100) })
    })

    projBand = {
      color: 'rgba(56, 189, 248, 0.12)',
      opacity: 0.12,
      upper: upperPoints,
      lower: lowerPoints,
    }

    projLines.push({
      id: 'oracle-median',
      color: '#38bdf8',
      opacity: 0.8,
      width: 1.5,
      dashed: true,
      points: medianPoints,
    })
  }

  // AI Forecast Path Line
  const predPoints = [{ barOffset: 0, price: lastClose }]
  predicted.forEach((p: any, idx: number) => {
    predPoints.push({ barOffset: idx + 1, price: p.close })
  })

  projLines.push({
    id: 'kronos-prediction',
    color: '#ef4444',
    opacity: 1,
    width: 2.5,
    points: predPoints,
  })

  engine.setProjections(projLines, projBand)
}

function updateIndicators() {
  if (currentCandles.length === 0) return
  const renderDataList: any[] = []

  activeIndicators.forEach((id) => {
    if (id === 'sma') {
      const def = getIndicator('sma')
      if (def) {
        const outputs = def.compute(currentCandles, { period: 20 })
        renderDataList.push({
          instanceId: 'sma',
          label: 'SMA (20)',
          placement: def.placement,
          outputs,
          range: def.range,
        })
      }
    } else if (id === 'ema') {
      const def = getIndicator('ema')
      if (def) {
        const outputs9 = def.compute(currentCandles, { period: 9 })
        const outputs21 = def.compute(currentCandles, { period: 21 })
        if (outputs9 && outputs9.length > 0) outputs9[0].color = '#ef4444' // red
        if (outputs21 && outputs21.length > 0) outputs21[0].color = '#10b981' // green

        renderDataList.push({
          instanceId: 'ema9',
          label: 'EMA (9)',
          placement: def.placement,
          outputs: outputs9,
          range: def.range,
        })
        renderDataList.push({
          instanceId: 'ema21',
          label: 'EMA (21)',
          placement: def.placement,
          outputs: outputs21,
          range: def.range,
        })
      }
    } else {
      const def = getIndicator(id)
      if (def) {
        const params: any = {}
        def.params.forEach((p: any) => {
          params[p.key] = p.default
        })
        const outputs = def.compute(currentCandles, params)
        renderDataList.push({
          instanceId: id,
          label: def.shortLabel,
          placement: def.placement,
          outputs,
          range: def.range,
        })
      }
    }
  })

  engine.setIndicators(renderDataList)
}

function initSocketConnection() {
  if (socket) {
    socket.disconnect()
  }

  const host = window.location.port === '5173' ? 'http://localhost:8080' : window.location.origin
  // @ts-ignore
  socket = io(host, {
    transports: ['websocket', 'polling'],
    reconnection: true,
  })

  socket.on('connect', () => {
    updateConnectionStatus(true, 'Live')
    socket.emit('subscribe', { symbol: currentSymbol, timeframe: currentTimeframe })
  })

  socket.on('disconnect', () => {
    updateConnectionStatus(false, 'Disconnected')
  })

  socket.on('tick', (data: any) => {
    if (data.symbol !== currentSymbol || data.timeframe !== currentTimeframe) return

    const timeMs = data.time * 1000
    const candle = {
      time: timeMs,
      open: data.open,
      high: data.high,
      low: data.low,
      close: data.close,
      volume: data.volume || 0,
    }

    const priceEl = document.getElementById('metric-price')
    if (priceEl) {
      priceEl.textContent = Number(data.close).toLocaleString('en-IN', {
        minimumFractionDigits: 2,
      })
    }

    if (currentCandles.length > 0) {
      const last = currentCandles[currentCandles.length - 1]
      if (timeMs > last.time) {
        currentCandles.push(candle)
      } else {
        currentCandles[currentCandles.length - 1] = candle
      }
    } else {
      currentCandles.push(candle)
    }

    // Live update the chart engine
    engine.updateLast(candle)

    // Recompute indicators
    updateIndicators()
  })
}

// Control Handlers
const symbolSelect = document.getElementById('symbol')
if (symbolSelect) {
  symbolSelect.addEventListener('change', (e: any) => {
    currentSymbol = e.target.value
    loadSignalData(currentSymbol, currentTimeframe)
    if (socket && socket.connected) {
      socket.emit('subscribe', { symbol: currentSymbol, timeframe: currentTimeframe })
    }
  })
}

document.querySelectorAll('.tf-btn').forEach((btn) => {
  btn.addEventListener('click', (e: any) => {
    document.querySelectorAll('.tf-btn').forEach((b) => b.classList.remove('active'))
    e.target.classList.add('active')
    currentTimeframe = e.target.getAttribute('data-tf')!
    loadSignalData(currentSymbol, currentTimeframe)
    if (socket && socket.connected) {
      socket.emit('subscribe', { symbol: currentSymbol, timeframe: currentTimeframe })
    }
  })
})

document.querySelectorAll('.indicator-checkbox').forEach((box) => {
  box.addEventListener('change', (e: any) => {
    const ind = e.target.getAttribute('data-ind')!
    if (e.target.checked) {
      activeIndicators.add(ind)
    } else {
      activeIndicators.delete(ind)
    }
    updateIndicators()
  })
})

// Initial runs
loadSignalData(currentSymbol, currentTimeframe)
initSocketConnection()

window.addEventListener('resize', () => engine.resize())
