import type { Meta, StoryObj } from '@storybook/react'
import { OrderForm } from './order-form'

const meta: Meta<typeof OrderForm> = {
  title: 'Trading/OrderForm',
  component: OrderForm,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-80 rounded-md border border-border bg-card p-4">
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof OrderForm>

export const Default: Story = {
  args: {
    symbol: 'BTC/USDT',
    exchange: 'binance',
    market: 'spot',
    stepSize: 0.0001,
    onSubmit: (values) => console.log(values),
  },
}

export const WithBalance: Story = {
  args: {
    symbol: 'ETH/USDT',
    exchange: 'binance',
    market: 'futures',
    stepSize: 0.001,
    available: 1000,
    maxAmount: 0.5,
    onSubmit: (values) => console.log(values),
  },
}

export const ValidationErrors: Story = {
  args: {
    symbol: 'BTC/USDT',
    exchange: 'binance',
    market: 'spot',
    stepSize: 0.0001,
    minAmount: 0.01,
    minPrice: 1,
    onSubmit: (values) => console.log(values),
  },
  play: async ({ canvasElement }) => {
    const buyButton = canvasElement.querySelector('button.bg-green-500') as HTMLButtonElement | null
    buyButton?.click()
  },
}
