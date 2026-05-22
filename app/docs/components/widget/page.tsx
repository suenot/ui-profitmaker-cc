'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { Widget } from '@/components/trading/widget'

const previewCode = `import { Widget } from '@/components/trading/widget'

export default function Example() {
  const [a, setA] = useState<string | undefined>('blue')
  const [b, setB] = useState<string | undefined>('blue')
  // Widgets sharing a group color are visually linked — the signature
  // profitmaker.cc workflow for syncing an instrument across panels.
  return (
    <div className="grid grid-cols-2 gap-4">
      <Widget title="Chart" instrument="BTC/USDT" groupId={a} onGroupChange={setA} className="h-80">…</Widget>
      <Widget title="Order Book" instrument="BTC/USDT" groupId={b} onGroupChange={setB} className="h-80">…</Widget>
    </div>
  )
}`

const sourceCode = `'use client'

import * as React from 'react'
import { Settings, Minus, Maximize2, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GroupColorSelector, DEFAULT_GROUPS, type Group } from './group-color-selector'

export interface WidgetProps {
  title: string
  children: React.ReactNode
  instrument?: string
  groups?: Group[]
  groupId?: string
  defaultGroupId?: string
  onGroupChange?: (groupId: string | undefined) => void
  showGroupSelector?: boolean
  onTitleChange?: (title: string) => void
  headerActions?: React.ReactNode
  onSettings?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
  onClose?: () => void
  className?: string
  contentClassName?: string
}

// Terminal panel shell, ported from profitmaker.cc. The group color shows in the
// header dot; picking a non-transparent group gives the header a subtle accent
// background. Double-click the title to rename it inline.`

function Demo() {
  const [a, setA] = useState<string | undefined>('blue')
  const [b, setB] = useState<string | undefined>('blue')
  return (
    <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
      <Widget title="Chart" instrument="BTC/USDT" groupId={a} onGroupChange={setA} className="h-80">
        <span className="text-xs text-muted-foreground">Linked to group A</span>
      </Widget>
      <Widget title="Order Book" instrument="BTC/USDT" groupId={b} onGroupChange={setB} className="h-80">
        <span className="text-xs text-muted-foreground">Linked to group A</span>
      </Widget>
    </div>
  )
}

export default function WidgetPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Trading</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Widget</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        A terminal panel shell with profitmaker.cc&apos;s signature feature: the colored{' '}
        <strong className="text-foreground font-bold">group dot</strong> in the header. Assign widgets to the same
        color group and they read as linked — the convention used to sync an instrument across multiple panels. Pick a
        color from any header dot, and <strong className="text-foreground font-bold">double-click a title</strong> to
        rename it.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="trading-widget--color-groups" previewClassName="items-start min-h-[480px]">
        <Demo />
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/trading/widget.tsx</code> (it imports <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">group-color-selector.tsx</code>)</p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'title', type: 'string', description: 'Header title', required: true },
        { name: 'children', type: 'ReactNode', description: 'Widget content', required: true },
        { name: 'instrument', type: 'string', description: 'Optional instrument label, e.g. "binance · BTC/USDT · spot"' },
        { name: 'groups', type: 'Group[]', defaultValue: 'DEFAULT_GROUPS', description: 'Available color groups' },
        { name: 'groupId', type: 'string', description: 'Selected group id (controlled with onGroupChange)' },
        { name: 'defaultGroupId', type: 'string', description: 'Initial group id when uncontrolled' },
        { name: 'onGroupChange', type: '(groupId?: string) => void', description: 'Called when the group color changes' },
        { name: 'showGroupSelector', type: 'boolean', defaultValue: 'true', description: 'Show the group color dot' },
        { name: 'headerActions', type: 'ReactNode', description: 'Extra controls in the header' },
        { name: 'onSettings / onMinimize / onClose', type: '() => void', description: 'Show the matching header action icon when provided' },
        { name: 'className', type: 'string', description: 'Classes for the widget shell' },
        { name: 'contentClassName', type: 'string', description: 'Classes for the content area' },
      ]} />
    </div>
  )
}
