import type { Meta, StoryObj } from '@storybook/react'
import { Popover, PopoverTrigger, PopoverContent } from './popover'
import { Button } from './button'

const meta: Meta = {
  title: 'UI/Popover',
  component: Popover,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="text-foreground">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Spread settings</h4>
          <p className="text-sm text-muted-foreground">
            Adjust the bid/ask spread for the selected trading pair.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
}
