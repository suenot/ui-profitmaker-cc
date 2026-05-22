import type { Meta, StoryObj } from '@storybook/react'
import { Portfolio } from './portfolio'

const meta: Meta<typeof Portfolio> = {
  title: 'Trading/Portfolio',
  component: Portfolio,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="h-screen w-full max-w-4xl mx-auto p-6">
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof Portfolio>

export const Default: Story = {
  args: {
    title: 'Balance',
    subtitle: 'Trading Portfolio',
    todayChange: { value: '8 248,37 ₽', percent: '0,06%' },
    allTimeChange: { value: '2 193 536,03 ₽', percent: '19,56%' },
    categories: [
      {
        id: 'currency',
        name: 'Currency and Metals',
        total: '1 110,73 ₽',
        share: '0,01%',
        items: [
          { symbol: 'RUB', name: 'Russian Ruble', quantity: '1 026,85', price: '', avg: '', value: '1 026,85 ₽', share: '0,01%', profit: '', profitPercent: '' },
          { symbol: 'EUR', name: 'Euro', quantity: '0,72', price: '93,6650 ₽', avg: '79,0475 ₽', value: '67,44 ₽', share: '≈0,00%', profit: '10,52 ₽', profitPercent: '18,49%' },
          { symbol: 'USD', name: 'US Dollar', quantity: '0,19', price: '86,5675 ₽', avg: '91,8200 ₽', value: '16,45 ₽', share: '≈0,00%', profit: '-1,00 ₽', profitPercent: '-5,72%' },
        ],
      },
      {
        id: 'funds',
        name: 'Funds',
        total: '13 404 600,00 ₽',
        share: '99,99%',
        items: [
          { symbol: 'LQDT', name: 'LQDT', quantity: '8 250 000', price: '1,6248 ₽', avg: '1,3589 ₽', value: '13 404 600,00 ₽', share: '99,99%', profit: '2 193 526,50 ₽', profitPercent: '19,57%' },
        ],
      },
    ],
  },
}
