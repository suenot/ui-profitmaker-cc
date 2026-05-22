import { Badge } from '@/components/ui/badge'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'

export default function BadgePage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Base UI</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Badge</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Small inline label for status indicators, tags, categories, or feature flags.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview
        code={`<Badge>AI & Fintech</Badge>\n<Badge variant="outline">Open Source</Badge>\n<Badge variant="solid">New</Badge>\n<Badge variant="muted">Beta</Badge>`}
        storyId="ui-badge--all-variants"
      >
        <div className="flex flex-wrap gap-3">
          <Badge>AI & Fintech</Badge>
          <Badge variant="outline">Open Source</Badge>
          <Badge variant="solid">New</Badge>
          <Badge variant="muted">Beta</Badge>
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'variant', type: "'default' | 'outline' | 'solid' | 'muted'", defaultValue: "'default'", description: 'Visual style variant' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
