import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup, RadioGroupItem } from './radio-group'
import { Label } from './label'

const meta: Meta<typeof RadioGroup> = {
  title: 'UI/RadioGroup',
  component: RadioGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="market">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="market" id="r-market" />
        <Label htmlFor="r-market">Market</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="limit" id="r-limit" />
        <Label htmlFor="r-limit">Limit</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="stop" id="r-stop" />
        <Label htmlFor="r-stop">Stop</Label>
      </div>
    </RadioGroup>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="buy" className="flex gap-6">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="buy" id="h-buy" />
        <Label htmlFor="h-buy">Buy</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="sell" id="h-sell" />
        <Label htmlFor="h-sell">Sell</Label>
      </div>
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="a">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="a" id="d-a" />
        <Label htmlFor="d-a">Available</Label>
      </div>
      <div className="flex items-center gap-3 opacity-50">
        <RadioGroupItem value="b" id="d-b" disabled />
        <Label htmlFor="d-b">Disabled</Label>
      </div>
    </RadioGroup>
  ),
}
