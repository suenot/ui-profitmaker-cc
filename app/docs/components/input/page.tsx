import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const sourceCode = `import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      ref={ref}
      {...props}
    />
  )
)
Input.displayName = 'Input'

export { Input }`

export default function InputPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Base UI</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Input</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Styled text input field with focus ring, consistent border radius, and placeholder styling.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={`<Input placeholder="Search markets..." />`} storyId="ui-input--default">
        <Input placeholder="Search markets..." className="max-w-sm" />
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Types</h2>
      <ComponentPreview code={`<Input placeholder="Search markets..." />\n<Input type="password" placeholder="Enter API key..." />\n<Input type="number" placeholder="0.001" />`}>
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <Input placeholder="Search markets..." />
          <Input type="password" placeholder="Enter API key..." />
          <Input type="number" placeholder="0.001" />
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/ui/input.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'type', type: 'string', defaultValue: "'text'", description: 'Input type (text, password, email, number, etc.)' },
        { name: 'placeholder', type: 'string', description: 'Placeholder text' },
        { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disable the input' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
