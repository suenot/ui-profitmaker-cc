'use client'

import * as React from 'react'
import { OrderForm } from '@/components/trading/order-form'
import { DealsList, type Deal } from '@/components/trading/deals-list'
import { InstrumentSearch, type Instrument } from '@/components/trading/instrument-search'
import { TimeframeSelect } from '@/components/trading/timeframe-select'

const sampleInstruments: Instrument[] = [
  { account: 'main@binance', exchange: 'binance', market: 'spot', pair: 'BTC/USDT' },
  { account: 'main@binance', exchange: 'binance', market: 'spot', pair: 'ETH/USDT' },
  { account: 'main@binance', exchange: 'binance', market: 'futures', pair: 'BTC/USDT' },
  { account: 'pro@bybit', exchange: 'bybit', market: 'spot', pair: 'SOL/USDT' },
  { account: 'pro@bybit', exchange: 'bybit', market: 'futures', pair: 'ETH/USDT' },
  { account: 'arb@okx', exchange: 'okx', market: 'spot', pair: 'XRP/USDT' },
]

const sampleDeals: Deal[] = [
  {
    id: '1',
    name: 'BTC swing long',
    note: 'Breakout above range high',
    stocks: 0,
    coins: 2,
    pairs: 1,
    credited: 12840.0,
    credited_trades: 3,
    debited: 11200.0,
    debited_trades: 2,
    total: 1640.0,
    total_trades: 5,
    timestamp_open: '2026-05-18 09:12',
    timestamp_closed: '2026-05-20 14:48',
    duration: '2d 5h',
  },
  {
    id: '2',
    name: 'ETH scalp',
    note: 'Failed retest, stopped out',
    stocks: 0,
    coins: 1,
    pairs: 1,
    credited: 3120.0,
    credited_trades: 4,
    debited: 3460.0,
    debited_trades: 4,
    total: -340.0,
    total_trades: 8,
    timestamp_open: '2026-05-21 11:02',
    timestamp_closed: '2026-05-21 12:30',
    duration: '1h 28m',
  },
  {
    id: '3',
    name: 'SOL momentum',
    stocks: 0,
    coins: 3,
    pairs: 1,
    credited: 8900.0,
    credited_trades: 2,
    debited: 7450.0,
    debited_trades: 2,
    total: 1450.0,
    total_trades: 4,
    timestamp_open: '2026-05-19 16:40',
    timestamp_closed: '2026-05-22 08:15',
    duration: '2d 15h',
  },
]

export function TradingShowcase() {
  const [instrument, setInstrument] = React.useState<Instrument | null>(sampleInstruments[0])
  const [timeframe, setTimeframe] = React.useState('1h')

  const symbol = instrument?.pair ?? 'BTC/USDT'
  const exchange = instrument?.exchange ?? 'binance'
  const market = instrument?.market ?? 'spot'

  return (
    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Instrument toolbar + order form */}
      <div className="rounded-3xl border border-border bg-card/40 p-6 backdrop-blur-xl">
        <p className="mb-3 px-1 text-xs font-black uppercase tracking-widest text-muted-foreground">
          Instrument Search · Timeframe · Order Form
        </p>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="min-w-0 flex-1">
            <InstrumentSearch
              value={instrument}
              onChange={setInstrument}
              instruments={sampleInstruments}
            />
          </div>
          <TimeframeSelect value={timeframe} onChange={setTimeframe} />
        </div>
        <OrderForm
          symbol={symbol}
          exchange={exchange}
          market={market}
          available={1000}
          maxAmount={0.45}
          className="w-full"
        />
      </div>

      {/* Deals list */}
      <div className="rounded-3xl border border-border bg-card/40 p-4 backdrop-blur-xl">
        <p className="mb-3 px-2 text-xs font-black uppercase tracking-widest text-muted-foreground">
          Deals List
        </p>
        <div className="h-[520px] overflow-hidden rounded-xl border border-border">
          <DealsList
            deals={sampleDeals}
            onSelectDeal={() => {}}
            onAddDeal={() => {}}
            onEditDeal={() => {}}
            onDeleteDeal={() => {}}
          />
        </div>
      </div>
    </div>
  )
}
