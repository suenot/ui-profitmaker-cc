import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const previewCode = `import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

export default function Example() {
  return (
    <RadioGroup defaultValue="market">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="market" id="r-market" />
        <Label htmlFor="r-market">Market</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="limit" id="r-limit" />
        <Label htmlFor="r-limit">Limit</Label>
      </div>
    </RadioGroup>
  )
}`

const sourceCode = `'use client'

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }`

export default function RadioGroupPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Base UI</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Radio Group</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        A set of checkable buttons where no more than one can be checked at a time. Built on Radix UI.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="ui-radiogroup--default">
        <RadioGroup defaultValue="market">
          <div className="flex items-center gap-3">
            <RadioGroupItem value="market" id="r-market" />
            <Label htmlFor="r-market">Market</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="limit" id="r-limit" />
            <Label htmlFor="r-limit">Limit</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="stop" id="r-stop" />
            <Label htmlFor="r-stop">Stop</Label>
          </div>
        </RadioGroup>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Horizontal</h2>
      <ComponentPreview code={`<RadioGroup defaultValue="buy" className="flex gap-6">\n  <RadioGroupItem value="buy" /> Buy\n  <RadioGroupItem value="sell" /> Sell\n</RadioGroup>`}>
        <RadioGroup defaultValue="buy" className="flex gap-6">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="buy" id="h-buy" />
            <Label htmlFor="h-buy">Buy</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="sell" id="h-sell" />
            <Label htmlFor="h-sell">Sell</Label>
          </div>
        </RadioGroup>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/ui/radio-group.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'value', type: 'string', description: 'Controlled selected value' },
        { name: 'defaultValue', type: 'string', description: 'Initial value when uncontrolled' },
        { name: 'onValueChange', type: '(value: string) => void', description: 'Called when the selected value changes' },
        { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disable the whole group' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
