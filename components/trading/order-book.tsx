'use client'

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

function withTotals(levels: OrderBookLevel[]): Required<OrderBookLevel>[] {
  return levels.map((l) => ({ ...l, total: l.total ?? l.price * l.amount }))
}

export function OrderBook({
  bids,
  asks,
  priceDecimals = 2,
  amountDecimals = 4,
  className,
}: OrderBookProps) {
  const bidLevels = withTotals(bids)
  const askLevels = withTotals(asks)

  const maxTotal = Math.max(
    ...bidLevels.map((l) => l.total),
    ...askLevels.map((l) => l.total),
    1
  )

  const bestBid = bidLevels[0]?.price ?? 0
  const bestAsk = askLevels[0]?.price ?? 0
  const spread = bestAsk && bestBid ? bestAsk - bestBid : 0
  const spreadPercent = bestBid ? (spread / bestBid) * 100 : 0

  const fmtPrice = (n: number) => n.toFixed(priceDecimals)
  const fmtAmount = (n: number) => n.toFixed(amountDecimals)

  const Row = ({ level, side }: { level: Required<OrderBookLevel>; side: 'bid' | 'ask' }) => {
    const depth = (level.total / maxTotal) * 100
    return (
      <div className="relative grid grid-cols-3 px-3 py-1 font-mono text-xs">
        <div
          className={cn('absolute inset-y-0 right-0', side === 'bid' ? 'bg-green-500/10' : 'bg-red-500/10')}
          style={{ width: `${depth}%` }}
        />
        <span className={cn('relative z-10', side === 'bid' ? 'text-green-400' : 'text-red-400')}>
          {fmtPrice(level.price)}
        </span>
        <span className="relative z-10 text-right text-foreground">{fmtAmount(level.amount)}</span>
        <span className="relative z-10 text-right text-muted-foreground">{fmtAmount(level.total)}</span>
      </div>
    )
  }

  return (
    <div className={cn('flex w-full max-w-xs flex-col rounded-2xl border border-border bg-card/40 text-foreground', className)}>
      <div className="grid grid-cols-3 border-b border-border px-3 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
        <span>Price</span>
        <span className="text-right">Amount</span>
        <span className="text-right">Total</span>
      </div>

      <div className="flex flex-col-reverse">
        {askLevels.map((level, i) => (
          <Row key={`ask-${i}`} level={level} side="ask" />
        ))}
      </div>

      <div className="flex items-center justify-between border-y border-border bg-muted/30 px-3 py-2 text-xs">
        <span className="font-mono font-bold">{fmtPrice(spread)}</span>
        <span className="text-muted-foreground">Spread</span>
        <span className="font-mono text-muted-foreground">{spreadPercent.toFixed(3)}%</span>
      </div>

      <div className="flex flex-col">
        {bidLevels.map((level, i) => (
          <Row key={`bid-${i}`} level={level} side="bid" />
        ))}
      </div>
    </div>
  )
}
