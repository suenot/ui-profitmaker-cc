import type { Meta, StoryObj } from '@storybook/react'
import { ScrollArea } from './scroll-area'

const meta: Meta<typeof ScrollArea> = {
  title: 'UI/ScrollArea',
  component: ScrollArea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const tags = Array.from({ length: 30 }).map((_, i) => `Trade #${i + 1}`)

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-60 w-56 rounded-md border border-border p-4 text-foreground">
      <h4 className="mb-4 text-sm font-medium leading-none">Recent fills</h4>
      {tags.map((tag) => (
        <div key={tag} className="text-sm text-muted-foreground py-1 border-b border-border/50 last:border-0">
          {tag}
        </div>
      ))}
    </ScrollArea>
  ),
}
