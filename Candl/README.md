# CandL Charts

A **data-agnostic** canvas charting library — the charting core behind
[candl.live](https://candl.live), released open-source. It gives you a fast
in-house canvas engine, a deep drawing-tool set, technical indicators, and the
experimental **CandLlabs** tools. It ships **no data feed** — you bring the
candles (from any exchange, broker, CSV, or your own backend).

> Think of it as the rendering + analysis core, decoupled from data — you supply
> the candles, and CandL Charts draws and analyzes them.

## Features

- ⚡ **Chart engine** — in-house HTML canvas (zero charting dependencies),
  19 chart types (candles, Heikin Ashi, hollow, bars, line, area, Renko-style
  re-binned types, and more), pan/zoom, log scale, replay.
- ✏️ **Drawing tools** — trend lines & channels, the full **Fibonacci suite with
  editable levels**, harmonic & **Elliott-wave** patterns (with degree labels),
  shapes, annotations, measurements, and data-aware "smart" tools.
- 📊 **Indicators** — moving averages, RSI, MACD, Bollinger Bands, ATR,
  Stochastic, VWAP, OBV, CVD, volume.
- 🧪 **CandLlabs** — Echoes (historical similarity search), the Oracle
  (probabilistic outcome model), the Market Clock, and a live trade sonifier.
- 🔌 **Data-agnostic** — `setData(candles)` / `updateLast(candle)`, or implement
  the optional `DataProvider` contract for richer integrations.

## Install

```bash
npm install @candllabs/charts
```

`react` is an optional peer dependency — it's only needed (type-only) if you use
the drawing-tool **icon** exports. The chart engine itself is framework-free.

## Quick start

```ts
import { createChartEngine, type Candle } from '@candllabs/charts'

const engine = createChartEngine(document.getElementById('chart')!, {
  theme: 'dark',
  pricePrecision: 2,
  chartType: 'candles',
})

const candles: Candle[] = await myFeed.history('BTCUSDT', '1m')
engine.setData(candles)

myFeed.onTick((c) => engine.updateLast(c)) // live updates
window.addEventListener('resize', () => engine.resize())
```

## Bring your own data

The library never makes network calls. Your only obligation is to produce
`Candle[]`:

```ts
interface Candle {
  time: number // epoch ms
  open: number
  high: number
  low: number
  close: number
  volume: number
}
```

Indicators, drawings, and the CandLlabs tools are pure functions over candles, so
no provider is needed for the core. For app-level integrations you can implement
the exported `DataProvider` interface (`fetchCandles`, `subscribeCandles`,
`searchSymbols`, …) and feed its output into `setData` / `updateLast`.

## Price alerts

`checkAndFireAlerts` evaluates the alerts for one symbol against its latest price
and fires (a browser notification + optional sound) any that just crossed. Call
it per symbol you have a price for — so alerts fire for **any number of symbols
at once**, independent of what's on screen:

```ts
import { checkAndFireAlerts, type Alert } from '@candllabs/charts'

const alerts: Alert[] = [/* your alerts, across any symbols */]
const last = new Map<string, number>() // last price seen per symbol

function onTick(symbol: string, price: number) {
  checkAndFireAlerts({
    symbol,
    price,
    prevPrice: last.get(symbol) ?? null,
    alerts,
    soundOn: true,
    tune: 0,
    tuneDurationSec: 3,
    onTriggered: (id) => {/* mark it triggered in your own state */},
  })
  last.set(symbol, price)
}
```

## Demo

```bash
npm install
npx vite examples/basic   # then open the printed localhost URL
```

The demo renders the chart from a deterministic synthetic feed (no network) and
streams a fake live tick once a second.

## Build

```bash
npm run build      # type-check + bundle (ES + CJS) with .d.ts into dist/
```

## License

[Apache-2.0](./LICENSE) © Rahul Sangam. Contributions welcome — see
[CONTRIBUTING.md](./CONTRIBUTING.md).
