import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TimeframeSelect } from './timeframe-select'

const meta: Meta<typeof TimeframeSelect> = {
  title: 'Trading/TimeframeSelect',
  component: TimeframeSelect,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('1h')
    return <TimeframeSelect value={value} onChange={setValue} />
  },
}

export const CustomTimeframes: Story = {
  render: () => {
    const [value, setValue] = useState('5m')
    return <TimeframeSelect value={value} onChange={setValue} timeframes={['1m', '5m', '30m', '4h', '1d']} />
  },
}

export const WithLabels: Story = {
  render: () => {
    const [value, setValue] = useState('1h')
    return (
      <TimeframeSelect
        value={value}
        onChange={setValue}
        timeframes={[
          { value: '1m', label: '1 Minute' },
          { value: '1h', label: '1 Hour' },
          { value: '1d', label: '1 Day' },
          { value: '1w', label: '1 Week' },
        ]}
      />
    )
  },
}
