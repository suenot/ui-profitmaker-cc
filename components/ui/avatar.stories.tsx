import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarImage, AvatarFallback } from './avatar'

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
}

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback className="text-foreground">MM</AvatarFallback>
    </Avatar>
  ),
}

export const Group: Story = {
  render: () => (
    <div className="flex -space-x-3">
      <Avatar className="ring-2 ring-background">
        <AvatarFallback className="text-foreground">AB</AvatarFallback>
      </Avatar>
      <Avatar className="ring-2 ring-background">
        <AvatarFallback className="text-foreground">CD</AvatarFallback>
      </Avatar>
      <Avatar className="ring-2 ring-background">
        <AvatarFallback className="text-foreground">EF</AvatarFallback>
      </Avatar>
    </div>
  ),
}
