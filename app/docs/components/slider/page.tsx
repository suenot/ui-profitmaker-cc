import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const previewCode = `import { Slider } from '@/components/ui/slider'

export default function Example() {
  return <Slider defaultValue={[50]} max={100} step={1} className="w-64" />
}`

const sourceCode = `'use client'

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }`

export default function SliderPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Base UI</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Slider</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        An input where the user selects a value or range from within a given range. Built on Radix UI.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="ui-slider--default">
        <Slider defaultValue={[50]} max={100} step={1} className="w-64" />
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Range</h2>
      <ComponentPreview code={`<Slider defaultValue={[20, 80]} max={100} step={1} className="w-64" />`}>
        <Slider defaultValue={[20, 80]} max={100} step={1} className="w-64" />
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/ui/slider.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'value', type: 'number[]', description: 'Controlled value(s) of the thumb(s)' },
        { name: 'defaultValue', type: 'number[]', description: 'Initial value(s) when uncontrolled' },
        { name: 'onValueChange', type: '(value: number[]) => void', description: 'Called as the value changes' },
        { name: 'min', type: 'number', defaultValue: '0', description: 'Minimum value' },
        { name: 'max', type: 'number', defaultValue: '100', description: 'Maximum value' },
        { name: 'step', type: 'number', defaultValue: '1', description: 'Stepping interval' },
        { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disable the slider' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
