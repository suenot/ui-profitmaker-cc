import type { Meta, StoryObj } from '@storybook/react'
import { Bold, Italic, Underline } from 'lucide-react'
import { Toggle } from './toggle'

const meta: Meta<typeof Toggle> = {
  title: 'UI/Toggle',
  component: Toggle,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'outline'] },
    size: { control: 'select', options: ['default', 'sm', 'lg'] },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Toggle' },
}

export const WithIcon: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
}

export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' },
}

export const Toolbar: Story = {
  render: () => (
    <div className="flex gap-1">
      <Toggle aria-label="Bold" defaultPressed>
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Italic">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Underline">
        <Underline className="h-4 w-4" />
      </Toggle>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Toggle size="sm">Small</Toggle>
      <Toggle size="default">Default</Toggle>
      <Toggle size="lg">Large</Toggle>
    </div>
  ),
}
