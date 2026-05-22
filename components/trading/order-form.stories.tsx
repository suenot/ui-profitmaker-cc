import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { OrderForm, type OrderSide, type OrderType, type OrderFormValues } from './order-form'

const meta: Meta<typeof OrderForm> = {
  title: 'Trading/OrderForm',
  component: OrderForm,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Uncontrolled: Story = {
  args: {
    symbol: 'BTC/USDT',
    onSubmit: (values: OrderFormValues) => console.log('submit', values),
  },
}

export const Controlled: Story = {
  render: () => {
    const [side, setSide] = useState<OrderSide>('buy')
    const [orderType, setOrderType] = useState<OrderType>('limit')
    const [price, setPrice] = useState(67235)
    const [amount, setAmount] = useState(0.5)
    return (
      <OrderForm
        symbol="ETH/USDT"
        side={side}
        onSideChange={setSide}
        orderType={orderType}
        onOrderTypeChange={setOrderType}
        price={price}
        onPriceChange={setPrice}
        amount={amount}
        onAmountChange={setAmount}
        onSubmit={(values) => console.log('submit', values)}
      />
    )
  },
}
