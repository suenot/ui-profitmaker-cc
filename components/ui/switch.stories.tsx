import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from './switch'
import { Label } from './label'

const meta: Meta<typeof Switch> = {
  title: 'UI/Switch',
  component: Switch,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Switch id="auto-trade" defaultChecked />
      <Label htmlFor="auto-trade">Enable auto-trading</Label>
    </div>
  ),
}

export const Checked: Story = {
  args: { defaultChecked: true },
}

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 opacity-50">
        <Switch id="d-off" disabled />
        <Label htmlFor="d-off">Disabled off</Label>
      </div>
      <div className="flex items-center gap-3 opacity-50">
        <Switch id="d-on" disabled defaultChecked />
        <Label htmlFor="d-on">Disabled on</Label>
      </div>
    </div>
  ),
}
