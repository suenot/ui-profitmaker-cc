import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from './slider'

const meta: Meta<typeof Slider> = {
  title: 'UI/Slider',
  component: Slider,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {
  args: { defaultValue: [50], max: 100, step: 1, className: 'w-64' },
}

export const Range: Story = {
  args: { defaultValue: [25, 75], max: 100, step: 1, className: 'w-64' },
}
