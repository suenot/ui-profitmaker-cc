import type { Meta, StoryObj } from '@storybook/react'
import { Separator } from './separator'

const meta: Meta<typeof Separator> = {
  title: 'UI/Separator',
  component: Separator,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Separator>

export const Horizontal: Story = {
  render: () => (
    <div className="w-64">
      <div className="text-sm">Above</div>
      <Separator className="my-2" />
      <div className="text-sm">Below</div>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center">
      <div className="text-sm">Left</div>
      <Separator orientation="vertical" className="mx-2" />
      <div className="text-sm">Right</div>
    </div>
  ),
}
