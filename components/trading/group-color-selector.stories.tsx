import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { GroupColorSelector, DEFAULT_GROUPS, type Group } from './group-color-selector'

const meta: Meta<typeof GroupColorSelector> = {
  title: 'Trading/GroupColorSelector',
  component: GroupColorSelector,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof GroupColorSelector>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>(undefined)
    return <GroupColorSelector value={value} onChange={setValue} />
  },
}

const configuredGroups: Group[] = DEFAULT_GROUPS.map((g) =>
  g.id === 'blue'
    ? { ...g, account: 'main@trade.io', exchange: 'binance', market: 'spot', tradingPair: 'BTC/USDT' }
    : g,
)

export const WithConfiguredGroup: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>('blue')
    return <GroupColorSelector value={value} onChange={setValue} groups={configuredGroups} />
  },
}
