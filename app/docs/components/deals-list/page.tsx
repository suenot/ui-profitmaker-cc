'use client'

import { Badge } from '@/components/ui/badge'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { DealsList } from '@/components/trading/deals-list'

const deals = [
  { id: '1', symbol: 'BTC/USDT', side: 'long' as const, entryPrice: 64200, exitPrice: 67235, pnl: 3035, status: 'closed' as const },
  { id: '2', symbol: 'ETH/USDT', side: 'short' as const, entryPrice: 3520, exitPrice: 3610, pnl: -90, status: 'closed' as const },
  { id: '3', symbol: 'SOL/USDT', side: 'long' as const, entryPrice: 148.2, status: 'open' as const },
  { id: '4', symbol: 'BNB/USDT', side: 'long' as const, entryPrice: 580, exitPrice: 612, pnl: 32, status: 'closed' as const },
]

const previewCode = `import { DealsList } from '@/components/trading/deals-list'

export default function Example() {
  return (
    <DealsList
      deals={[
        { id: '1', symbol: 'BTC/USDT', side: 'long', entryPrice: 64200, exitPrice: 67235, pnl: 3035, status: 'closed' },
        { id: '2', symbol: 'ETH/USDT', side: 'short', entryPrice: 3520, exitPrice: 3610, pnl: -90, status: 'closed' },
        { id: '3', symbol: 'SOL/USDT', side: 'long', entryPrice: 148.2, status: 'open' },
      ]}
      onSelectDeal={(id) => console.log(id)}
      onDeleteDeal={(id) => console.log(id)}
    />
  )
}`

const sourceCode = `'use client'

import * as React from 'react'
import { TrendingUp, Eye, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
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

// Summary stats (count, win rate, realized PnL) plus a deals table.`

export default function DealsListPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Trading</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Deals List</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Trade history table with summary statistics: deal count, win rate, and realized PnL. Built on the
        <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">Table</code> and <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">Button</code> primitives.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="trading-dealslist--default">
        <DealsList deals={deals} onSelectDeal={(id) => console.log(id)} onDeleteDeal={(id) => console.log(id)} />
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/trading/deals-list.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'deals', type: 'Deal[]', description: 'Deals: { id, symbol, side, entryPrice, exitPrice?, pnl?, status }', required: true },
        { name: 'onSelectDeal', type: '(id: string) => void', description: 'Called when a row or view button is clicked' },
        { name: 'onDeleteDeal', type: '(id: string) => void', description: 'Called when the delete button is clicked' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
