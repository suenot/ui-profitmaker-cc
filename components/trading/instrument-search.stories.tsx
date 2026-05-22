import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { InstrumentSearch, type Instrument } from './instrument-search'

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

const meta: Meta<typeof InstrumentSearch> = {
  title: 'Trading/InstrumentSearch',
  component: InstrumentSearch,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<Instrument | null>(null)
    return (
      <div className="w-96">
        <InstrumentSearch value={value} onSelect={setValue} instruments={sampleInstruments} />
      </div>
    )
  },
}

export const Preselected: Story = {
  render: () => {
    const [value, setValue] = useState<Instrument | null>(sampleInstruments[0])
    return (
      <div className="w-96">
        <InstrumentSearch value={value} onSelect={setValue} instruments={sampleInstruments} />
      </div>
    )
  },
}

export const LargeList: Story = {
  render: () => {
    const [value, setValue] = useState<Instrument | null>(null)
    const exchanges = ['binance', 'bybit', 'okx', 'kraken', 'kucoin']
    const bases = ['BTC', 'ETH', 'SOL', 'XRP', 'ADA', 'DOGE', 'AVAX', 'LINK', 'DOT', 'MATIC']
    const large: Instrument[] = []
    for (let i = 0; i < 100; i++) {
      const base = bases[i % bases.length]
      large.push({
        symbol: `${base}${i}/USDT`,
        name: base,
        exchange: exchanges[i % exchanges.length],
        type: i % 2 === 0 ? 'spot' : 'perp',
      })
    }
    return (
      <div className="w-96">
        <InstrumentSearch value={value} onSelect={setValue} instruments={large} placeholder="Search 1000 instruments..." />
      </div>
    )
  },
}
