'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const nav = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs' },
      { title: 'Installation', href: '/docs/installation' },
    ],
  },
  {
    title: 'Base UI',
    items: [
      { title: 'Button', href: '/docs/components/button' },
      { title: 'Badge', href: '/docs/components/badge' },
      { title: 'Card', href: '/docs/components/card' },
      { title: 'Input', href: '/docs/components/input' },
    ],
  },
  {
    title: 'Forms',
    items: [
      { title: 'Checkbox', href: '/docs/components/checkbox' },
      { title: 'Label', href: '/docs/components/label' },
      { title: 'Radio Group', href: '/docs/components/radio-group' },
      { title: 'Select', href: '/docs/components/select' },
      { title: 'Switch', href: '/docs/components/switch' },
      { title: 'Slider', href: '/docs/components/slider' },
      { title: 'Textarea', href: '/docs/components/textarea' },
      { title: 'Toggle', href: '/docs/components/toggle' },
    ],
  },
  {
    title: 'Overlays & Display',
    items: [
      { title: 'Accordion', href: '/docs/components/accordion' },
      { title: 'Alert', href: '/docs/components/alert' },
      { title: 'Avatar', href: '/docs/components/avatar' },
      { title: 'Dialog', href: '/docs/components/dialog' },
      { title: 'Dropdown Menu', href: '/docs/components/dropdown-menu' },
      { title: 'Popover', href: '/docs/components/popover' },
      { title: 'Tooltip', href: '/docs/components/tooltip' },
      { title: 'Tabs', href: '/docs/components/tabs' },
      { title: 'Separator', href: '/docs/components/separator' },
      { title: 'Skeleton', href: '/docs/components/skeleton' },
      { title: 'Progress', href: '/docs/components/progress' },
      { title: 'Scroll Area', href: '/docs/components/scroll-area' },
      { title: 'Table', href: '/docs/components/table' },
    ],
  },
  {
    title: 'Trading',
    items: [
      { title: 'Searchable Select', href: '/docs/components/searchable-select' },
      { title: 'Timeframe Select', href: '/docs/components/timeframe-select' },
      { title: 'Instrument Search', href: '/docs/components/instrument-search' },
      { title: 'Portfolio', href: '/docs/components/portfolio' },
      { title: 'Order Book', href: '/docs/components/order-book' },
      { title: 'Order Form', href: '/docs/components/order-form' },
      { title: 'Deals List', href: '/docs/components/deals-list' },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 shrink-0 hidden lg:block">
      <div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto pr-4 py-8">
        {nav.map((section) => (
          <div key={section.title} className="mb-8">
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3 px-3">
              {section.title}
            </p>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'block px-3 py-2 rounded-xl text-sm transition-all duration-200',
                      pathname === item.href
                        ? 'bg-accent/10 text-accent-darker font-bold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/40 font-medium'
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  )
}
