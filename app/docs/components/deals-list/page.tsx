'use client'

import { Badge } from '@/components/ui/badge'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { DealsList, type Deal } from '@/components/trading/deals-list'

const deals: Deal[] = [
  {
    id: '1',
    name: 'BTC Swing',
    note: 'Held through the weekly close',
    stocks: 0,
    coins: 2,
    pairs: 1,
    credited: 134470,
    credited_trades: 3,
    debited: 128400,
    debited_trades: 2,
    total: 6070,
    total_trades: 5,
    timestamp_open: '2026-05-01 09:12',
    timestamp_closed: '2026-05-08 17:40',
    duration: '7d 8h',
  },
  {
    id: '2',
    name: 'ETH Scalp',
    stocks: 0,
    coins: 10,
    pairs: 1,
    credited: 35200,
    credited_trades: 4,
    debited: 36100,
    debited_trades: 4,
    total: -900,
    total_trades: 8,
    timestamp_open: '2026-05-10 11:00',
    timestamp_closed: '2026-05-10 14:25',
    duration: '3h 25m',
  },
  {
    id: '3',
    name: 'SOL Position',
    note: 'Scaling in',
    stocks: 0,
    coins: 120,
    pairs: 1,
    credited: 18200,
    credited_trades: 2,
    debited: 17800,
    debited_trades: 1,
    total: 400,
    total_trades: 3,
    timestamp_open: '2026-05-15 08:00',
    timestamp_closed: '2026-05-18 19:30',
    duration: '3d 11h',
  },
]

const noop = () => {}

const previewCode = `import { DealsList } from '@/components/trading/deals-list'

export default function Example() {
  return (
    <DealsList
      deals={[
        {
          id: '1', name: 'BTC Swing', note: 'Held through the weekly close',
          stocks: 0, coins: 2, pairs: 1,
          credited: 134470, credited_trades: 3,
          debited: 128400, debited_trades: 2,
          total: 6070, total_trades: 5,
          timestamp_open: '2026-05-01 09:12', timestamp_closed: '2026-05-08 17:40',
          duration: '7d 8h',
        },
      ]}
      onSelectDeal={(id) => {}}
      onAddDeal={() => {}}
      onEditDeal={(id) => {}}
      onDeleteDeal={(id) => {}}
    />
  )
}`

const sourceCode = `'use client'

import * as React from 'react'
import { useState } from 'react'
import { Plus, Info, Edit, Trash2, TrendingUp, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
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

// Summary stats (count, win rate, profit, loss), a deals table with
// per-row note toggle and Eye/Info/Edit/Trash actions, plus an empty state.
// See components/trading/deals-list.tsx for the full implementation.`

export default function DealsListPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Trading</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Deals List</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Deal history table with summary statistics (total deals, win rate, total profit, total loss),
        an inline note toggle per row, and Eye/Info/Edit/Delete actions. Built on the
        <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">Table</code> and <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">Button</code> primitives.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="trading-dealslist--default">
        <DealsList
          deals={deals}
          onSelectDeal={noop}
          onAddDeal={noop}
          onEditDeal={noop}
          onDeleteDeal={noop}
        />
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/trading/deals-list.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'deals', type: 'Deal[]', description: 'Deals: { id, name?, note?, stocks, coins, pairs, credited, credited_trades, debited, debited_trades, total, total_trades, timestamp_open, timestamp_closed, duration }', required: true },
        { name: 'onSelectDeal', type: '(dealId: string) => void', description: 'Called when a row or the view button is clicked', required: true },
        { name: 'onAddDeal', type: '() => void', description: 'Called when the Add Deal / Create First Deal button is clicked', required: true },
        { name: 'onEditDeal', type: '(dealId: string) => void', description: 'Called when the edit button is clicked', required: true },
        { name: 'onDeleteDeal', type: '(dealId: string) => void', description: 'Called when the delete button is clicked', required: true },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
