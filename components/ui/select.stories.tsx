import type { Meta, StoryObj } from '@storybook/react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './select'
import { Label } from './label'

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Select defaultValue="btc">
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select a pair" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="btc">BTC/USDT</SelectItem>
        <SelectItem value="eth">ETH/USDT</SelectItem>
        <SelectItem value="sol">SOL/USDT</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label>Trading pair</Label>
      <Select>
        <SelectTrigger className="w-56">
          <SelectValue placeholder="Choose pair" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="btc">BTC/USDT</SelectItem>
          <SelectItem value="eth">ETH/USDT</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

export const Grouped: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select exchange" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>CEX</SelectLabel>
          <SelectItem value="binance">Binance</SelectItem>
          <SelectItem value="bybit">Bybit</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>DEX</SelectLabel>
          <SelectItem value="uniswap">Uniswap</SelectItem>
          <SelectItem value="curve">Curve</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Unavailable" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="x">Item</SelectItem>
      </SelectContent>
    </Select>
  ),
}
