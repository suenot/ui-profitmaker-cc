'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { InstrumentSearch, type Instrument } from '@/components/trading/instrument-search'

const previewCode = `import { useState } from 'react'
import { InstrumentSearch, type Instrument } from '@/components/trading/instrument-search'

const instruments: Instrument[] = [
  { symbol: 'BTC/USDT', name: 'Bitcoin', exchange: 'binance', type: 'spot' },
  { symbol: 'ETH/USDT', name: 'Ethereum', exchange: 'binance', type: 'spot' },
  { symbol: 'SOL/USDT', name: 'Solana', exchange: 'bybit', type: 'perp' },
]

export default function Example() {
  const [value, setValue] = useState<Instrument | null>(null)
  return <InstrumentSearch value={value} onSelect={setValue} instruments={instruments} />
}`

const sourceCode = `'use client'

import * as React from 'react'
import { useState, useMemo, useEffect, useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Instrument {
  symbol: string
  name?: string
  exchange?: string
  type?: string
}

export interface InstrumentSearchProps {
  value?: Instrument | null
  onSelect: (instrument: Instrument | null) => void
  instruments: Instrument[]
  placeholder?: string
  className?: string
}

// Virtualized instrument search with multi-word matching and keyboard navigation.
// See components/trading/instrument-search.tsx for the full implementation.`

const sampleInstruments: Instrument[] = [
  { symbol: 'BTC/USDT', name: 'Bitcoin', exchange: 'binance', type: 'spot' },
  { symbol: 'ETH/USDT', name: 'Ethereum', exchange: 'binance', type: 'spot' },
  { symbol: 'SOL/USDT', name: 'Solana', exchange: 'binance', type: 'spot' },
  { symbol: 'BTC/USDT', name: 'Bitcoin', exchange: 'bybit', type: 'perp' },
  { symbol: 'ETH/USDT', name: 'Ethereum', exchange: 'bybit', type: 'perp' },
  { symbol: 'XRP/USDT', name: 'Ripple', exchange: 'okx', type: 'spot' },
  { symbol: 'ADA/USDT', name: 'Cardano', exchange: 'okx', type: 'spot' },
  { symbol: 'DOGE/USDT', name: 'Dogecoin', exchange: 'kraken', type: 'spot' },
  { symbol: 'AVAX/USDT', name: 'Avalanche', exchange: 'coinbase', type: 'spot' },
  { symbol: 'LINK/USDT', name: 'Chainlink', exchange: 'kucoin', type: 'spot' },
]

export default function InstrumentSearchPage() {
  const [value, setValue] = useState<Instrument | null>(null)

  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Trading</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Instrument Search</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Virtualized search box for picking a trading instrument across exchanges. Supports multi-word
        matching against symbol, name, exchange, and type, plus full keyboard navigation.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="trading-instrumentsearch--default">
        <div className="w-96">
          <InstrumentSearch value={value} onSelect={setValue} instruments={sampleInstruments} />
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/trading/instrument-search.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'instruments', type: 'Instrument[]', description: 'List of instruments to search through', required: true },
        { name: 'onSelect', type: '(instrument: Instrument | null) => void', description: 'Called when an instrument is selected or cleared', required: true },
        { name: 'value', type: 'Instrument | null', description: 'Currently selected instrument' },
        { name: 'placeholder', type: 'string', defaultValue: "'Search symbol | name | exchange...'", description: 'Input placeholder' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
