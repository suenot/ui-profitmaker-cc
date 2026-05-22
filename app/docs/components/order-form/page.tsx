'use client'

import { Badge } from '@/components/ui/badge'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { OrderForm } from '@/components/trading/order-form'

const previewCode = `import { OrderForm } from '@/components/trading/order-form'

export default function Example() {
  return (
    <div className="w-80 rounded-md border border-border bg-card p-4">
      <OrderForm
        symbol="BTC/USDT"
        exchange="binance"
        market="spot"
        stepSize={0.0001}
        onSubmit={(values) => console.log(values)}
      />
    </div>
  )
}`

const sourceCode = `'use client'

import * as React from 'react'
import { ChevronDown, AlertCircle, CheckCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export type OrderType = 'market' | 'limit' | 'stop_loss'
export type OrderSide = 'buy' | 'sell'

export interface OrderFormValues {
  type: OrderType
  side: OrderSide
  price: number
  amount: number
  stopPrice: number
  stopLoss?: number
  takeProfit?: number
}

export interface OrderFormProps {
  symbol: string
  exchange?: string
  market?: string
  stepSize?: number
  available?: number
  maxAmount?: number
  minAmount?: number
  minPrice?: number
  onSubmit?: (values: OrderFormValues) => void
  className?: string
}

// Market/Limit/Stop tabs, price + quantity (with steppers) fields, advanced
// stop-loss/take-profit options, estimated cost & commission, and Buy/Sell
// buttons. State is local; emits onSubmit on a valid Buy/Sell click. Invalid
// fields show a red border and message after blur or submit (amount > 0 /
// >= minAmount; price > 0 / >= minPrice for limit & stop orders).`

export default function OrderFormPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Trading</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Order Form</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Order entry with Market/Limit/Stop tabs, price and quantity fields with steppers, advanced stop-loss/take-profit options,
        estimated cost and commission, and Buy/Sell buttons. Emits an <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">onSubmit</code> callback on a valid order.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="trading-orderform--default">
        <div className="w-80 rounded-md border border-border bg-card p-4">
          <OrderForm symbol="BTC/USDT" exchange="binance" market="spot" stepSize={0.0001} onSubmit={(values) => console.log(values)} />
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/trading/order-form.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'symbol', type: 'string', description: 'Trading pair, e.g. "BTC/USDT"', required: true },
        { name: 'exchange', type: 'string', defaultValue: "'binance'", description: 'Exchange name shown in the instrument header' },
        { name: 'market', type: 'string', defaultValue: "'spot'", description: 'Market type shown in the instrument header' },
        { name: 'stepSize', type: 'number', defaultValue: '0.00000001', description: 'Quantity increment used by the – / + steppers' },
        { name: 'available', type: 'number', description: 'Available balance; renders the Available/Max grid when set' },
        { name: 'maxAmount', type: 'number', description: 'Max order amount; renders the Available/Max grid when set' },
        { name: 'minAmount', type: 'number', description: 'Minimum order amount; amount below this fails validation' },
        { name: 'minPrice', type: 'number', description: 'Minimum price for limit/stop orders; price below this fails validation' },
        { name: 'onSubmit', type: '(values: OrderFormValues) => void', description: 'Called on a valid Buy/Sell click' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
