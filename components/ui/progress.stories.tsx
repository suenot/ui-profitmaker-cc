import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from './progress'

const meta: Meta<typeof Progress> = {
  title: 'UI/Progress',
  component: Progress,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Progress>

export const Default: Story = { args: { value: 60, className: 'w-64' } }
export const Empty: Story = { args: { value: 0, className: 'w-64' } }
export const Full: Story = { args: { value: 100, className: 'w-64' } }
