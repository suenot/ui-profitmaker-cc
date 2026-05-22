import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'

const previewCode = `import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export default function Example() {
  return (
    <Card className="w-72">
      <CardHeader>
        <CardTitle>Trading Signal</CardTitle>
        <CardDescription>AI-generated signal for BTC/USDT</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-black">$42,180</p>
      </CardContent>
    </Card>
  )
}`

export default function CardPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Base UI</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Card</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Glassmorphism container with backdrop blur, border, and subtle background. Composed of header, content, and footer sub-components.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="ui-card--default">
        <Card className="w-72">
          <CardHeader>
            <CardTitle>Trading Signal</CardTitle>
            <CardDescription>AI-generated signal for BTC/USDT</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-black">$42,180</p>
            <p className="text-sm text-green-400 font-bold mt-1">↑ +3.2%</p>
          </CardContent>
        </Card>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'className', type: 'string', description: 'Additional CSS classes for the root element' },
      ]} />
    </div>
  )
}
