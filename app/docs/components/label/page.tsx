import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const previewCode = `import { Label } from '@/components/ui/label'

export default function Example() {
  return (
    <div className="grid gap-2">
      <Label htmlFor="api-key">API Key</Label>
      <input id="api-key" placeholder="sk-..." />
    </div>
  )
}`

const sourceCode = `'use client'

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }`

export default function LabelPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Base UI</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Label</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        An accessible label associated with form controls. Built on Radix UI.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="ui-label--with-input">
        <div className="grid gap-2">
          <Label htmlFor="api-key">API Key</Label>
          <input
            id="api-key"
            placeholder="sk-..."
            className="flex h-10 w-64 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Required</h2>
      <ComponentPreview code={`<Label htmlFor="amount">\n  Amount <span className="text-red-400">*</span>\n</Label>`}>
        <Label htmlFor="amount">
          Amount <span className="text-red-400">*</span>
        </Label>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/ui/label.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'htmlFor', type: 'string', description: 'The id of the control the label is bound to' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
        { name: 'children', type: 'ReactNode', description: 'Label content' },
      ]} />
    </div>
  )
}
