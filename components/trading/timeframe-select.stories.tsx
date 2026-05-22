import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TimeframeSelect } from './timeframe-select'

const meta: Meta<typeof TimeframeSelect> = {
  title: 'Trading/TimeframeSelect',
  component: TimeframeSelect,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof TimeframeSelect>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('1h')
    return <TimeframeSelect value={value} onChange={setValue} />
  },
}

export const CustomTimeframes: Story = {
  render: () => {
    const [value, setValue] = useState('5m')
    return (
      <TimeframeSelect
        value={value}
        onChange={setValue}
        availableTimeframes={['1m', '5m', '15m', '1h', '4h', '1d']}
      />
    )
  },
}
