import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const previewCode = `import { ScrollArea } from '@/components/ui/scroll-area'

export default function Example() {
  return (
    <ScrollArea className="h-60 w-56 rounded-md border p-4">
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i}>Trade #{i + 1}</div>
      ))}
    </ScrollArea>
  )
}`

const sourceCode = `'use client'

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }`

export default function ScrollAreaPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Display</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Scroll Area</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Augments native scroll functionality for custom, cross-browser styling. Built on Radix UI.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="ui-scrollarea--default">
        <ScrollArea className="h-60 w-56 rounded-md border border-border p-4 text-foreground">
          <h4 className="mb-4 text-sm font-medium leading-none">Recent fills</h4>
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="text-sm text-muted-foreground py-1 border-b border-border/50 last:border-0">
              Trade #{i + 1}
            </div>
          ))}
        </ScrollArea>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/ui/scroll-area.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'type', type: "'auto' | 'always' | 'scroll' | 'hover'", defaultValue: "'hover'", description: 'When the scrollbar is visible' },
        { name: 'children', type: 'ReactNode', description: 'Scrollable content' },
        { name: 'className', type: 'string', description: 'Additional CSS classes (set height here)' },
      ]} />
    </div>
  )
}
