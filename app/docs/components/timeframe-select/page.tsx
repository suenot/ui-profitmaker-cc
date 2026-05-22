'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { TimeframeSelect } from '@/components/trading/timeframe-select'

const previewCode = `import { useState } from 'react'
import { TimeframeSelect } from '@/components/trading/timeframe-select'

export default function Example() {
  const [value, setValue] = useState('1h')
  return <TimeframeSelect value={value} onChange={setValue} />
}`

const sourceCode = `'use client'

import * as React from 'react'
import { useMemo } from 'react'
import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

export type TimeframeOption = string | { value: string; label: string }

export interface TimeframeSelectProps {
  value: string
  onChange: (timeframe: string) => void
  timeframes?: TimeframeOption[]
  className?: string
}

const DEFAULT_TIMEFRAMES: string[] = ['1m', '5m', '15m', '1h', '4h', '1d', '1w']

// Compact timeframe picker for charts. Defaults to a standard CCXT timeframe set.
// See components/trading/timeframe-select.tsx for the full implementation.`

export default function TimeframeSelectPage() {
  const [value, setValue] = useState('1h')

  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Trading</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Timeframe Select</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Compact timeframe picker for chart toolbars. Ships with a standard set of CCXT timeframes and
        accepts a custom list of plain strings or labeled options.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="trading-timeframeselect--default">
        <TimeframeSelect value={value} onChange={setValue} />
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/trading/timeframe-select.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'value', type: 'string', description: 'Currently selected timeframe', required: true },
        { name: 'onChange', type: '(timeframe: string) => void', description: 'Called when the timeframe changes', required: true },
        { name: 'timeframes', type: "(string | { value: string; label: string })[]", defaultValue: "['1m','5m','15m','1h','4h','1d','1w']", description: 'Available timeframes' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
