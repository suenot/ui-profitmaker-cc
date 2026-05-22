import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const previewCode = `import { Progress } from '@/components/ui/progress'

export default function Example() {
  return <Progress value={60} />
}`

const sourceCode = `'use client'

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: \`translateX(-\${100 - (value || 0)}%)\` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }`

export default function ProgressPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Display</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Progress</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Displays an indicator showing the completion progress of a task. Built on Radix UI.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="ui-progress--default">
        <div className="w-80 space-y-4">
          <Progress value={25} />
          <Progress value={60} />
          <Progress value={100} />
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/ui/progress.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'value', type: 'number', defaultValue: '0', description: 'Progress value from 0 to 100' },
        { name: 'max', type: 'number', defaultValue: '100', description: 'The maximum progress value' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
