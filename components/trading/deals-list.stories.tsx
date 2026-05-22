import type { Meta, StoryObj } from '@storybook/react'
import { DealsList } from './deals-list'

const meta: Meta<typeof DealsList> = {
  title: 'Trading/DealsList',
  component: DealsList,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const deals = [
  { id: '1', symbol: 'BTC/USDT', side: 'long' as const, entryPrice: 64200, exitPrice: 67235, pnl: 3035, status: 'closed' as const },
  { id: '2', symbol: 'ETH/USDT', side: 'short' as const, entryPrice: 3520, exitPrice: 3610, pnl: -90, status: 'closed' as const },
  { id: '3', symbol: 'SOL/USDT', side: 'long' as const, entryPrice: 148.2, status: 'open' as const },
  { id: '4', symbol: 'BNB/USDT', side: 'long' as const, entryPrice: 580, exitPrice: 612, pnl: 32, status: 'closed' as const },
]

export const Default: Story = {
  args: {
    deals,
    onSelectDeal: (id: string) => console.log('select', id),
    onDeleteDeal: (id: string) => console.log('delete', id),
  },
}

export const Empty: Story = {
  args: { deals: [] },
}
