'use client'

import * as React from 'react'
import { OrderForm } from '@/components/trading/order-form'
import { DealsList, type Deal } from '@/components/trading/deals-list'
import { InstrumentSearch, type Instrument } from '@/components/trading/instrument-search'
import { TimeframeSelect } from '@/components/trading/timeframe-select'
import { Widget } from '@/components/trading/widget'
import { OrderBook } from '@/components/trading/order-book'

const sampleBids = [
  { price: 67234.5, amount: 0.452 },
  { price: 67233.0, amount: 1.21 },
  { price: 67231.8, amount: 0.087 },
  { price: 67230.2, amount: 2.5 },
  { price: 67228.9, amount: 0.64 },
  { price: 67227.3, amount: 1.04 },
  { price: 67225.8, amount: 0.318 },
  { price: 67224.1, amount: 2.17 },
]
const sampleAsks = [
  { price: 67236.1, amount: 0.331 },
  { price: 67237.4, amount: 0.95 },
  { price: 67239.0, amount: 1.78 },
  { price: 67240.7, amount: 0.42 },
  { price: 67242.3, amount: 3.1 },
  { price: 67243.8, amount: 0.74 },
  { price: 67245.1, amount: 1.36 },
  { price: 67246.9, amount: 0.21 },
]

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

  const [chartGroup, setChartGroup] = React.useState<string | undefined>('blue')
  const [bookGroup, setBookGroup] = React.useState<string | undefined>('blue')
  const [pnlGroup, setPnlGroup] = React.useState<string | undefined>('orange')

  return (
    <div className="mt-8 space-y-8">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
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

    {/* Widget color groups — the signature profitmaker.cc feature */}
    <div className="rounded-3xl border border-border bg-card/40 p-6 backdrop-blur-xl">
      <p className="mb-1 px-1 text-xs font-black uppercase tracking-widest text-muted-foreground">
        Widget Groups
      </p>
      <p className="mb-4 px-1 text-sm text-muted-foreground font-light">
        Click a header dot to assign a color group. Widgets sharing a color are linked — the convention
        for syncing one instrument across panels. Two of these share blue.
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Widget title="Chart" instrument="BTC/USDT" groupId={chartGroup} onGroupChange={setChartGroup} className="h-56" onSettings={() => {}} onClose={() => {}}>
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">Price chart</div>
        </Widget>
        <Widget title="Order Book" instrument="BTC/USDT" groupId={bookGroup} onGroupChange={setBookGroup} className="h-56" contentClassName="p-0" onSettings={() => {}} onClose={() => {}}>
          <OrderBook bids={sampleBids} asks={sampleAsks} priceDecimals={1} amountDecimals={3} rowsVisible={6} />
        </Widget>
        <Widget title="PnL" instrument="ETH/USDT" groupId={pnlGroup} onGroupChange={setPnlGroup} className="h-56" onSettings={() => {}} onClose={() => {}}>
          <div className="flex h-full flex-col items-center justify-center">
            <span className="text-2xl font-black text-green-400">+12.4%</span>
            <span className="text-xs text-muted-foreground">this month</span>
          </div>
        </Widget>
      </div>
    </div>
    </div>
  )
}
