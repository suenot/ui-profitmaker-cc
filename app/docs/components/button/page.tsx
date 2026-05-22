import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const previewCode = `import { Button } from '@/components/ui/button'

export default function Example() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button>Get Started</Button>
      <Button variant="outline">Read Whitepaper</Button>
      <Button variant="ghost">Learn More</Button>
    </div>
  )
}`

const sourceCode = `'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-bold uppercase tracking-widest transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95',
  {
    variants: {
      variant: {
        default: 'bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5',
        outline: 'border border-border bg-card/50 text-foreground hover:bg-muted hover:-translate-y-0.5',
        ghost: 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        link: 'text-accent-darker underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        default: 'h-12 px-8 py-3',
        sm: 'h-9 px-5 text-xs',
        lg: 'h-14 px-10 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  )
)
Button.displayName = 'Button'

export { Button, buttonVariants }`

export default function ButtonPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Base UI</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Button</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Primary interaction element with multiple variants and sizes. Supports all standard HTML button attributes.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview
        code={previewCode}
        storyId="ui-button--all-variants"
        previewClassName="gap-4 flex-wrap"
      >
        <div className="flex flex-wrap gap-4">
          <Button>Get Started</Button>
          <Button variant="outline">Read Whitepaper</Button>
          <Button variant="ghost">Learn More</Button>
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Variants</h2>
      <ComponentPreview code={`<Button variant="default">Default</Button>\n<Button variant="outline">Outline</Button>\n<Button variant="ghost">Ghost</Button>\n<Button variant="destructive">Destructive</Button>`}>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Sizes</h2>
      <ComponentPreview code={`<Button size="sm">Small</Button>\n<Button size="default">Default</Button>\n<Button size="lg">Large</Button>`}>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/ui/button.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'variant', type: "'default' | 'outline' | 'ghost' | 'destructive' | 'link'", defaultValue: "'default'", description: 'Visual style variant' },
        { name: 'size', type: "'default' | 'sm' | 'lg' | 'icon'", defaultValue: "'default'", description: 'Button size' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
        { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disable the button' },
        { name: 'onClick', type: '() => void', description: 'Click handler' },
      ]} />
    </div>
  )
}
