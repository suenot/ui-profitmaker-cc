import type { Meta, StoryObj } from '@storybook/react'
import { OrderBook } from './order-book'

const meta: Meta<typeof OrderBook> = {
  title: 'Trading/OrderBook',
  component: OrderBook,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-72 rounded-md border border-border bg-card">
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof OrderBook>

const bids = [
  { price: 67234.5, amount: 0.452 },
  { price: 67233.0, amount: 1.21 },
  { price: 67231.8, amount: 0.087 },
  { price: 67230.2, amount: 2.5 },
  { price: 67228.9, amount: 0.64 },
  { price: 67227.3, amount: 1.04 },
  { price: 67225.8, amount: 0.318 },
  { price: 67224.1, amount: 2.17 },
  { price: 67222.6, amount: 0.55 },
  { price: 67221.0, amount: 1.62 },
  { price: 67219.4, amount: 0.92 },
  { price: 67217.9, amount: 3.41 },
]

const asks = [
  { price: 67236.1, amount: 0.331 },
  { price: 67237.4, amount: 0.95 },
  { price: 67239.0, amount: 1.78 },
  { price: 67240.7, amount: 0.42 },
  { price: 67242.3, amount: 3.1 },
  { price: 67243.8, amount: 0.74 },
  { price: 67245.1, amount: 1.36 },
  { price: 67246.9, amount: 0.21 },
  { price: 67248.2, amount: 2.05 },
  { price: 67250.0, amount: 0.88 },
  { price: 67251.7, amount: 1.19 },
  { price: 67253.4, amount: 0.47 },
]

export const Default: Story = {
  args: { bids, asks, priceDecimals: 1, amountDecimals: 3 },
}

export const Cumulative: Story = {
  args: { bids, asks, priceDecimals: 1, amountDecimals: 3, showCumulative: true },
}
