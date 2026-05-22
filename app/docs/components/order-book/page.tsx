'use client'

import { Badge } from '@/components/ui/badge'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { OrderBook } from '@/components/trading/order-book'

// bids: highest price first · asks: lowest price first
const bids = [
  { price: 67234.5, amount: 0.452 },
  { price: 67233.0, amount: 1.21 },
  { price: 67231.8, amount: 0.087 },
  { price: 67230.2, amount: 2.5 },
  { price: 67228.9, amount: 0.64 },
  { price: 67227.3, amount: 1.04 },
  { price: 67225.8, amount: 0.318 },
  { price: 67224.1, amount: 2.17 },
  { price: 67222.6, amount: 0.55 },
  { price: 67221.0, amount: 1.62 },
  { price: 67219.4, amount: 0.92 },
  { price: 67217.9, amount: 3.41 },
]

const asks = [
  { price: 67236.1, amount: 0.331 },
  { price: 67237.4, amount: 0.95 },
  { price: 67239.0, amount: 1.78 },
  { price: 67240.7, amount: 0.42 },
  { price: 67242.3, amount: 3.1 },
  { price: 67243.8, amount: 0.74 },
  { price: 67245.1, amount: 1.36 },
  { price: 67246.9, amount: 0.21 },
  { price: 67248.2, amount: 2.05 },
  { price: 67250.0, amount: 0.88 },
  { price: 67251.7, amount: 1.19 },
  { price: 67253.4, amount: 0.47 },
]

const previewCode = `import { OrderBook } from '@/components/trading/order-book'

export default function Example() {
  return (
    <div className="w-72 rounded-md border border-border bg-card">
      <OrderBook
        priceDecimals={1}
        amountDecimals={3}
        bids={[
          { price: 67234.5, amount: 0.452 },
          { price: 67233.0, amount: 1.21 },
          { price: 67231.8, amount: 0.087 },
        ]}
        asks={[
          { price: 67236.1, amount: 0.331 },
          { price: 67237.4, amount: 0.95 },
          { price: 67239.0, amount: 1.78 },
        ]}
      />
    </div>
  )
}`

const sourceCode = `'use client'

import * as React from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { cn } from '@/lib/utils'

export interface OrderBookLevel {
  price: number
  amount: number
}

export interface OrderBookProps {
  bids: OrderBookLevel[]
  asks: OrderBookLevel[]
  displayDepth?: number
  showCumulative?: boolean
  priceDecimals?: number
  amountDecimals?: number
  rowsVisible?: number
  className?: string
}

// Virtualized depth ladder: asks (red) on top, spread row, bids (green) on
// bottom. Each side sizes to its content; pass rowsVisible to cap a side's
// height and let it scroll.`

export default function OrderBookPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Trading</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Order Book</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Virtualized bid/ask depth ladder with red asks on top, a spread row, and green bids on bottom. Presentational only — feed it
        <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">bids</code> and <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">asks</code> arrays.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="trading-orderbook--default">
        <div className="w-72 rounded-md border border-border bg-card">
          <OrderBook bids={bids} asks={asks} priceDecimals={1} amountDecimals={3} />
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/trading/order-book.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'bids', type: 'OrderBookLevel[]', description: 'Buy levels: { price, amount } (highest first)', required: true },
        { name: 'asks', type: 'OrderBookLevel[]', description: 'Sell levels: { price, amount } (lowest first)', required: true },
        { name: 'displayDepth', type: 'number', defaultValue: '50', description: 'Max number of levels rendered per side' },
        { name: 'showCumulative', type: 'boolean', defaultValue: 'false', description: 'Show cumulative amount instead of total in the last column' },
        { name: 'priceDecimals', type: 'number', defaultValue: '2', description: 'Decimals for price formatting' },
        { name: 'amountDecimals', type: 'number', defaultValue: '4', description: 'Decimals for amount formatting' },
        { name: 'rowsVisible', type: 'number', description: 'Max rows per side before it scrolls (default: show all)' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
