'use client'

import { Badge } from '@/components/ui/badge'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { Heatmap, type HeatmapSlice, type HeatmapTrade } from '@/components/trading/heatmap'

function makeBook(sliceCount = 60, tick = 1, depth = 36) {
  const slices: HeatmapSlice[] = []
  const trades: HeatmapTrade[] = []
  let mid = 67230
  const base = Date.now() - sliceCount * 1000
  for (let i = 0; i < sliceCount; i++) {
    mid += Math.sin(i * 0.2) * 2 + ((i * 7) % 5) - 2
    const center = Math.round(mid / tick) * tick
    const time = base + i * 1000
    const levels: { price: number; size: number; side: 'bid' | 'ask' }[] = []
    for (let k = -depth; k <= depth; k++) {
      if (k === 0) continue
      const price = center + k * tick
      const dist = Math.abs(k)
      let size = Math.max(0, 60 - dist * 1.4) + ((i + price) % 18)
      if (dist === 8 || dist === 14) size += 130
      levels.push({ price, size, side: k > 0 ? 'ask' : 'bid' })
    }
    slices.push({ time, mid: center, levels })
    if (i % 2 === 0) {
      trades.push({
        time,
        price: center + (((i * 13) % 7) - 3) * tick,
        size: ((i * 3) % 10) + 1,
        side: i % 3 === 0 ? 'buy' : 'sell',
      })
    }
  }
  return { slices, trades }
}

const { slices, trades } = makeBook()

const previewCode = `import { Heatmap } from '@/components/trading/heatmap'

export default function Example() {
  return (
    <div className="w-[600px] h-[360px] rounded-md border border-border overflow-hidden">
      <Heatmap
        priceDecimals={0}
        tickSize={1}
        colorScale="side"  // red asks above mid, green bids below
        showTrades
        slices={[
          {
            time: Date.now(),
            mid: 67236,
            levels: [
              { price: 67238, size: 40, side: 'ask' },
              { price: 67237, size: 180, side: 'ask' }, // bright resting wall
              { price: 67235, size: 55, side: 'bid' },
              // ...one slice per time column
            ],
          },
        ]}
        trades={[{ time: Date.now(), price: 67236, size: 5, side: 'buy' }]}
      />
    </div>
  )
}`

const sourceCode = `'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface HeatmapLevel {
  price: number
  size: number
  side?: 'bid' | 'ask' // else derived from the slice mid
}

export interface HeatmapSlice {
  time: number
  mid?: number // splits bids (below) from asks (above)
  levels: HeatmapLevel[]
}

export interface HeatmapTrade {
  time: number
  price: number
  size: number
  side: 'buy' | 'sell'
}

export interface HeatmapProps {
  slices: HeatmapSlice[]
  trades?: HeatmapTrade[]
  priceDecimals?: number
  tickSize?: number
  colorScale?: 'side' | 'heat' | 'mono'
  showTrades?: boolean
  showDepth?: boolean
  className?: string
}

// Canvas time×price depth heatmap. Resting liquidity is colored by side — red
// asks above the mid, green bids below — with brightness tracking size, so big
// resting orders read as bright "walls". A mid-price path connects the slices,
// trades overlay as side-colored dots sized by volume, and the live book is
// drawn as a depth histogram at the right edge.`

export default function HeatmapPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Trading</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Heatmap</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Historical depth-of-market heatmap. Time runs left-to-right, price top-to-bottom. Resting liquidity is colored by
        side — <span className="text-red-400">red asks</span> above the mid, <span className="text-green-400">green bids</span> below —
        with brightness tracking size. Trades overlay as dots sized by volume, and the live book shows as a depth histogram at the right edge.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="trading-heatmap--default" previewClassName="min-h-[420px]">
        <div className="w-[600px] h-[360px] rounded-md border border-border overflow-hidden">
          <Heatmap slices={slices} trades={trades} priceDecimals={0} tickSize={1} colorScale="side" showTrades />
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/trading/heatmap.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'slices', type: 'HeatmapSlice[]', description: 'Time slices (oldest→newest); each has a mid and resting size per price level', required: true },
        { name: 'trades', type: 'HeatmapTrade[]', description: 'Optional executed trades overlaid as dots' },
        { name: 'priceDecimals', type: 'number', defaultValue: '2', description: 'Decimals for the price axis labels' },
        { name: 'tickSize', type: 'number', description: 'Price step between rows (auto-inferred if omitted)' },
        { name: 'colorScale', type: "'side' | 'heat' | 'mono'", defaultValue: "'side'", description: 'Side coloring (flowsurface-style), a heat ramp, or single-accent mono' },
        { name: 'showTrades', type: 'boolean', defaultValue: 'true', description: 'Draw trade dots when trades are provided' },
        { name: 'showDepth', type: 'boolean', defaultValue: 'true', description: 'Draw the live order-book depth histogram at the right edge' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
