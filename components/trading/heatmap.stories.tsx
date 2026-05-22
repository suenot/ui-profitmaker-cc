import type { Meta, StoryObj } from '@storybook/react'
import { Heatmap, type HeatmapSlice, type HeatmapTrade } from './heatmap'

const meta: Meta<typeof Heatmap> = {
  title: 'Trading/Heatmap',
  component: Heatmap,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-[640px] h-[380px] rounded-md border border-border bg-card overflow-hidden">
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof Heatmap>

// Synthesize ~60 time slices around a wandering mid price with a resting book.
function makeBook(sliceCount = 60, tick = 1, depth = 40) {
  const slices: HeatmapSlice[] = []
  const trades: HeatmapTrade[] = []
  let mid = 67230
  const base = Date.now() - sliceCount * 1000
  for (let i = 0; i < sliceCount; i++) {
    mid += (Math.sin(i * 0.2) * 2 + (Math.random() - 0.5) * 3)
    const center = Math.round(mid / tick) * tick
    const time = base + i * 1000
    const levels: { price: number; size: number }[] = []
    for (let k = -depth; k <= depth; k++) {
      const price = center + k * tick
      const dist = Math.abs(k)
      // Two liquidity walls plus decaying depth away from mid.
      let size = Math.max(0, 60 - dist * 1.4) + Math.random() * 20
      if (dist === 8 || dist === 14) size += 120 + Math.random() * 60
      levels.push({ price, size })
    }
    slices.push({ time, levels })

    if (Math.random() < 0.5) {
      trades.push({
        time,
        price: center + (Math.round((Math.random() - 0.5) * 4)) * tick,
        size: Math.random() * 10 + 1,
        side: Math.random() > 0.5 ? 'buy' : 'sell',
      })
    }
  }
  return { slices, trades }
}

const { slices, trades } = makeBook()

export const Default: Story = {
  args: { slices, priceDecimals: 0, tickSize: 1, colorScale: 'heat', showTrades: false },
}

export const WithTrades: Story = {
  args: { slices, trades, priceDecimals: 0, tickSize: 1, colorScale: 'heat', showTrades: true },
}

export const Mono: Story = {
  args: { slices, priceDecimals: 0, tickSize: 1, colorScale: 'mono', showTrades: false },
}
