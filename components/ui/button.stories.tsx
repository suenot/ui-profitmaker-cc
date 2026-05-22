import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'ghost', 'destructive', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Get Started' },
}

export const Outline: Story = {
  args: { variant: 'outline', children: 'Read Whitepaper' },
}

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Learn More' },
}

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Delete Strategy' },
}

export const Small: Story = {
  args: { size: 'sm', children: 'Small' },
}

export const Large: Story = {
  args: { size: 'lg', children: 'Invest Now' },
}

export const Disabled: Story = {
  args: { children: 'Disabled', disabled: true },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}
