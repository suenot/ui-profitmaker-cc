import Link from 'next/link'
import { getComponentCountLabel } from '@/lib/component-count'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { OrderBook } from '@/components/trading/order-book'
import { Portfolio } from '@/components/trading/portfolio'
import { Header } from '@/components/site/header'
import { TradingShowcase } from '@/components/site/trading-showcase'

const sampleBids = [
  { price: 64012.5, amount: 0.842 },
  { price: 64011.0, amount: 1.305 },
  { price: 64009.5, amount: 0.517 },
  { price: 64008.0, amount: 2.114 },
  { price: 64006.5, amount: 0.933 },
]
const sampleAsks = [
  { price: 64014.0, amount: 0.621 },
  { price: 64015.5, amount: 1.087 },
  { price: 64017.0, amount: 0.444 },
  { price: 64018.5, amount: 1.762 },
  { price: 64020.0, amount: 0.298 },
]
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

function SectionHeader({ badge, title, subtitle }: { badge: string; title: string; subtitle: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-14">
      <Badge className="mb-4">{badge}</Badge>
      <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">{title}</h2>
      <p className="text-lg text-muted-foreground font-light leading-relaxed">{subtitle}</p>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative pt-28 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(96,165,250,0.10),transparent_60%)]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="mb-6">Open source · {getComponentCountLabel()} components</Badge>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[1.1] pb-2">
            <span className="bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">UI for </span>
            <span className="text-accent-darker">Profitmaker.cc</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto mt-6 mb-8 leading-relaxed">
            The component library behind the Profitmaker.cc trading terminal — primitives, forms, overlays, and
            live trading widgets like order books and portfolios. Copy-paste ready, built with Tailwind CSS and TypeScript.
          </p>
          <div className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-border bg-card/50 px-4 py-2 font-mono text-sm mb-10 max-w-full overflow-x-auto">
            <span className="text-accent-darker">import</span>
            <span className="text-foreground">{'{ OrderBook }'}</span>
            <span className="text-accent-darker">from</span>
            <span className="text-muted-foreground">{"'@/components/trading/order-book'"}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/docs">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/storybook">Open Storybook</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border py-12 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Components', value: getComponentCountLabel() },
              { label: 'TypeScript', value: '100%' },
              { label: 'Dark mode', value: 'Built-in' },
              { label: 'Copy-paste', value: 'Ready' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-black text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground font-light mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trading components preview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Trading"
            title="Built for Traders"
            subtitle="Domain-specific components — order books, portfolios, order forms, and deal lists — ready to drop into your terminal."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
            <div className="rounded-3xl border border-border bg-card/40 p-4 backdrop-blur-xl">
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3 px-2">Order Book · BTC/USDT</p>
              <div className="h-[420px]">
                <OrderBook bids={sampleBids} asks={sampleAsks} priceDecimals={1} amountDecimals={3} />
              </div>
            </div>
            <div className="rounded-3xl border border-border bg-card/40 p-6 backdrop-blur-xl">
              <Portfolio categories={sampleCategories} title="Balance" subtitle="Trading Portfolio" />
            </div>
          </div>
          <TradingShowcase />
          <div className="text-center mt-10">
            <Button asChild variant="outline">
              <Link href="/docs/components/order-book">Explore Trading Components →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Base UI preview */}
      <section className="py-24 bg-muted/5 border-y border-border">
        <div className="container mx-auto px-4">
          <SectionHeader badge="Base UI" title="Primitive Components" subtitle="Buttons, badges, cards, and inputs with consistent styling." />
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Buttons */}
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Button</p>
              <div className="flex flex-wrap gap-4">
                <Button>Place Order</Button>
                <Button variant="outline">Connect Exchange</Button>
                <Button variant="ghost">Learn More</Button>
                <Button size="sm">Small</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
            {/* Badges */}
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Badge</p>
              <div className="flex flex-wrap gap-3">
                <Badge>Live</Badge>
                <Badge variant="outline">Open Source</Badge>
                <Badge variant="default">New</Badge>
                <Badge variant="secondary">Beta</Badge>
              </div>
            </div>
            {/* Cards */}
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Card</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Trading Signal</CardTitle>
                    <CardDescription>AI-generated market signal based on technical analysis and sentiment data.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Badge variant="default">BUY</Badge>
                      <span className="text-sm text-muted-foreground">BTC/USDT · Confidence 87%</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio Summary</CardTitle>
                    <CardDescription>Total portfolio value across all connected exchanges.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-black text-foreground">$24,501.00</p>
                    <p className="text-sm text-green-400 font-bold mt-1">↑ +12.4% this month</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            {/* Input */}
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Input</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
                <Input placeholder="Search markets..." />
                <Input placeholder="Enter API key..." type="password" />
              </div>
            </div>
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline">
              <Link href="/docs/components">View All Components →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-muted/5">
        <div className="container mx-auto px-4 text-center">
          <p className="font-black text-lg text-foreground mb-2">ui.profitmaker.cc</p>
          <p className="text-muted-foreground font-light text-sm">
            Open source component library for{' '}
            <a href="https://profitmaker.cc" className="text-accent-darker hover:underline">
              profitmaker.cc
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
