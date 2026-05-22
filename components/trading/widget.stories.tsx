import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Widget } from './widget'

const meta: Meta<typeof Widget> = {
  title: 'Trading/Widget',
  component: Widget,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Widget>

export const Default: Story = {
  render: () => (
    <Widget
      title="Order Book"
      instrument="binance · BTC/USDT · spot"
      defaultGroupId="blue"
      onSettings={() => {}}
      onMinimize={() => {}}
      onClose={() => {}}
      className="h-64 w-80"
    >
      <p className="text-sm text-muted-foreground">
        Pick the colored dot in the header to assign this widget to a group.
      </p>
    </Widget>
  ),
}

export const ColorGroups: Story = {
  render: () => {
    // Two widgets share the "blue" group — the colored top accent shows the
    // grouping at a glance. Pick a header dot to change a widget's group.
    const [g1, setG1] = useState<string | undefined>('blue')
    const [g2, setG2] = useState<string | undefined>('blue')
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Widget title="Chart" instrument="BTC/USDT" groupId={g1} onGroupChange={setG1} className="h-80 w-64">
          <span className="text-xs text-muted-foreground">Linked to group A</span>
        </Widget>
        <Widget title="Order Book" instrument="BTC/USDT" groupId={g2} onGroupChange={setG2} className="h-80 w-64">
          <span className="text-xs text-muted-foreground">Linked to group A</span>
        </Widget>
      </div>
    )
  },
}
