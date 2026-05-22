'use client'

import * as React from 'react'
import { TrendingUp, Eye, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

export type DealSide = 'long' | 'short'
export type DealStatus = 'open' | 'closed'

export interface Deal {
  id: string
  symbol: string
  side: DealSide
  entryPrice: number
  exitPrice?: number
  pnl?: number
  status: DealStatus
}

export interface DealsListProps {
  deals: Deal[]
  onSelectDeal?: (id: string) => void
  onDeleteDeal?: (id: string) => void
  className?: string
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function DealsList({ deals, onSelectDeal, onDeleteDeal, className }: DealsListProps) {
  const realized = deals.reduce((sum, d) => sum + (d.pnl ?? 0), 0)
  const wins = deals.filter((d) => (d.pnl ?? 0) > 0).length
  const closed = deals.filter((d) => d.status === 'closed').length
  const winRate = closed > 0 ? (wins / closed) * 100 : 0

  return (
    <div className={cn('flex w-full flex-col rounded-2xl border border-border bg-card/40 text-foreground', className)}>
      <div className="flex items-center gap-2 border-b border-border p-4">
        <TrendingUp className="h-5 w-5 text-accent-darker" />
        <span className="font-bold">Deals</span>
      </div>

      <div className="grid grid-cols-3 gap-4 border-b border-border p-4">
        <div className="text-center">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Total</div>
          <div className="text-lg font-bold">{deals.length}</div>
        </div>
        <div className="text-center">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Win Rate</div>
          <div className="text-lg font-bold text-green-400">{winRate.toFixed(1)}%</div>
        </div>
        <div className="text-center">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Realized PnL</div>
          <div className={cn('text-lg font-bold', realized >= 0 ? 'text-green-400' : 'text-red-400')}>
            {realized >= 0 ? '+' : ''}
            {formatCurrency(realized)}
          </div>
        </div>
      </div>

      {deals.length === 0 ? (
        <div className="flex flex-col items-center gap-2 p-12 text-center">
          <TrendingUp className="h-10 w-10 text-muted-foreground" />
          <h3 className="font-bold">No deals yet</h3>
          <p className="text-sm text-muted-foreground">Start tracking your trading deals.</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Side</TableHead>
              <TableHead className="text-right">Entry</TableHead>
              <TableHead className="text-right">Exit</TableHead>
              <TableHead className="text-right">PnL</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deals.map((deal) => (
              <TableRow
                key={deal.id}
                className="cursor-pointer"
                onClick={() => onSelectDeal?.(deal.id)}
              >
                <TableCell className="font-medium">{deal.symbol}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      'rounded-md px-2 py-0.5 text-xs font-bold uppercase tracking-widest',
                      deal.side === 'long' ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'
                    )}
                  >
                    {deal.side}
                  </span>
                </TableCell>
                <TableCell className="text-right font-mono">{deal.entryPrice.toLocaleString()}</TableCell>
                <TableCell className="text-right font-mono">
                  {deal.exitPrice != null ? deal.exitPrice.toLocaleString() : '—'}
                </TableCell>
                <TableCell
                  className={cn(
                    'text-right font-mono font-medium',
                    deal.pnl == null ? 'text-muted-foreground' : deal.pnl >= 0 ? 'text-green-400' : 'text-red-400'
                  )}
                >
                  {deal.pnl != null ? `${deal.pnl >= 0 ? '+' : ''}${formatCurrency(deal.pnl)}` : '—'}
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      'rounded-md px-2 py-0.5 text-xs font-medium capitalize',
                      deal.status === 'open' ? 'bg-accent/15 text-accent-darker' : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {deal.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelectDeal?.(deal.id)
                      }}
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteDeal?.(deal.id)
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
