import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from './progress'

const meta: Meta<typeof Progress> = {
  title: 'UI/Progress',
  component: Progress,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { value: 60 },
  render: (args) => <Progress {...args} className="w-80" />,
}

export const Steps: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Progress value={25} />
      <Progress value={50} />
      <Progress value={75} />
      <Progress value={100} />
    </div>
  ),
}
