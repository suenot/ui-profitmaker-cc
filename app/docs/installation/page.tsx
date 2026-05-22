import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/docs/code-block'

export const metadata = {
  title: 'Installation · ui.profitmaker.cc',
  description: 'Install the @profitmaker/ui component library from npm.',
}

export default function InstallationPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Getting Started</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Installation</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        The components ship as an npm package,{' '}
        <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">@profitmaker/ui</code>. Install it, wire up
        the Tailwind preset and design tokens, then import only what you need — the package is ESM with{' '}
        <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">sideEffects: false</code> and a chunk per
        component, so unused widgets are tree-shaken and lazy imports load a single chunk.
      </p>

      <h2 className="text-2xl font-black tracking-tight mb-4 mt-10">1. Install</h2>
      <CodeBlock language="bash" code={`npm install @profitmaker/ui`} />
      <p className="text-muted-foreground font-light leading-relaxed mt-4 mb-4">
        Peer dependencies <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">react</code> and{' '}
        <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">react-dom</code> (&gt;= 18) are expected to
        already be in your app.
      </p>

      <h2 className="text-2xl font-black tracking-tight mb-4 mt-10">2. Import the design tokens</h2>
      <p className="text-muted-foreground font-light leading-relaxed mb-4">
        Import once at the root of your app (e.g.{' '}
        <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">app/layout.tsx</code>):
      </p>
      <CodeBlock language="tsx" code={`import '@profitmaker/ui/styles.css'`} />

      <h2 className="text-2xl font-black tracking-tight mb-4 mt-10">3. Configure Tailwind</h2>
      <p className="text-muted-foreground font-light leading-relaxed mb-4">
        Add the preset (maps the token CSS variables to color/radius utilities) and include the package in{' '}
        <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">content</code> so its classes are not purged:
      </p>
      <CodeBlock
        language="js"
        code={`// tailwind.config.js
module.exports = {
  presets: [require('@profitmaker/ui/tailwind-preset')],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@profitmaker/ui/dist/**/*.js',
  ],
}`}
      />

      <h2 className="text-2xl font-black tracking-tight mb-4 mt-10">4. Use a component</h2>
      <p className="text-muted-foreground font-light leading-relaxed mb-4">
        Named imports from the package root. Tree-shaking drops everything you don&apos;t reference:
      </p>
      <CodeBlock
        language="tsx"
        code={`import { Button, OrderBook } from '@profitmaker/ui'

export function Example() {
  return (
    <div className="h-[400px] w-72">
      <OrderBook
        bids={[{ price: 64012.5, amount: 0.84 }]}
        asks={[{ price: 64014.0, amount: 0.62 }]}
        priceDecimals={1}
        amountDecimals={3}
      />
    </div>
  )
}`}
      />

      <h2 className="text-2xl font-black tracking-tight mb-4 mt-10">Per-component imports &amp; lazy loading</h2>
      <p className="text-muted-foreground font-light leading-relaxed mb-4">
        Every component is also exported on its own subpath. Use these with{' '}
        <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">next/dynamic</code> or{' '}
        <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">React.lazy</code> so the bundler loads only
        that component&apos;s chunk — a barrel import would pull the whole library into the dynamic chunk.
      </p>
      <CodeBlock
        language="tsx"
        code={`// Static, minimal subpath import
import { OrderBook } from '@profitmaker/ui/order-book'

// Lazy — only the order-book chunk is fetched on demand
import dynamic from 'next/dynamic'
const OrderBook = dynamic(() =>
  import('@profitmaker/ui/order-book').then((m) => m.OrderBook),
)`}
      />
      <p className="text-muted-foreground font-light leading-relaxed mt-4 mb-4">
        The trading widgets carry a{' '}
        <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">&apos;use client&apos;</code> directive that
        is preserved in the build, so they work as client components inside the Next.js App Router without extra
        wrapping.
      </p>

      <h2 className="text-2xl font-black tracking-tight mb-4 mt-10">Prefer to copy the source?</h2>
      <p className="text-muted-foreground font-light leading-relaxed mb-4">
        Every component page has a <strong className="text-foreground font-bold">Source</strong> tab — you can paste the
        file straight into <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/</code> instead
        of installing the package. In that case install the primitives the file uses:
      </p>
      <CodeBlock
        language="bash"
        code={`npm install clsx tailwind-merge class-variance-authority lucide-react @radix-ui/react-slot`}
      />
    </div>
  )
}
