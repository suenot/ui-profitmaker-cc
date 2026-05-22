import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const previewCode = `import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'

export default function Example() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Quotes refresh every 200ms</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`

const sourceCode = `'use client'

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-[2000] overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }`

export default function TooltipPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Overlay</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Tooltip</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        A small popup that displays information related to an element on hover or focus. Built on Radix UI.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="ui-tooltip--open">
        <TooltipProvider>
          <Tooltip open>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Quotes refresh every 200ms</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/ui/tooltip.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'open', type: 'boolean', description: 'Controlled open state' },
        { name: 'defaultOpen', type: 'boolean', description: 'Open state when uncontrolled' },
        { name: 'delayDuration', type: 'number', defaultValue: '700', description: 'Delay before opening, in ms (on TooltipProvider)' },
        { name: 'sideOffset', type: 'number', defaultValue: '4', description: 'Distance from the trigger in px (on TooltipContent)' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
