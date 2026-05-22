import { Badge } from '@/components/ui/badge'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { Terminal, AlertTriangle } from 'lucide-react'

const previewCode = `import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Terminal } from 'lucide-react'

export default function Example() {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        Your strategy has been deployed and is now quoting.
      </AlertDescription>
    </Alert>
  )
}`

const sourceCode = `'use client'

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5 ref={ref} className={cn("mb-1 font-medium leading-none tracking-tight", className)} {...props} />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }`

export default function AlertPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Display</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Alert</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Displays a callout for user attention. Supports default and destructive variants with optional icons.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="ui-alert--default">
        <Alert className="w-96 text-foreground">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription className="text-muted-foreground">
            Your strategy has been deployed and is now quoting.
          </AlertDescription>
        </Alert>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Variants</h2>
      <ComponentPreview code={`<Alert variant="destructive">...</Alert>`}>
        <Alert variant="destructive" className="w-96">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Connection lost</AlertTitle>
          <AlertDescription>
            Unable to reach the exchange. Quotes have been paused.
          </AlertDescription>
        </Alert>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/ui/alert.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'variant', type: "'default' | 'destructive'", defaultValue: "'default'", description: 'Visual style variant' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
