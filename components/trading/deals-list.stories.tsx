import type { Meta, StoryObj } from '@storybook/react'
import { DealsList } from './deals-list'

const meta: Meta<typeof DealsList> = {
  title: 'Trading/DealsList',
  component: DealsList,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof DealsList>

const noop = () => {}

export const Default: Story = {
  args: {
    deals: [
      {
        id: '1',
        name: 'BTC Swing',
        note: 'Held through the weekly close',
        stocks: 0,
        coins: 2,
        pairs: 1,
        credited: 134470,
        credited_trades: 3,
        debited: 128400,
        debited_trades: 2,
        total: 6070,
        total_trades: 5,
        timestamp_open: '2026-05-01 09:12',
        timestamp_closed: '2026-05-08 17:40',
        duration: '7d 8h',
      },
      {
        id: '2',
        name: 'ETH Scalp',
        stocks: 0,
        coins: 10,
        pairs: 1,
        credited: 35200,
        credited_trades: 4,
        debited: 36100,
        debited_trades: 4,
        total: -900,
        total_trades: 8,
        timestamp_open: '2026-05-10 11:00',
        timestamp_closed: '2026-05-10 14:25',
        duration: '3h 25m',
      },
      {
        id: '3',
        name: 'SOL Position',
        note: 'Scaling in',
        stocks: 0,
        coins: 120,
        pairs: 1,
        credited: 18200,
        credited_trades: 2,
        debited: 17800,
        debited_trades: 1,
        total: 400,
        total_trades: 3,
        timestamp_open: '2026-05-15 08:00',
        timestamp_closed: '2026-05-18 19:30',
        duration: '3d 11h',
      },
    ],
    onSelectDeal: noop,
    onAddDeal: noop,
    onEditDeal: noop,
    onDeleteDeal: noop,
  },
}

export const Empty: Story = {
  args: {
    deals: [],
    onSelectDeal: noop,
    onAddDeal: noop,
    onEditDeal: noop,
    onDeleteDeal: noop,
  },
}
