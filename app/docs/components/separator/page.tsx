import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const previewCode = `import { Separator } from '@/components/ui/separator'

export default function Example() {
  return (
    <div>
      <p>Above</p>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>API</div>
      </div>
    </div>
  )
}`

const sourceCode = `'use client'

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    )}
    {...props}
  />
))
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }`

export default function SeparatorPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Display</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Separator</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Visually or semantically separates content. Supports horizontal and vertical orientations. Built on Radix UI.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="ui-separator--default">
        <div className="w-80 text-foreground">
          <div className="space-y-1">
            <h4 className="text-sm font-medium leading-none">Market Maker</h4>
            <p className="text-sm text-muted-foreground">Self-hosted liquidity engine.</p>
          </div>
          <Separator className="my-4" />
          <div className="flex h-5 items-center space-x-4 text-sm">
            <div>Docs</div>
            <Separator orientation="vertical" />
            <div>Storybook</div>
            <Separator orientation="vertical" />
            <div>API</div>
          </div>
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/ui/separator.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'orientation', type: "'horizontal' | 'vertical'", defaultValue: "'horizontal'", description: 'The orientation of the separator' },
        { name: 'decorative', type: 'boolean', defaultValue: 'true', description: 'Whether it is purely visual (vs semantic)' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
