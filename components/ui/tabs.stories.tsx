import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs'

const meta: Meta = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-96 text-foreground">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="logs">Logs</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="text-muted-foreground text-sm">
        Live PnL, inventory, and quoting status at a glance.
      </TabsContent>
      <TabsContent value="orders" className="text-muted-foreground text-sm">
        Open and filled orders across all connected exchanges.
      </TabsContent>
      <TabsContent value="logs" className="text-muted-foreground text-sm">
        Real-time engine logs and event stream.
      </TabsContent>
    </Tabs>
  ),
}
