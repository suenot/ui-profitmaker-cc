import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './textarea'
import { Label } from './label'

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { placeholder: 'Type your message here.', className: 'w-72' },
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid gap-2 w-72">
      <Label htmlFor="notes">Strategy notes</Label>
      <Textarea id="notes" placeholder="Describe your strategy..." />
    </div>
  ),
}

export const WithValue: Story = {
  args: {
    defaultValue: 'Grid strategy: 10 levels, 0.5% spacing, rebalance hourly.',
    className: 'w-72',
  },
}

export const Disabled: Story = {
  args: { placeholder: 'Disabled', disabled: true, className: 'w-72' },
}
