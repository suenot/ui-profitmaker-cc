import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const previewCode = `import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function Example() {
  return (
    <div className="grid gap-2 w-72">
      <Label htmlFor="notes">Strategy notes</Label>
      <Textarea id="notes" placeholder="Describe your strategy..." />
    </div>
  )
}`

const sourceCode = `'use client'

import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }`

export default function TextareaPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Base UI</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Textarea</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        A multi-line text input. Supports all standard HTML textarea attributes.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="ui-textarea--with-label">
        <div className="grid gap-2 w-72">
          <Label htmlFor="notes">Strategy notes</Label>
          <Textarea id="notes" placeholder="Describe your strategy..." />
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Disabled</h2>
      <ComponentPreview code={`<Textarea placeholder="Disabled" disabled />`}>
        <Textarea placeholder="Disabled" disabled className="w-72" />
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/ui/textarea.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'value', type: 'string', description: 'Controlled value' },
        { name: 'defaultValue', type: 'string', description: 'Initial value when uncontrolled' },
        { name: 'placeholder', type: 'string', description: 'Placeholder text' },
        { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disable the textarea' },
        { name: 'onChange', type: '(e: ChangeEvent) => void', description: 'Change handler' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
