import type { Meta, StoryObj } from '@storybook/react'
import { Label } from './label'

const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Email address' },
}

export const WithInput: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="api-key">API Key</Label>
      <input
        id="api-key"
        placeholder="sk-..."
        className="flex h-10 w-64 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  ),
}

export const Required: Story = {
  render: () => (
    <Label htmlFor="amount">
      Amount <span className="text-red-400">*</span>
    </Label>
  ),
}
