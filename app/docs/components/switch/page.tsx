import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const previewCode = `import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export default function Example() {
  return (
    <div className="flex items-center gap-3">
      <Switch id="auto-trade" defaultChecked />
      <Label htmlFor="auto-trade">Enable auto-trading</Label>
    </div>
  )
}`

const sourceCode = `'use client'

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }`

export default function SwitchPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Base UI</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Switch</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        A control that toggles between on and off states. Built on Radix UI.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="ui-switch--with-label">
        <div className="flex items-center gap-3">
          <Switch id="auto-trade" defaultChecked />
          <Label htmlFor="auto-trade">Enable auto-trading</Label>
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">States</h2>
      <ComponentPreview code={`<Switch />\n<Switch defaultChecked />\n<Switch disabled />`}>
        <div className="flex items-center gap-6">
          <Switch />
          <Switch defaultChecked />
          <Switch disabled />
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/ui/switch.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'checked', type: 'boolean', description: 'Controlled checked state' },
        { name: 'defaultChecked', type: 'boolean', description: 'Initial checked state when uncontrolled' },
        { name: 'onCheckedChange', type: '(checked: boolean) => void', description: 'Called when the checked state changes' },
        { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disable the switch' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
