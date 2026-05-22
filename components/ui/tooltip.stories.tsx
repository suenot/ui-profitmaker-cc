import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './tooltip'
import { Button } from './button'

const meta: Meta = {
  title: 'UI/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Quotes refresh every 200ms</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

export const Open: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip open>
        <TooltipTrigger asChild>
          <Button variant="outline">Always visible</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>This tooltip stays open</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}
