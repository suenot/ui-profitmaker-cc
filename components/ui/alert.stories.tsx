import type { Meta, StoryObj } from '@storybook/react'
import { Alert, AlertTitle, AlertDescription } from './alert'
import { Terminal, AlertTriangle } from 'lucide-react'

const meta: Meta<typeof Alert> = {
  title: 'UI/Alert',
  component: Alert,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'destructive'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Alert className="w-96 text-foreground">
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription className="text-muted-foreground">
        Your strategy has been deployed and is now quoting.
      </AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-96">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Connection lost</AlertTitle>
      <AlertDescription>
        Unable to reach the exchange. Quotes have been paused.
      </AlertDescription>
    </Alert>
  ),
}
