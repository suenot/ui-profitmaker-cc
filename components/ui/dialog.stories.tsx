import type { Meta, StoryObj } from '@storybook/react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './dialog'
import { Button } from './button'

const meta: Meta = {
  title: 'UI/Dialog',
  component: Dialog,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="text-foreground">
        <DialogHeader>
          <DialogTitle>Confirm strategy</DialogTitle>
          <DialogDescription>
            This will deploy your market making strategy live. Make sure your risk limits are set.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost">Cancel</Button>
          <Button>Deploy</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const Open: Story = {
  render: () => (
    <Dialog open>
      <DialogContent className="text-foreground">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your account here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
