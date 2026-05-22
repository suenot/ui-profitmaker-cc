'use client'

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

export function OrderForm({
  symbol,
  side: sideProp,
  onSideChange,
  orderType: typeProp,
  onOrderTypeChange,
  price: priceProp,
  onPriceChange,
  amount: amountProp,
  onAmountChange,
  onSubmit,
  className,
}: OrderFormProps) {
  const [sideState, setSideState] = React.useState<OrderSide>('buy')
  const [typeState, setTypeState] = React.useState<OrderType>('limit')
  const [priceState, setPriceState] = React.useState<number>(0)
  const [amountState, setAmountState] = React.useState<number>(0)

  const side = sideProp ?? sideState
  const type = typeProp ?? typeState
  const price = priceProp ?? priceState
  const amount = amountProp ?? amountState

  const [base, quote] = symbol.split('/')

  const setSide = (s: OrderSide) => (onSideChange ? onSideChange(s) : setSideState(s))
  const setType = (t: OrderType) => (onOrderTypeChange ? onOrderTypeChange(t) : setTypeState(t))
  const setPrice = (p: number) => (onPriceChange ? onPriceChange(p) : setPriceState(p))
  const setAmount = (a: number) => (onAmountChange ? onAmountChange(a) : setAmountState(a))

  const total = (type === 'market' ? 0 : price) * amount
  const error =
    amount <= 0
      ? 'Enter an amount'
      : type === 'limit' && price <= 0
      ? 'Enter a price'
      : null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (error) return
    onSubmit?.({ side, type, price, amount })
  }

  const inputClass =
    'w-full rounded-xl border border-border bg-card/50 px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-accent'

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('flex w-full max-w-xs flex-col gap-4 rounded-2xl border border-border bg-card/40 p-5 text-foreground', className)}
    >
      <div className="grid grid-cols-2 gap-1 rounded-xl bg-muted/30 p-1">
        {(['buy', 'sell'] as OrderSide[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSide(s)}
            className={cn(
              'rounded-lg py-2 text-sm font-bold uppercase tracking-widest transition-colors',
              side === s
                ? s === 'buy'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-red-500/20 text-red-400'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        {(['limit', 'market'] as OrderType[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={cn(
              'flex-1 rounded-lg border py-1.5 text-xs font-bold uppercase tracking-widest transition-colors',
              type === t
                ? 'border-accent text-accent-darker'
                : 'border-border text-muted-foreground hover:text-foreground'
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs uppercase tracking-widest text-muted-foreground">
          Price {quote ? `(${quote})` : ''}
        </label>
        <input
          type="number"
          inputMode="decimal"
          className={inputClass}
          value={type === 'market' ? '' : price || ''}
          placeholder={type === 'market' ? 'Market' : '0.00'}
          disabled={type === 'market'}
          onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs uppercase tracking-widest text-muted-foreground">
          Amount {base ? `(${base})` : ''}
        </label>
        <input
          type="number"
          inputMode="decimal"
          className={inputClass}
          value={amount || ''}
          placeholder="0.00"
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Total</span>
        <span className="font-mono">
          {total > 0 ? total.toFixed(2) : '—'} {quote}
        </span>
      </div>

      <button
        type="submit"
        disabled={!!error}
        className={cn(
          'rounded-xl py-2.5 text-sm font-bold uppercase tracking-widest text-white transition-all disabled:cursor-not-allowed disabled:opacity-50',
          side === 'buy' ? 'bg-green-600 hover:bg-green-500' : 'bg-red-600 hover:bg-red-500'
        )}
      >
        {side === 'buy' ? `Buy ${base ?? ''}` : `Sell ${base ?? ''}`}
      </button>
    </form>
  )
}
