import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './input'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'search'],
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { placeholder: 'Search markets...' },
  decorators: [(S) => <div className="w-80"><S /></div>],
}

export const Password: Story = {
  args: { type: 'password', placeholder: 'Enter API key...' },
  decorators: [(S) => <div className="w-80"><S /></div>],
}

export const Number: Story = {
  args: { type: 'number', placeholder: '0.001' },
  decorators: [(S) => <div className="w-80"><S /></div>],
}

export const Disabled: Story = {
  args: { placeholder: 'Disabled input', disabled: true },
  decorators: [(S) => <div className="w-80"><S /></div>],
}

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input placeholder="Search markets..." />
      <Input type="password" placeholder="Enter API key..." />
      <Input type="number" placeholder="Order amount..." />
      <Input type="email" placeholder="your@email.com" />
    </div>
  ),
}
