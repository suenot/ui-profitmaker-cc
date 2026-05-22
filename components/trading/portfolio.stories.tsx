import type { Meta, StoryObj } from '@storybook/react'
import { Portfolio } from './portfolio'

const meta: Meta<typeof Portfolio> = {
  title: 'Trading/Portfolio',
  component: Portfolio,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const assets = [
  { name: 'BTC', value: 42150.0, change: 2.4 },
  { name: 'ETH', value: 18320.5, change: -1.1 },
  { name: 'SOL', value: 6240.75, change: 5.8 },
  { name: 'USDT', value: 12000.0, change: 0.0 },
]

export const Default: Story = {
  args: { assets, currency: 'USD' },
}

export const TwoAssets: Story = {
  args: {
    assets: [
      { name: 'BTC', value: 65000, change: 1.2 },
      { name: 'USDT', value: 35000, change: 0 },
    ],
    currency: 'USD',
  },
}
