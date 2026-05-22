import type { Meta, StoryObj } from '@storybook/react'
import { Bold } from 'lucide-react'
import { Toggle } from './toggle'

const meta: Meta<typeof Toggle> = {
  title: 'UI/Toggle',
  component: Toggle,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = { args: { children: 'Toggle' } }
export const Outline: Story = { args: { variant: 'outline', children: 'Outline' } }

export const WithIcon: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
}
