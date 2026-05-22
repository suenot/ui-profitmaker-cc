import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './checkbox'
import { Label } from './label'

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
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
      <Checkbox id="terms" defaultChecked />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
}

export const Checked: Story = {
  args: { defaultChecked: true },
}

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Checkbox id="disabled" disabled />
      <Label htmlFor="disabled" className="opacity-50">Unavailable option</Label>
    </div>
  ),
}

export const Group: Story = {
  render: () => (
    <div className="grid gap-3">
      {['Spot trading', 'Margin trading', 'Futures'].map((label, i) => (
        <div key={label} className="flex items-center gap-3">
          <Checkbox id={`opt-${i}`} defaultChecked={i === 0} />
          <Label htmlFor={`opt-${i}`}>{label}</Label>
        </div>
      ))}
    </div>
  ),
}
