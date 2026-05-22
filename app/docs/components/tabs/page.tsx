import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const previewCode = `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export default function Example() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Live PnL and status.</TabsContent>
      <TabsContent value="orders">Open orders.</TabsContent>
    </Tabs>
  )
}`

const sourceCode = `'use client'

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground", className)}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className)}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }`

export default function TabsPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Display</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Tabs</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        A set of layered sections of content, displayed one panel at a time. Built on Radix UI.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="ui-tabs--default">
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
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/ui/tabs.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'defaultValue', type: 'string', description: 'The tab active by default' },
        { name: 'value', type: 'string', description: 'Controlled active tab' },
        { name: 'onValueChange', type: '(value: string) => void', description: 'Called when the active tab changes' },
        { name: 'orientation', type: "'horizontal' | 'vertical'", defaultValue: "'horizontal'", description: 'Layout orientation' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
