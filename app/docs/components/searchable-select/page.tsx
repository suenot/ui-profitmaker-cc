'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { SearchableSelect } from '@/components/trading/searchable-select'

const previewCode = `import { useState } from 'react'
import { SearchableSelect } from '@/components/trading/searchable-select'

export default function Example() {
  const [value, setValue] = useState('binance')
  const exchanges = ['binance', 'bybit', 'okx', 'coinbase', 'kraken']

  return (
    <SearchableSelect
      value={value}
      onValueChange={setValue}
      options={exchanges}
      placeholder="Select exchange..."
      searchPlaceholder="Search exchanges..."
    />
  )
}`

const sourceCode = `'use client'

import * as React from 'react'
import { useState, useRef, useEffect, useMemo } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { ChevronDown, Search, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SearchableSelectProps {
  value: string
  onValueChange: (value: string) => void
  options: string[]
  placeholder?: string
  searchPlaceholder?: string
  loading?: boolean
  className?: string
  disabled?: boolean
  optionLabels?: Record<string, string>
}

// Single-select dropdown with built-in search and virtualization (>100 options).
// See components/trading/searchable-select.tsx for the full implementation.`

const exchanges = ['binance', 'bybit', 'okx', 'coinbase', 'kraken', 'kucoin', 'gateio', 'bitget']
const exchangeLabels: Record<string, string> = {
  binance: 'Binance',
  bybit: 'Bybit',
  okx: 'OKX',
  coinbase: 'Coinbase',
  kraken: 'Kraken',
  kucoin: 'KuCoin',
  gateio: 'Gate.io',
  bitget: 'Bitget',
}

export default function SearchableSelectPage() {
  const [value, setValue] = useState('binance')

  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Trading</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Searchable Select</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Single-select dropdown with built-in fuzzy search and automatic virtualization for large
        option lists (over 100 items). Ideal for picking exchanges, symbols, or any long list.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="trading-searchableselect--default">
        <div className="w-72">
          <SearchableSelect
            value={value}
            onValueChange={setValue}
            options={exchanges}
            optionLabels={exchangeLabels}
            placeholder="Select exchange..."
            searchPlaceholder="Search exchanges..."
          />
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/trading/searchable-select.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'value', type: 'string', description: 'Currently selected option', required: true },
        { name: 'onValueChange', type: '(value: string) => void', description: 'Called when an option is selected', required: true },
        { name: 'options', type: 'string[]', description: 'List of selectable option values', required: true },
        { name: 'optionLabels', type: 'Record<string, string>', description: 'Optional human-readable labels keyed by option value' },
        { name: 'placeholder', type: 'string', defaultValue: "'Select option...'", description: 'Trigger placeholder when nothing is selected' },
        { name: 'searchPlaceholder', type: 'string', defaultValue: "'Search options...'", description: 'Placeholder for the search input' },
        { name: 'loading', type: 'boolean', defaultValue: 'false', description: 'Show a loading spinner and disable interaction' },
        { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disable the control' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
