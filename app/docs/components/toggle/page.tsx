import { Bold, Italic, Underline } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Toggle } from '@/components/ui/toggle'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const previewCode = `import { Bold } from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'

export default function Example() {
  return (
    <Toggle aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  )
}`

const sourceCode = `'use client'

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }`

export default function TogglePage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Base UI</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Toggle</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        A two-state button that can be either on or off. Built on Radix UI.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="ui-toggle--toolbar">
        <div className="flex gap-1">
          <Toggle aria-label="Bold" defaultPressed>
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle aria-label="Italic">
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle aria-label="Underline">
            <Underline className="h-4 w-4" />
          </Toggle>
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Variants & Sizes</h2>
      <ComponentPreview code={`<Toggle variant="outline">Outline</Toggle>\n<Toggle size="sm">Small</Toggle>\n<Toggle size="lg">Large</Toggle>`}>
        <div className="flex items-center gap-2">
          <Toggle variant="outline">Outline</Toggle>
          <Toggle size="sm">Small</Toggle>
          <Toggle size="lg">Large</Toggle>
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/ui/toggle.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'variant', type: "'default' | 'outline'", defaultValue: "'default'", description: 'Visual style variant' },
        { name: 'size', type: "'default' | 'sm' | 'lg'", defaultValue: "'default'", description: 'Toggle size' },
        { name: 'pressed', type: 'boolean', description: 'Controlled pressed state' },
        { name: 'defaultPressed', type: 'boolean', description: 'Initial pressed state when uncontrolled' },
        { name: 'onPressedChange', type: '(pressed: boolean) => void', description: 'Called when the pressed state changes' },
        { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disable the toggle' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
