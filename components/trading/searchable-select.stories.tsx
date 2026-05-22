import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { SearchableSelect } from './searchable-select'

const meta: Meta<typeof SearchableSelect> = {
  title: 'Trading/SearchableSelect',
  component: SearchableSelect,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof SearchableSelect>

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

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('binance')
    return (
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
    )
  },
}

export const Loading: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div className="w-72">
        <SearchableSelect
          value={value}
          onValueChange={setValue}
          options={exchanges}
          loading
          placeholder="Loading..."
        />
      </div>
    )
  },
}
