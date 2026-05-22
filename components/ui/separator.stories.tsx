import type { Meta, StoryObj } from '@storybook/react'
import { Separator } from './separator'

const meta: Meta<typeof Separator> = {
  title: 'UI/Separator',
  component: Separator,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-80 text-foreground">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Market Maker</h4>
        <p className="text-sm text-muted-foreground">Self-hosted liquidity engine.</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Storybook</div>
        <Separator orientation="vertical" />
        <div>API</div>
      </div>
    </div>
  ),
}
