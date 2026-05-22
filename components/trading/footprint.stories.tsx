import type { Meta, StoryObj } from '@storybook/react'
import { Footprint, type FootprintCandle } from './footprint'

const meta: Meta<typeof Footprint> = {
  title: 'Trading/Footprint',
  component: Footprint,
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
type Story = StoryObj<typeof Footprint>

function makeCandles(count = 5, tick = 1, levels = 14): FootprintCandle[] {
  const out: FootprintCandle[] = []
  let mid = 67230
  const base = Date.now() - count * 60_000
  for (let i = 0; i < count; i++) {
    const open = mid
    mid += (Math.sin(i * 1.3) + (Math.random() - 0.5)) * 4
    const close = mid
    const high = Math.max(open, close) + 3 + Math.random() * 3
    const low = Math.min(open, close) - 3 - Math.random() * 3
    const lo = Math.round(low / tick) * tick
    const hi = Math.round(high / tick) * tick
    const lvls = []
    for (let p = hi; p >= lo; p -= tick) {
      const dist = Math.abs(p - (open + close) / 2)
      const weight = Math.max(0.1, 1 - dist / ((hi - lo) / 1.5))
      const bidVolume = Math.round(weight * (40 + Math.random() * 120))
      const askVolume = Math.round(weight * (40 + Math.random() * 120))
      lvls.push({ price: p, bidVolume, askVolume })
    }
    out.push({ time: base + i * 60_000, open, high, low, close, levels: lvls })
  }
  return out
}

const candles = makeCandles()

export const Default: Story = {
  args: { candles, priceDecimals: 0, tickSize: 1, showPOC: true },
}

export const ImbalanceHighlighting: Story = {
  args: { candles, priceDecimals: 0, tickSize: 1, imbalanceRatio: 2, showPOC: true },
}

export const Profile: Story = {
  args: { candles, mode: 'profile', priceDecimals: 0, tickSize: 1, showPOC: true },
}
