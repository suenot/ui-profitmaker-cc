'use client'

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
  className?: string
}

interface ProcessedLevel {
  price: number
  amount: number
  total: number
  cumulative: number
}

export function OrderBook({
  bids,
  asks,
  displayDepth = 50,
  showCumulative = false,
  priceDecimals = 2,
  amountDecimals = 4,
  className,
}: OrderBookProps) {
  const formatPrice = (price: number): string => price.toFixed(priceDecimals)
  const formatAmount = (amount: number): string => amount.toFixed(amountDecimals)
  const formatVolume = (volume: number): string => {
    if (volume >= 1000000) return (volume / 1000000).toFixed(2) + 'M'
    if (volume >= 1000) return (volume / 1000).toFixed(2) + 'K'
    return volume.toFixed(2)
  }

  const processedOrderBook = React.useMemo(() => {
    const process = (levels: OrderBookLevel[]): ProcessedLevel[] => {
      let cumulative = 0
      return levels.slice(0, displayDepth).map((level) => {
        cumulative += level.amount
        return {
          price: level.price,
          amount: level.amount,
          total: level.price * level.amount,
          cumulative,
        }
      })
    }

    const processedBids = process(bids)
    const processedAsks = process(asks)

    return {
      bids: processedBids,
      asks: processedAsks,
      spread:
        processedAsks.length > 0 && processedBids.length > 0
          ? processedAsks[0].price - processedBids[0].price
          : 0,
      spreadPercent:
        processedAsks.length > 0 && processedBids.length > 0
          ? ((processedAsks[0].price - processedBids[0].price) / processedBids[0].price) * 100
          : 0,
    }
  }, [bids, asks, displayDepth])

  // Virtualized Asks Component (sells - top)
  const VirtualizedAsks = ({ asks }: { asks: ProcessedLevel[] }) => {
    const asksParentRef = React.useRef<HTMLDivElement>(null)

    const asksVirtualizer = useVirtualizer({
      count: asks.length,
      getScrollElement: () => asksParentRef.current,
      estimateSize: () => 24,
      measureElement: undefined,
    })

    return (
      <div ref={asksParentRef} className="flex-1 overflow-auto">
        <div
          style={{
            height: asksVirtualizer.getTotalSize(),
            width: '100%',
            position: 'relative',
          }}
        >
          {asksVirtualizer.getVirtualItems().map((virtualRow) => {
            const ask = asks[asks.length - 1 - virtualRow.index]
            return (
              <div
                key={virtualRow.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '24px',
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className="grid grid-cols-3 gap-2 text-xs px-2 py-1 bg-red-50/20 hover:bg-red-50/30 dark:bg-red-900/20 dark:hover:bg-red-900/30 border-l-2 border-red-500 dark:border-red-400"
              >
                <div className="font-mono text-red-600 dark:text-red-400 leading-none">{formatPrice(ask.price)}</div>
                <div className="font-mono text-right text-foreground leading-none">{formatAmount(ask.amount)}</div>
                <div className="font-mono text-right text-muted-foreground leading-none">
                  {showCumulative ? formatAmount(ask.cumulative) : formatVolume(ask.total)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Virtualized Bids Component (buys - bottom)
  const VirtualizedBids = ({ bids }: { bids: ProcessedLevel[] }) => {
    const bidsParentRef = React.useRef<HTMLDivElement>(null)

    const bidsVirtualizer = useVirtualizer({
      count: bids.length,
      getScrollElement: () => bidsParentRef.current,
      estimateSize: () => 24,
      measureElement: undefined,
    })

    return (
      <div ref={bidsParentRef} className="flex-1 overflow-auto">
        <div
          style={{
            height: bidsVirtualizer.getTotalSize(),
            width: '100%',
            position: 'relative',
          }}
        >
          {bidsVirtualizer.getVirtualItems().map((virtualRow) => {
            const bid = bids[virtualRow.index]
            return (
              <div
                key={virtualRow.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '24px',
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className="grid grid-cols-3 gap-2 text-xs px-2 py-1 bg-green-50/20 hover:bg-green-50/30 dark:bg-green-900/20 dark:hover:bg-green-900/30 border-l-2 border-green-500 dark:border-green-400"
              >
                <div className="font-mono text-green-600 dark:text-green-400 leading-none">{formatPrice(bid.price)}</div>
                <div className="font-mono text-right text-foreground leading-none">{formatAmount(bid.amount)}</div>
                <div className="font-mono text-right text-muted-foreground leading-none">
                  {showCumulative ? formatAmount(bid.cumulative) : formatVolume(bid.total)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className={cn('w-full h-full flex flex-col', className)}>
      <div className="flex-1 flex flex-col space-y-1">
        {/* Headers */}
        <div className="grid grid-cols-3 gap-2 text-xs font-medium text-muted-foreground px-2 py-1 border-b border-border">
          <div>Price</div>
          <div className="text-right">Volume</div>
          <div className="text-right">{showCumulative ? 'Cumul.' : 'Total'}</div>
        </div>

        {/* Asks (sells) - top - Virtualized */}
        <VirtualizedAsks asks={processedOrderBook.asks} />

        {/* Spread */}
        <div className="bg-muted p-2 text-center border-y border-border flex-shrink-0">
          <div className="text-xs text-foreground">Spread: {formatPrice(processedOrderBook.spread)}</div>
          <div className="text-xs text-muted-foreground">({processedOrderBook.spreadPercent.toFixed(4)}%)</div>
        </div>

        {/* Bids (buys) - bottom - Virtualized */}
        <VirtualizedBids bids={processedOrderBook.bids} />
      </div>
    </div>
  )
}
