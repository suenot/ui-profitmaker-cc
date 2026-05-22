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
  { account: 'main@trade.io', exchange: 'binance', market: 'spot', pair: 'BTC/USDT' },
  { account: 'main@trade.io', exchange: 'binance', market: 'spot', pair: 'ETH/USDT' },
  { account: 'alt@trade.io', exchange: 'bybit', market: 'linear', pair: 'SOL/USDT' },
]

export default function Example() {
  const [value, setValue] = useState<Instrument | null>(null)
  return <InstrumentSearch value={value} onChange={setValue} instruments={instruments} />
}`

const sourceCode = `'use client'

import * as React from 'react'
import { useState, useMemo, useEffect, useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Instrument {
  account: string
  exchange: string
  market: string
  pair: string
}

export interface InstrumentSearchProps {
  value?: Instrument | null
  onChange: (instrument: Instrument | null) => void
  instruments: Instrument[]
  placeholder?: string
  className?: string
}

// Virtualized instrument search with multi-word matching (each word must match
// any of account/exchange/market/pair) and keyboard navigation. Shows each
// instrument as labeled Account/Exchange/Market/Pair lines with a results footer.
// See components/trading/instrument-search.tsx for the full implementation.`

const sampleInstruments: Instrument[] = [
  { account: 'main@trade.io', exchange: 'binance', market: 'spot', pair: 'BTC/USDT' },
  { account: 'main@trade.io', exchange: 'binance', market: 'spot', pair: 'ETH/USDT' },
  { account: 'main@trade.io', exchange: 'binance', market: 'spot', pair: 'SOL/USDT' },
  { account: 'alt@trade.io', exchange: 'bybit', market: 'linear', pair: 'BTC/USDT' },
  { account: 'alt@trade.io', exchange: 'bybit', market: 'linear', pair: 'ETH/USDT' },
  { account: 'alt@trade.io', exchange: 'okx', market: 'spot', pair: 'XRP/USDT' },
  { account: 'alt@trade.io', exchange: 'okx', market: 'spot', pair: 'ADA/USDT' },
  { account: 'fund@trade.io', exchange: 'kraken', market: 'spot', pair: 'DOGE/USDT' },
  { account: 'fund@trade.io', exchange: 'coinbase', market: 'spot', pair: 'AVAX/USDT' },
  { account: 'fund@trade.io', exchange: 'kucoin', market: 'spot', pair: 'LINK/USDT' },
]

export default function InstrumentSearchPage() {
  const [value, setValue] = useState<Instrument | null>(null)

  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Trading</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Instrument Search</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Virtualized search box for picking an account instrument across exchanges. Supports multi-word
        matching against account, exchange, market, and pair, plus full keyboard navigation.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="trading-instrumentsearch--default">
        <div className="w-96">
          <InstrumentSearch value={value} onChange={setValue} instruments={sampleInstruments} />
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/trading/instrument-search.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'instruments', type: 'Instrument[]', description: 'Instruments to search: { account, exchange, market, pair }', required: true },
        { name: 'onChange', type: '(instrument: Instrument | null) => void', description: 'Called when an instrument is selected or cleared', required: true },
        { name: 'value', type: 'Instrument | null', description: 'Currently selected instrument' },
        { name: 'placeholder', type: 'string', defaultValue: "'Search account | exchange | market | pair...'", description: 'Input placeholder' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
