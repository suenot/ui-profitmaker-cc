import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './badge'

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'solid', 'muted'],
    },
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'AI & Fintech' },
}

export const Outline: Story = {
  args: { variant: 'outline', children: 'Open Source' },
}

export const Solid: Story = {
  args: { variant: 'solid', children: 'New' },
}

export const Muted: Story = {
  args: { variant: 'muted', children: 'Beta' },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge>AI & Fintech</Badge>
      <Badge variant="outline">Open Source</Badge>
      <Badge variant="solid">New</Badge>
      <Badge variant="muted">Beta</Badge>
    </div>
  ),
}

export const WithPulse: Story = {
  render: () => (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/[0.05] border border-accent/[0.1]">
      <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
      <span className="text-xs font-bold text-accent-darker uppercase tracking-[0.2em]">Live Trading</span>
    </div>
  ),
}
