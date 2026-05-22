'use client'

import { Badge } from '@/components/ui/badge'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { Footprint, type FootprintCandle } from '@/components/trading/footprint'

function makeCandles(count = 5, tick = 1): FootprintCandle[] {
  const out: FootprintCandle[] = []
  let mid = 67230
  const base = Date.now() - count * 60_000
  for (let i = 0; i < count; i++) {
    const open = mid
    mid += (Math.sin(i * 1.3) + (i % 2 ? -0.4 : 0.6)) * 4
    const close = mid
    const high = Math.max(open, close) + 4
    const low = Math.min(open, close) - 4
    const lo = Math.round(low / tick) * tick
    const hi = Math.round(high / tick) * tick
    const levels = []
    for (let p = hi; p >= lo; p -= tick) {
      const dist = Math.abs(p - (open + close) / 2)
      const weight = Math.max(0.12, 1 - dist / ((hi - lo) / 1.5))
      levels.push({
        price: p,
        bidVolume: Math.round(weight * (50 + ((i * 17 + p) % 90))),
        askVolume: Math.round(weight * (50 + ((i * 31 + p) % 90))),
      })
    }
    out.push({ time: base + i * 60_000, open, high, low, close, levels })
  }
  return out
}

const candles = makeCandles()

const previewCode = `import { Footprint } from '@/components/trading/footprint'

export default function Example() {
  return (
    <div className="w-[600px] h-[360px] rounded-md border border-border bg-card overflow-hidden">
      <Footprint
        priceDecimals={0}
        tickSize={1}
        imbalanceRatio={3}
        showPOC
        candles={[
          {
            time: Date.now(),
            open: 67230, high: 67238, low: 67224, close: 67235,
            levels: [
              { price: 67238, bidVolume: 20, askVolume: 110 },
              { price: 67237, bidVolume: 35, askVolume: 90 },
              { price: 67236, bidVolume: 60, askVolume: 75 },
              // ...one row per price tick
            ],
          },
        ]}
      />
    </div>
  )
}`

const sourceCode = `'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface FootprintPriceLevel {
  price: number
  bidVolume: number
  askVolume: number
}

export interface FootprintCandle {
  time: number
  open: number
  high: number
  low: number
  close: number
  levels: FootprintPriceLevel[]
}

export interface FootprintProps {
  candles: FootprintCandle[]
  mode?: 'numbers' | 'profile'
  priceDecimals?: number
  imbalanceRatio?: number
  showPOC?: boolean
  tickSize?: number
  width?: number
  height?: number
  className?: string
}

// Canvas footprint chart with two modes. 'numbers': each candle is a column of
// price-level rows showing bid (left) vs ask (right) volume, intensity-shaded,
// with diagonal imbalance outlines. 'profile': a divergent volume-profile per
// candle (bid bars left, ask bars right). Both box the per-candle POC.`

export default function FootprintPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Trading</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Footprint</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Order-flow footprint chart. Each candle is expanded into price-level rows showing bid (sell-initiated) volume against
        ask (buy-initiated) volume. Cells are shaded by volume, diagonal imbalances are outlined, and the per-candle
        <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">POC</code> is boxed.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="trading-footprint--default" previewClassName="min-h-[420px]">
        <div className="w-[600px] h-[360px] rounded-md border border-border bg-card overflow-hidden">
          <Footprint candles={candles} priceDecimals={0} tickSize={1} imbalanceRatio={3} showPOC />
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Profile mode</h2>
      <p className="text-muted-foreground font-light mb-4">
        Set <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">mode=&quot;profile&quot;</code> for a divergent volume-profile per candle — bid bars left, ask bars right.
      </p>
      <ComponentPreview code={`<Footprint mode="profile" candles={candles} priceDecimals={0} tickSize={1} showPOC />`} language="tsx" storyId="trading-footprint--profile" previewClassName="min-h-[420px]">
        <div className="w-[600px] h-[360px] rounded-md border border-border bg-card overflow-hidden">
          <Footprint candles={candles} mode="profile" priceDecimals={0} tickSize={1} showPOC />
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/trading/footprint.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'candles', type: 'FootprintCandle[]', description: 'Candles, each with OHLC + per-price bid/ask volume levels', required: true },
        { name: 'mode', type: "'numbers' | 'profile'", defaultValue: "'numbers'", description: 'Bid×ask volume cells, or a divergent volume-profile per candle' },
        { name: 'priceDecimals', type: 'number', defaultValue: '2', description: 'Decimals for price axis labels' },
        { name: 'imbalanceRatio', type: 'number', defaultValue: '3', description: 'Outline a cell when its volume >= ratio × the diagonal opposite volume' },
        { name: 'showPOC', type: 'boolean', defaultValue: 'true', description: 'Box the point-of-control (max-volume) level per candle' },
        { name: 'tickSize', type: 'number', description: 'Price step between rows (auto-inferred if omitted)' },
        { name: 'width', type: 'number', description: 'Fixed pixel width (otherwise fills container)' },
        { name: 'height', type: 'number', description: 'Fixed pixel height (otherwise fills container)' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
