'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { GroupColorSelector, DEFAULT_GROUPS, type Group } from '@/components/trading/group-color-selector'

const groups: Group[] = DEFAULT_GROUPS.map((g) =>
  g.id === 'blue'
    ? { ...g, account: 'main@trade.io', exchange: 'binance', market: 'spot', tradingPair: 'BTC/USDT' }
    : g,
)

const previewCode = `import { GroupColorSelector } from '@/components/trading/group-color-selector'

export default function Example() {
  const [groupId, setGroupId] = useState<string | undefined>('blue')
  return <GroupColorSelector value={groupId} onChange={setGroupId} />
}`

const sourceCode = `'use client'

import * as React from 'react'
import { Plus, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Group {
  id: string
  name: string
  color: string // hex or 'transparent'
  account?: string
  exchange?: string
  market?: string
  tradingPair?: string
}

export const GROUP_COLORS = ['transparent','#00BCD4','#F44336','#9C27B0','#2196F3','#4CAF50','#FF9800','#E91E63'] as const

export interface GroupColorSelectorProps {
  value?: string
  onChange: (groupId: string | undefined) => void
  groups?: Group[]
  onResetGroup?: (groupId: string) => void
  className?: string
}

// A small colored dot that opens a popover of color groups. Configured groups
// (with an account / exchange / market / pair) show their instrument details.`

function Demo() {
  const [groupId, setGroupId] = useState<string | undefined>('blue')
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
      <GroupColorSelector value={groupId} onChange={setGroupId} groups={groups} />
      <span className="text-sm text-muted-foreground">
        Selected group: <span className="font-medium text-foreground">{groupId ?? 'none'}</span>
      </span>
    </div>
  )
}

export default function GroupColorSelectorPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Trading</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Group Color Selector</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        The colored dot powering profitmaker.cc widget groups. Click it to assign a color group; configured groups
        surface their account, exchange, market, and pair. Used inside{' '}
        <a href="/docs/components/widget" className="text-accent-darker hover:underline">Widget</a> headers.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="trading-groupcolorselector--with-configured-group" previewClassName="items-start min-h-[320px]">
        <Demo />
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/trading/group-color-selector.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'value', type: 'string', description: 'Selected group id' },
        { name: 'onChange', type: '(groupId?: string) => void', description: 'Called when a group is picked', required: true },
        { name: 'groups', type: 'Group[]', defaultValue: 'DEFAULT_GROUPS', description: 'Groups to choose from (8 default colors)' },
        { name: 'onResetGroup', type: '(groupId: string) => void', description: 'When provided, configured groups show a reset (×) button' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
