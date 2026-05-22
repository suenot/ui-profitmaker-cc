import { Badge } from '@/components/ui/badge'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const previewCode = `import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

export default function Example() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Spread settings</h4>
          <p className="text-sm text-muted-foreground">
            Adjust the bid/ask spread for the selected pair.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  )
}`

const sourceCode = `'use client'

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-[11000] w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }`

export default function PopoverPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Overlay</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Popover</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Displays rich content in a floating panel anchored to a trigger. Built on Radix UI.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="ui-popover--default">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent className="text-foreground">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Spread settings</h4>
              <p className="text-sm text-muted-foreground">
                Adjust the bid/ask spread for the selected trading pair.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/ui/popover.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'open', type: 'boolean', description: 'Controlled open state' },
        { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when open state changes' },
        { name: 'align', type: "'start' | 'center' | 'end'", defaultValue: "'center'", description: 'Alignment against the trigger (on PopoverContent)' },
        { name: 'sideOffset', type: 'number', defaultValue: '4', description: 'Distance from the trigger in px' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
