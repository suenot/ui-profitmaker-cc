import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './textarea'

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = { args: { placeholder: 'Type your message here.', className: 'w-80' } }
export const Disabled: Story = { args: { placeholder: 'Disabled', disabled: true, className: 'w-80' } }
