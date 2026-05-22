'use client'

import * as React from 'react'
import { useState } from 'react'
import { Plus, Info, Edit, Trash2, TrendingUp, Eye } from 'lucide-react'
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

export interface Deal {
  id: string
  name?: string
  note?: string
  stocks: number
  coins: number
  pairs: number
  credited: number
  credited_trades: number
  debited: number
  debited_trades: number
  total: number
  total_trades: number
  timestamp_open: string
  timestamp_closed: string
  duration: string
}

export interface DealsListProps {
  deals: Deal[]
  onSelectDeal: (dealId: string) => void
  onAddDeal: () => void
  onEditDeal: (dealId: string) => void
  onDeleteDeal: (dealId: string) => void
  className?: string
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)

const formatNumber = (value: number) => new Intl.NumberFormat('en-US').format(value)

export function DealsList({
  deals,
  onSelectDeal,
  onAddDeal,
  onEditDeal,
  onDeleteDeal,
  className,
}: DealsListProps) {
  const [selectedNote, setSelectedNote] = useState<string | null>(null)
  const [noteContent, setNoteContent] = useState<string>('')

  const showNote = (deal: Deal) => {
    if (selectedNote === deal.id) {
      setSelectedNote(null)
      setNoteContent('')
    } else {
      setSelectedNote(deal.id)
      setNoteContent(deal.note || '')
    }
  }

  const totalProfit = deals.reduce((sum, deal) => sum + (deal.total > 0 ? deal.total : 0), 0)
  const totalLoss = deals.reduce(
    (sum, deal) => sum + (deal.total < 0 ? Math.abs(deal.total) : 0),
    0,
  )
  const winningDeals = deals.filter((deal) => deal.total > 0).length
  const winRate = deals.length > 0 ? (winningDeals / deals.length) * 100 : 0

  return (
    <div className={cn('flex h-full flex-col', className)}>
      <div className="flex items-center justify-between border-b border-border p-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <span className="font-medium text-foreground">Deals</span>
        </div>
        <Button onClick={onAddDeal} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Deal
        </Button>
      </div>
      <div className="flex-1 overflow-auto p-3">
        <div className="mb-6 grid grid-cols-2 gap-4 rounded-lg bg-muted/50 p-4 md:grid-cols-4">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Total Deals</div>
            <div className="text-lg font-bold text-foreground">{deals.length}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Win Rate</div>
            <div className="text-lg font-bold text-green-400">{winRate.toFixed(1)}%</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Total Profit</div>
            <div className="text-lg font-bold text-green-400">+{formatCurrency(totalProfit)}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Total Loss</div>
            <div className="text-lg font-bold text-red-400">-{formatCurrency(totalLoss)}</div>
          </div>
        </div>

        {noteContent && (
          <div className="mb-4 rounded-lg border border-border/50 bg-muted/50 p-3">
            <p className="text-sm text-muted-foreground">{noteContent}</p>
          </div>
        )}

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="text-center">Stocks</TableHead>
                <TableHead className="text-center">Coins</TableHead>
                <TableHead className="text-center">Pairs</TableHead>
                <TableHead className="text-center">Credited</TableHead>
                <TableHead className="text-center">Debited</TableHead>
                <TableHead className="text-center">Total</TableHead>
                <TableHead className="text-center">Time</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deals.map((deal) => (
                <TableRow
                  key={deal.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onSelectDeal(deal.id)}
                >
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{deal.name || 'Unnamed Deal'}</span>
                      {deal.note && (
                        <span className="max-w-[200px] truncate text-xs text-muted-foreground">
                          {deal.note}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{formatNumber(deal.stocks)}</TableCell>
                  <TableCell className="text-center">{formatNumber(deal.coins)}</TableCell>
                  <TableCell className="text-center">{formatNumber(deal.pairs)}</TableCell>
                  <TableCell className="text-center">
                    <div className="text-sm">
                      {formatCurrency(deal.credited)}
                      <div className="text-xs text-muted-foreground">
                        ({deal.credited_trades} trades)
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="text-sm">
                      {formatCurrency(deal.debited)}
                      <div className="text-xs text-muted-foreground">
                        ({deal.debited_trades} trades)
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div
                      className={cn(
                        'text-sm font-medium',
                        deal.total >= 0 ? 'text-green-400' : 'text-red-400',
                      )}
                    >
                      {formatCurrency(deal.total)}
                      <div className="text-xs text-muted-foreground">
                        ({deal.total_trades} trades)
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="text-xs">
                      <div>{deal.timestamp_open}</div>
                      <div>{deal.timestamp_closed}</div>
                      <div className="text-muted-foreground">({deal.duration})</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={(e) => {
                          e.stopPropagation()
                          onSelectDeal(deal.id)
                        }}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button
                        variant={selectedNote === deal.id ? 'default' : 'outline'}
                        size="icon"
                        className="h-7 w-7"
                        onClick={(e) => {
                          e.stopPropagation()
                          showNote(deal)
                        }}
                      >
                        <Info className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={(e) => {
                          e.stopPropagation()
                          onEditDeal(deal.id)
                        }}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 hover:bg-destructive hover:text-destructive-foreground"
                        onClick={(e) => {
                          e.stopPropagation()
                          onDeleteDeal(deal.id)
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
        </div>

        {deals.length === 0 && (
          <div className="py-12 text-center">
            <TrendingUp className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-medium text-foreground">No deals yet</h3>
            <p className="mb-4 text-muted-foreground">Start tracking your trading deals</p>
            <Button onClick={onAddDeal} className="gap-2">
              <Plus className="h-4 w-4" />
              Create First Deal
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
