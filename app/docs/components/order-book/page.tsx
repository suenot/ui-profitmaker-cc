'use client'

import { Badge } from '@/components/ui/badge'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { OrderBook } from '@/components/trading/order-book'

const bids = [
  { price: 67234.5, amount: 0.452 },
  { price: 67233.0, amount: 1.21 },
  { price: 67231.8, amount: 0.087 },
  { price: 67230.2, amount: 2.5 },
  { price: 67228.9, amount: 0.64 },
]

const asks = [
  { price: 67236.1, amount: 0.331 },
  { price: 67237.4, amount: 0.95 },
  { price: 67239.0, amount: 1.78 },
  { price: 67240.7, amount: 0.42 },
  { price: 67242.3, amount: 3.1 },
]

const previewCode = `import { OrderBook } from '@/components/trading/order-book'

export default function Example() {
  return (
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
  )
}`

const sourceCode = `'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface OrderBookLevel {
  price: number
  amount: number
  total?: number
}

export interface OrderBookProps {
  bids: OrderBookLevel[]
  asks: OrderBookLevel[]
  priceDecimals?: number
  amountDecimals?: number
  className?: string
}

// Presentational depth view: asks on top, bids on bottom, spread row between.
// Depth bars are scaled to the largest total across both sides.`

export default function OrderBookPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Trading</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Order Book</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Classic bid/ask depth ladder with red/green rows, depth bars, and a spread row. Presentational only — feed it
        <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">bids</code> and <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">asks</code> arrays.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="trading-orderbook--default">
        <OrderBook bids={bids} asks={asks} priceDecimals={1} amountDecimals={3} />
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/trading/order-book.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'bids', type: 'OrderBookLevel[]', description: 'Buy levels: { price, amount, total? } (highest first)', required: true },
        { name: 'asks', type: 'OrderBookLevel[]', description: 'Sell levels: { price, amount, total? } (lowest first)', required: true },
        { name: 'priceDecimals', type: 'number', defaultValue: '2', description: 'Decimals for price formatting' },
        { name: 'amountDecimals', type: 'number', defaultValue: '4', description: 'Decimals for amount/total formatting' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
