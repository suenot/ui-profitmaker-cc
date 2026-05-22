import type { Meta, StoryObj } from '@storybook/react'
import { OrderBook } from './order-book'

const meta: Meta<typeof OrderBook> = {
  title: 'Trading/OrderBook',
  component: OrderBook,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const bids = [
  { price: 67234.5, amount: 0.452 },
  { price: 67233.0, amount: 1.21 },
  { price: 67231.8, amount: 0.087 },
  { price: 67230.2, amount: 2.5 },
  { price: 67228.9, amount: 0.64 },
]

const asks = [
  { price: 67236.1, amount: 0.331 },
  { price: 67237.4, amount: 0.95 },
  { price: 67239.0, amount: 1.78 },
  { price: 67240.7, amount: 0.42 },
  { price: 67242.3, amount: 3.1 },
]

export const Default: Story = {
  args: { bids, asks, priceDecimals: 1, amountDecimals: 3 },
}
