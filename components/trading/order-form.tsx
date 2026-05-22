'use client'

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
  onSubmit?: (values: OrderFormValues) => void
  className?: string
}

function formatVolume(volume: number): string {
  if (volume >= 1000000) return (volume / 1000000).toFixed(2) + 'M'
  if (volume >= 1000) return (volume / 1000).toFixed(2) + 'K'
  return volume.toFixed(2)
}

interface OrderResponse {
  success: boolean
  orderId?: string
  error?: string
}

export function OrderForm({
  symbol,
  exchange = 'binance',
  market = 'spot',
  stepSize = 0.00000001,
  available,
  maxAmount,
  onSubmit,
  className,
}: OrderFormProps) {
  const [formData, setFormData] = React.useState({
    type: 'limit' as OrderType,
    side: 'buy' as OrderSide,
    price: 0,
    amount: 0,
    stopPrice: 0,
  })
  const [isAdvancedMode, setIsAdvancedMode] = React.useState(false)
  const [advancedOptions, setAdvancedOptions] = React.useState<{
    stopLoss: { enabled: boolean; price?: number }
    takeProfit: { enabled: boolean; price?: number }
  }>({
    stopLoss: { enabled: false },
    takeProfit: { enabled: false },
  })
  const [lastOrderResponse, setLastOrderResponse] = React.useState<OrderResponse | null>(null)

  const baseCurrency = symbol.split('/')[0] || ''
  const quoteCurrency = symbol.split('/')[1] || ''

  const estimatedCost = React.useMemo(() => {
    if (formData.type === 'market') return 0
    return formData.price * formData.amount
  }, [formData.type, formData.price, formData.amount])

  const commission = React.useMemo(() => estimatedCost * 0.001, [estimatedCost])

  const isFormValid =
    formData.amount > 0 &&
    (formData.type === 'market' ||
      (formData.type === 'limit' && formData.price > 0) ||
      (formData.type === 'stop_loss' && formData.stopPrice > 0))

  const handleQuantityAdjust = (delta: number) => {
    const newAmount = Math.max(0, formData.amount + delta * stepSize)
    setFormData((prev) => ({ ...prev, amount: newAmount }))
  }

  const handleSubmit = (side: OrderSide) => {
    if (!isFormValid) return
    setFormData((prev) => ({ ...prev, side }))
    const values: OrderFormValues = {
      type: formData.type,
      side,
      price: formData.price,
      amount: formData.amount,
      stopPrice: formData.stopPrice,
      stopLoss: advancedOptions.stopLoss.enabled ? advancedOptions.stopLoss.price : undefined,
      takeProfit: advancedOptions.takeProfit.enabled ? advancedOptions.takeProfit.price : undefined,
    }
    onSubmit?.(values)
    setLastOrderResponse({ success: true, orderId: `ORD-${Date.now()}` })
  }

  return (
    <div className={cn('h-full flex flex-col', className)}>
      {/* Instrument display */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center px-4 py-2 bg-muted/30 rounded-md flex-1">
          <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-sm mr-2 text-white">
            {baseCurrency.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{symbol}</span>
            <span className="text-xs flex items-center text-muted-foreground">
              {exchange} • {market}
            </span>
          </div>
        </div>
      </div>

      {/* Order type tabs */}
      <div className="mb-4">
        <div className="flex border-b border-border">
          {(['market', 'limit', 'stop_loss'] as OrderType[]).map((type) => (
            <button
              key={type}
              type="button"
              className={cn(
                'flex-1 py-2 text-sm font-medium',
                formData.type === type
                  ? 'border-b-2 border-blue-500 text-blue-400'
                  : 'text-muted-foreground hover:text-foreground',
              )}
              onClick={() => setFormData((prev) => ({ ...prev, type }))}
            >
              {type === 'stop_loss' ? 'Stop' : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <form className="space-y-4 flex-grow overflow-y-auto" onSubmit={(e) => e.preventDefault()}>
        {/* Price field */}
        {(formData.type === 'limit' || formData.type === 'stop_loss') && (
          <div>
            <label className="block text-sm text-muted-foreground mb-1">
              {formData.type === 'stop_loss' ? 'Stop Price' : 'Execution Price'}
            </label>
            <div className="relative">
              <input
                type="number"
                step={stepSize}
                className="w-full bg-muted/30 border border-border rounded-md py-2 px-3 text-sm"
                value={formData.type === 'stop_loss' ? formData.stopPrice || '' : formData.price || ''}
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0
                  setFormData((prev) =>
                    formData.type === 'stop_loss' ? { ...prev, stopPrice: value } : { ...prev, price: value },
                  )
                }}
                placeholder={`Enter ${formData.type === 'stop_loss' ? 'stop' : 'limit'} price`}
              />
            </div>
          </div>
        )}

        {formData.type === 'market' && (
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Execution Price</label>
            <div className="w-full bg-muted/20 border border-border rounded-md py-2 px-3 text-sm">Market Price</div>
          </div>
        )}

        {/* Quantity field */}
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm text-muted-foreground">Quantity</label>
            <div className="flex items-center">
              <span className="text-xs mr-1">×{stepSize}</span>
              <ChevronDown size={14} className="text-muted-foreground" />
            </div>
          </div>
          <div className="relative flex items-center">
            <input
              type="number"
              step={stepSize}
              className="w-full bg-muted/30 border border-border rounded-md py-2 px-3 pr-16 text-sm"
              value={formData.amount || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
              placeholder="Min: 0"
            />
            <div className="absolute right-0 h-full flex">
              <button
                type="button"
                className="px-3 py-2 text-muted-foreground border-l border-border hover:bg-muted/30 transition-colors"
                onClick={() => handleQuantityAdjust(-1)}
              >
                –
              </button>
              <button
                type="button"
                className="px-3 py-2 text-muted-foreground border-l border-border hover:bg-muted/30 transition-colors"
                onClick={() => handleQuantityAdjust(1)}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Advanced Options Toggle */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setIsAdvancedMode((prev) => !prev)}
            className={cn(
              'text-xs px-3 py-1 rounded-md transition-colors',
              isAdvancedMode
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'text-muted-foreground hover:text-foreground border border-border hover:border-muted',
            )}
          >
            {isAdvancedMode ? 'Hide Advanced' : 'Show Advanced'}
          </button>
        </div>

        {/* Advanced options */}
        {isAdvancedMode && (
          <div className="space-y-3 p-3 bg-muted/10 rounded-md">
            <h4 className="text-sm font-medium text-foreground mb-2">Advanced Options</h4>

            {/* Stop Loss */}
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="stopLoss"
                  checked={advancedOptions.stopLoss.enabled}
                  onChange={(e) =>
                    setAdvancedOptions((prev) => ({
                      ...prev,
                      stopLoss: { ...prev.stopLoss, enabled: e.target.checked },
                    }))
                  }
                  className="mr-2"
                />
                <label htmlFor="stopLoss" className="text-sm text-foreground">
                  Stop Loss
                </label>
              </div>
              {advancedOptions.stopLoss.enabled && (
                <input
                  type="number"
                  placeholder="Stop loss price"
                  value={advancedOptions.stopLoss.price || ''}
                  onChange={(e) =>
                    setAdvancedOptions((prev) => ({
                      ...prev,
                      stopLoss: { ...prev.stopLoss, price: parseFloat(e.target.value) || undefined },
                    }))
                  }
                  className="w-full bg-muted/30 border border-border rounded-md py-1 px-2 text-sm"
                />
              )}
            </div>

            {/* Take Profit */}
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="takeProfit"
                  checked={advancedOptions.takeProfit.enabled}
                  onChange={(e) =>
                    setAdvancedOptions((prev) => ({
                      ...prev,
                      takeProfit: { ...prev.takeProfit, enabled: e.target.checked },
                    }))
                  }
                  className="mr-2"
                />
                <label htmlFor="takeProfit" className="text-sm text-foreground">
                  Take Profit
                </label>
              </div>
              {advancedOptions.takeProfit.enabled && (
                <input
                  type="number"
                  placeholder="Take profit price"
                  value={advancedOptions.takeProfit.price || ''}
                  onChange={(e) =>
                    setAdvancedOptions((prev) => ({
                      ...prev,
                      takeProfit: { ...prev.takeProfit, price: parseFloat(e.target.value) || undefined },
                    }))
                  }
                  className="w-full bg-muted/30 border border-border rounded-md py-1 px-2 text-sm"
                />
              )}
            </div>
          </div>
        )}

        {/* Estimated Cost */}
        <div>
          <label className="block text-sm text-muted-foreground mb-1">Estimated Cost</label>
          <div className="w-full bg-muted/20 border border-border rounded-md py-2 px-3 text-sm">
            {estimatedCost > 0 ? `${formatVolume(estimatedCost)} ${quoteCurrency}` : '—'}
          </div>
        </div>

        {/* Commission */}
        <div>
          <label className="block text-sm text-muted-foreground mb-1">Commission</label>
          <div className="w-full bg-muted/20 border border-border rounded-md py-2 px-3 text-sm">
            {commission > 0 ? `~${formatVolume(commission)} ${quoteCurrency}` : 'Calculated on execution'}
          </div>
        </div>

        {/* Balance info */}
        {(available !== undefined || maxAmount !== undefined) && (
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Available</div>
              <div className="flex justify-between text-xs">
                <span>{formatVolume(available ?? 0)}</span>
                <span>{quoteCurrency}</span>
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Max Amount</div>
              <div className="flex justify-between text-xs">
                <span>{formatVolume(maxAmount ?? 0)}</span>
                <span>{baseCurrency}</span>
              </div>
            </div>
          </div>
        )}

        {/* Order Response */}
        {lastOrderResponse && (
          <div
            className={cn(
              'p-3 rounded-md mb-4',
              lastOrderResponse.success
                ? 'bg-green-500/20 border border-green-500/30'
                : 'bg-red-500/20 border border-red-500/30',
            )}
          >
            <div className="flex items-center">
              {lastOrderResponse.success ? (
                <CheckCircle size={16} className="text-green-400 mr-2" />
              ) : (
                <AlertCircle size={16} className="text-red-400 mr-2" />
              )}
              <span
                className={cn(
                  'text-sm font-medium',
                  lastOrderResponse.success ? 'text-green-400' : 'text-red-400',
                )}
              >
                {lastOrderResponse.success ? 'Order Placed Successfully' : 'Order Failed'}
              </span>
              <button
                type="button"
                onClick={() => setLastOrderResponse(null)}
                className="ml-auto p-1 rounded hover:bg-white/10"
              >
                <X size={14} />
              </button>
            </div>
            {lastOrderResponse.orderId && (
              <p className="text-xs text-muted-foreground mt-1">Order ID: {lastOrderResponse.orderId}</p>
            )}
            {lastOrderResponse.error && <p className="text-xs text-red-300 mt-1">{lastOrderResponse.error}</p>}
          </div>
        )}

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3 mt-auto pt-4">
          <button
            type="button"
            disabled={!isFormValid}
            className="w-full py-2.5 rounded-md font-medium bg-green-500 hover:bg-green-500/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white"
            onClick={() => handleSubmit('buy')}
          >
            Buy {baseCurrency}
          </button>
          <button
            type="button"
            disabled={!isFormValid}
            className="w-full py-2.5 rounded-md font-medium bg-red-500 hover:bg-red-500/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white"
            onClick={() => handleSubmit('sell')}
          >
            Sell {baseCurrency}
          </button>
        </div>
      </form>
    </div>
  )
}
