import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './input'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = { args: { placeholder: 'Email', className: 'w-64' } }
export const Disabled: Story = { args: { placeholder: 'Disabled', disabled: true, className: 'w-64' } }
export const Password: Story = { args: { type: 'password', placeholder: 'Password', className: 'w-64' } }
export const WithValue: Story = { args: { defaultValue: 'hello@example.com', className: 'w-64' } }
