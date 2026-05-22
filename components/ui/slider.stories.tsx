import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from './slider'
import { Label } from './label'

const meta: Meta<typeof Slider> = {
  title: 'UI/Slider',
  component: Slider,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Slider defaultValue={[50]} max={100} step={1} className="w-64" />
  ),
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid gap-3 w-64">
      <div className="flex justify-between">
        <Label>Position size</Label>
        <span className="text-sm text-muted-foreground">25%</span>
      </div>
      <Slider defaultValue={[25]} max={100} step={5} />
    </div>
  ),
}

export const Range: Story = {
  render: () => (
    <Slider defaultValue={[20, 80]} max={100} step={1} className="w-64" />
  ),
}

export const Stepped: Story = {
  render: () => (
    <Slider defaultValue={[40]} max={100} step={20} className="w-64" />
  ),
}
