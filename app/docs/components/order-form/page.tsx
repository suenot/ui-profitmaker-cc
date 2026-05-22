'use client'

import { Badge } from '@/components/ui/badge'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { OrderForm } from '@/components/trading/order-form'

const previewCode = `import { OrderForm } from '@/components/trading/order-form'

export default function Example() {
  return (
    <OrderForm
      symbol="BTC/USDT"
      onSubmit={(values) => console.log(values)}
    />
  )
}`

const sourceCode = `'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export type OrderSide = 'buy' | 'sell'
export type OrderType = 'limit' | 'market'

export interface OrderFormValues {
  side: OrderSide
  type: OrderType
  price: number
  amount: number
}

export interface OrderFormProps {
  symbol: string
  side?: OrderSide
  onSideChange?: (side: OrderSide) => void
  orderType?: OrderType
  onOrderTypeChange?: (type: OrderType) => void
  price?: number
  onPriceChange?: (price: number) => void
  amount?: number
  onAmountChange?: (amount: number) => void
  onSubmit?: (values: OrderFormValues) => void
  className?: string
}

// Works controlled (pass value + onChange) or uncontrolled (internal state).
// Buy/sell tabs, limit/market toggle, computed total, and local validation.`

export default function OrderFormPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Trading</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Order Form</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Buy/sell order entry with limit/market toggle, price and amount fields, and a computed total. Works controlled or
        uncontrolled and emits an <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">onSubmit</code> callback.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="trading-orderform--uncontrolled">
        <OrderForm symbol="BTC/USDT" onSubmit={(values) => console.log(values)} />
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/trading/order-form.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'symbol', type: 'string', description: 'Trading pair, e.g. "BTC/USDT"', required: true },
        { name: 'side', type: "'buy' | 'sell'", description: 'Controlled side; omit for internal state' },
        { name: 'onSideChange', type: '(side) => void', description: 'Called when the side tab changes' },
        { name: 'orderType', type: "'limit' | 'market'", description: 'Controlled order type' },
        { name: 'onOrderTypeChange', type: '(type) => void', description: 'Called when the order type changes' },
        { name: 'price', type: 'number', description: 'Controlled price value' },
        { name: 'onPriceChange', type: '(price) => void', description: 'Called when the price input changes' },
        { name: 'amount', type: 'number', description: 'Controlled amount value' },
        { name: 'onAmountChange', type: '(amount) => void', description: 'Called when the amount input changes' },
        { name: 'onSubmit', type: '(values: OrderFormValues) => void', description: 'Called on valid submit' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
