import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card'
import { Badge } from './badge'
import { Button } from './button'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Trading Signal</CardTitle>
        <CardDescription>AI-generated signal for BTC/USDT</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-black">$42,180</p>
        <p className="text-sm text-green-400 font-bold mt-1">↑ +3.2%</p>
      </CardContent>
    </Card>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Strategy Builder</CardTitle>
        <CardDescription>Create and backtest algorithmic strategies.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 flex-wrap">
          <Badge>Python</Badge>
          <Badge variant="secondary">Backtested</Badge>
          <Badge variant="outline">Live</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button size="sm">Open Strategy</Button>
      </CardFooter>
    </Card>
  ),
}

export const Portfolio: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Portfolio Summary</CardTitle>
        <CardDescription>Total value across all exchanges</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-black">$24,501</p>
        <p className="text-sm text-green-400 font-bold mt-1">↑ +12.4% this month</p>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">BTC</span>
            <span className="font-bold">$18,200</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">ETH</span>
            <span className="font-bold">$4,800</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">USDT</span>
            <span className="font-bold">$1,501</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
}
