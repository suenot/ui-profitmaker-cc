import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { SearchableSelect } from './searchable-select'

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

const meta: Meta<typeof SearchableSelect> = {
  title: 'Trading/SearchableSelect',
  component: SearchableSelect,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

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

export const Empty: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div className="w-72">
        <SearchableSelect
          value={value}
          onValueChange={setValue}
          options={exchanges}
          optionLabels={exchangeLabels}
          placeholder="Select exchange..."
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
        <SearchableSelect value={value} onValueChange={setValue} options={[]} loading placeholder="Loading exchanges..." />
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <div className="w-72">
      <SearchableSelect value="binance" onValueChange={() => {}} options={exchanges} optionLabels={exchangeLabels} disabled />
    </div>
  ),
}

export const LargeVirtualized: Story = {
  render: () => {
    const [value, setValue] = useState('')
    const options = Array.from({ length: 500 }, (_, i) => `SYMBOL${i + 1}/USDT`)
    return (
      <div className="w-72">
        <SearchableSelect
          value={value}
          onValueChange={setValue}
          options={options}
          placeholder="Select pair..."
          searchPlaceholder="Search 500 pairs..."
        />
      </div>
    )
  },
}
