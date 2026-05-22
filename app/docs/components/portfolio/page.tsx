'use client'

import { Badge } from '@/components/ui/badge'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { Portfolio } from '@/components/trading/portfolio'

const sampleCategories = [
  {
    id: 'currency',
    name: 'Currency and Metals',
    total: '1 110,73 ₽',
    share: '0,01%',
    items: [
      { symbol: 'RUB', name: 'Russian Ruble', quantity: '1 026,85', price: '', avg: '', value: '1 026,85 ₽', share: '0,01%', profit: '', profitPercent: '' },
      { symbol: 'EUR', name: 'Euro', quantity: '0,72', price: '93,6650 ₽', avg: '79,0475 ₽', value: '67,44 ₽', share: '≈0,00%', profit: '10,52 ₽', profitPercent: '18,49%' },
      { symbol: 'USD', name: 'US Dollar', quantity: '0,19', price: '86,5675 ₽', avg: '91,8200 ₽', value: '16,45 ₽', share: '≈0,00%', profit: '-1,00 ₽', profitPercent: '-5,72%' },
    ],
  },
  {
    id: 'funds',
    name: 'Funds',
    total: '13 404 600,00 ₽',
    share: '99,99%',
    items: [
      { symbol: 'LQDT', name: 'LQDT', quantity: '8 250 000', price: '1,6248 ₽', avg: '1,3589 ₽', value: '13 404 600,00 ₽', share: '99,99%', profit: '2 193 526,50 ₽', profitPercent: '19,57%' },
    ],
  },
]

const previewCode = `import { Portfolio } from '@/components/trading/portfolio'

export default function Example() {
  return (
    <div className="h-[480px]">
      <Portfolio
        categories={[
          {
            id: 'currency',
            name: 'Currency and Metals',
            total: '1 110,73 ₽',
            share: '0,01%',
            items: [
              { symbol: 'RUB', name: 'Russian Ruble', quantity: '1 026,85', price: '', avg: '', value: '1 026,85 ₽', share: '0,01%', profit: '', profitPercent: '' },
            ],
          },
        ]}
      />
    </div>
  )
}`

const sourceCode = `'use client'

import * as React from 'react'
import { ChevronDown, ChevronRight, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface PortfolioAsset {
  symbol: string
  name: string
  quantity: string
  price: string
  avg: string
  value: string
  share: string
  profit: string
  profitPercent: string
}

export interface PortfolioCategory {
  id: string
  name: string
  total: string
  share: string
  items: PortfolioAsset[]
}

export interface PortfolioProps {
  categories: PortfolioCategory[]
  title?: string
  subtitle?: string
  todayChange?: { value: string; percent: string }
  allTimeChange?: { value: string; percent: string }
  className?: string
}

// Balance header with Today / All Time stat cards and an 8-column table of
// expandable categories (click to toggle) with colored asset-row avatars.`

export default function PortfolioPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Trading</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Portfolio</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Trading portfolio balance view with Today / All Time stat cards and an expandable 8-column asset table. Fully presentational — pass a
        <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">categories</code> array of pre-formatted rows.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="trading-portfolio--default">
        <div className="h-[480px] w-full">
          <Portfolio categories={sampleCategories} />
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/trading/portfolio.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'categories', type: 'PortfolioCategory[]', description: 'Expandable groups, each with id, name, total, share, and items[] of pre-formatted asset strings', required: true },
        { name: 'title', type: 'string', defaultValue: "'Balance'", description: 'Header title' },
        { name: 'subtitle', type: 'string', defaultValue: "'Trading Portfolio'", description: 'Header subtitle' },
        { name: 'todayChange', type: '{ value, percent }', description: "Today stat card values, e.g. { value: '8 248,37 ₽', percent: '0,06%' }" },
        { name: 'allTimeChange', type: '{ value, percent }', description: 'All Time stat card values' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
