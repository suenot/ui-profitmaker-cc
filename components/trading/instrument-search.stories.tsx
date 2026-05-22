import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { InstrumentSearch, type Instrument } from './instrument-search'

const meta: Meta<typeof InstrumentSearch> = {
  title: 'Trading/InstrumentSearch',
  component: InstrumentSearch,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof InstrumentSearch>

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

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<Instrument | null>(null)
    return (
      <div className="w-96">
        <InstrumentSearch value={value} onChange={setValue} instruments={sampleInstruments} />
      </div>
    )
  },
}
