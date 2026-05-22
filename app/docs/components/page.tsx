import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const components = [
  { title: 'Button', href: '/docs/components/button', category: 'Base UI', description: 'Primary interaction element with multiple variants.' },
  { title: 'Badge', href: '/docs/components/badge', category: 'Base UI', description: 'Small label for status, tags, or categories.' },
  { title: 'Card', href: '/docs/components/card', category: 'Base UI', description: 'Glassmorphism container with header, content, and footer.' },
  { title: 'Input', href: '/docs/components/input', category: 'Base UI', description: 'Styled text input for forms and search.' },
  { title: 'Checkbox', href: '/docs/components/checkbox', category: 'Forms', description: 'Accessible checkbox with checked and unchecked states.' },
  { title: 'Label', href: '/docs/components/label', category: 'Forms', description: 'Accessible label associated with form controls.' },
  { title: 'Radio Group', href: '/docs/components/radio-group', category: 'Forms', description: 'Set of mutually-exclusive radio options.' },
  { title: 'Select', href: '/docs/components/select', category: 'Forms', description: 'Dropdown select with keyboard navigation.' },
  { title: 'Switch', href: '/docs/components/switch', category: 'Forms', description: 'Toggle switch for on/off settings.' },
  { title: 'Slider', href: '/docs/components/slider', category: 'Forms', description: 'Draggable slider for selecting a numeric value.' },
  { title: 'Textarea', href: '/docs/components/textarea', category: 'Forms', description: 'Multi-line text input for longer content.' },
  { title: 'Toggle', href: '/docs/components/toggle', category: 'Forms', description: 'Two-state button for toggling a setting.' },
  { title: 'Accordion', href: '/docs/components/accordion', category: 'Overlays & Display', description: 'Vertically stacked, collapsible content sections.' },
  { title: 'Alert', href: '/docs/components/alert', category: 'Overlays & Display', description: 'Callout for important messages and status.' },
  { title: 'Avatar', href: '/docs/components/avatar', category: 'Overlays & Display', description: 'User image with graceful text fallback.' },
  { title: 'Dialog', href: '/docs/components/dialog', category: 'Overlays & Display', description: 'Modal dialog overlaying the page content.' },
  { title: 'Dropdown Menu', href: '/docs/components/dropdown-menu', category: 'Overlays & Display', description: 'Menu of actions triggered by a button.' },
  { title: 'Popover', href: '/docs/components/popover', category: 'Overlays & Display', description: 'Floating content anchored to a trigger.' },
  { title: 'Tooltip', href: '/docs/components/tooltip', category: 'Overlays & Display', description: 'Contextual hint shown on hover or focus.' },
  { title: 'Tabs', href: '/docs/components/tabs', category: 'Overlays & Display', description: 'Switch between related panels of content.' },
  { title: 'Separator', href: '/docs/components/separator', category: 'Overlays & Display', description: 'Visual or semantic divider between content.' },
  { title: 'Skeleton', href: '/docs/components/skeleton', category: 'Overlays & Display', description: 'Placeholder shimmer for loading states.' },
  { title: 'Progress', href: '/docs/components/progress', category: 'Overlays & Display', description: 'Progress bar indicating completion.' },
  { title: 'Scroll Area', href: '/docs/components/scroll-area', category: 'Overlays & Display', description: 'Custom-styled scrollable region.' },
  { title: 'Table', href: '/docs/components/table', category: 'Overlays & Display', description: 'Structured rows and columns of data.' },
  { title: 'Searchable Select', href: '/docs/components/searchable-select', category: 'Trading', description: 'Virtualized dropdown with type-ahead search for large lists.' },
  { title: 'Timeframe Select', href: '/docs/components/timeframe-select', category: 'Trading', description: 'Compact picker for chart timeframes (1m–1w).' },
  { title: 'Instrument Search', href: '/docs/components/instrument-search', category: 'Trading', description: 'Virtualized search across trading instruments.' },
  { title: 'Portfolio', href: '/docs/components/portfolio', category: 'Trading', description: 'Asset allocation pie chart with balances.' },
  { title: 'Order Book', href: '/docs/components/order-book', category: 'Trading', description: 'Live bid/ask depth ladder with spread.' },
  { title: 'Order Form', href: '/docs/components/order-form', category: 'Trading', description: 'Buy/sell order entry with limit and market types.' },
  { title: 'Deals List', href: '/docs/components/deals-list', category: 'Trading', description: 'Table of open and closed trading deals with P&L.' },
]

export default function ComponentsPage() {
  return (
    <div className="max-w-4xl">
      <Badge className="mb-4">Reference</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Components</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-10">
        All components are copy-paste ready. Click any component to see usage examples, props, and source code.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {components.map((c) => (
          <Link key={c.href} href={c.href} className="group block">
            <Card className="h-full transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <CardTitle className="text-lg group-hover:text-accent transition-colors">{c.title}</CardTitle>
                  <Badge variant="muted" className="shrink-0 text-xs">{c.category}</Badge>
                </div>
                <CardDescription>{c.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
