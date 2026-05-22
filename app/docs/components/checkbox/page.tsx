import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const previewCode = `import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export default function Example() {
  return (
    <div className="flex items-center gap-3">
      <Checkbox id="terms" defaultChecked />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  )
}`

const sourceCode = `'use client'

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }`

export default function CheckboxPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Base UI</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Checkbox</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        A control that allows the user to toggle between checked and unchecked states. Built on Radix UI.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="ui-checkbox--with-label">
        <div className="flex items-center gap-3">
          <Checkbox id="terms" defaultChecked />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Group</h2>
      <ComponentPreview code={`<div className="grid gap-3">\n  <Checkbox defaultChecked /> Spot trading\n  <Checkbox /> Margin trading\n  <Checkbox /> Futures\n</div>`}>
        <div className="grid gap-3">
          {['Spot trading', 'Margin trading', 'Futures'].map((label, i) => (
            <div key={label} className="flex items-center gap-3">
              <Checkbox id={`opt-${i}`} defaultChecked={i === 0} />
              <Label htmlFor={`opt-${i}`}>{label}</Label>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/ui/checkbox.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'checked', type: 'boolean', description: 'Controlled checked state' },
        { name: 'defaultChecked', type: 'boolean', description: 'Initial checked state when uncontrolled' },
        { name: 'onCheckedChange', type: '(checked: boolean) => void', description: 'Called when the checked state changes' },
        { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disable the checkbox' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
