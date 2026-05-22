'use client'

import { Badge } from '@/components/ui/badge'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { Portfolio } from '@/components/trading/portfolio'

const sampleAssets = [
  { name: 'BTC', value: 42150.0, change: 2.4 },
  { name: 'ETH', value: 18320.5, change: -1.1 },
  { name: 'SOL', value: 6240.75, change: 5.8 },
  { name: 'USDT', value: 12000.0, change: 0.0 },
]

const previewCode = `import { Portfolio } from '@/components/trading/portfolio'

export default function Example() {
  return (
    <Portfolio
      currency="USD"
      assets={[
        { name: 'BTC', value: 42150.0, change: 2.4 },
        { name: 'ETH', value: 18320.5, change: -1.1 },
        { name: 'SOL', value: 6240.75, change: 5.8 },
        { name: 'USDT', value: 12000.0, change: 0.0 },
      ]}
    />
  )
}`

const sourceCode = `'use client'

import * as React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { cn } from '@/lib/utils'

export interface PortfolioAsset {
  name: string
  value: number
  percentage?: number
  change?: number
  color?: string
}

export interface PortfolioProps {
  assets: PortfolioAsset[]
  currency?: string
  title?: string
  subtitle?: string
  className?: string
}

// Renders a donut allocation chart plus a legend of asset rows.
// Percentages are auto-computed from values when not provided.`

export default function PortfolioPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Trading</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Portfolio</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Asset allocation overview with a donut chart and per-asset legend. Fully presentational — pass an
        <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">assets</code> array and it computes totals and shares for you.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="trading-portfolio--default">
        <Portfolio assets={sampleAssets} currency="USD" />
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/trading/portfolio.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'assets', type: 'PortfolioAsset[]', description: 'Assets to render: { name, value, percentage?, change?, color? }', required: true },
        { name: 'currency', type: 'string', defaultValue: "'USD'", description: 'Currency suffix for values' },
        { name: 'title', type: 'string', defaultValue: "'Portfolio'", description: 'Header title' },
        { name: 'subtitle', type: 'string', defaultValue: "'Asset allocation'", description: 'Header subtitle' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
