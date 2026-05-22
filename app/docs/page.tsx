import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/docs/code-block'

export default function DocsPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Getting Started</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Introduction</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        <strong className="text-foreground font-bold">ui.profitmaker.cc</strong> is a collection of copy-paste ready React components
        built for the <a href="https://profitmaker.cc" className="text-accent-darker hover:underline">profitmaker.cc</a> AI trading platform.
        Components are built with Tailwind CSS, TypeScript, and follow the design system used across all profitmaker.cc products.
      </p>

      <h2 className="text-2xl font-black tracking-tight mb-4 mt-10">Two ways to use it</h2>
      <p className="text-muted-foreground font-light leading-relaxed mb-6">
        Install the <a href="/docs/installation" className="text-accent-darker hover:underline">npm package</a>{' '}
        <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">@profitmaker/ui</code> and import components
        directly — ESM, tree-shakeable, with a chunk per component for lazy loading. Or copy the source from any
        component&apos;s <strong className="text-foreground font-bold">Source</strong> tab into your project and own the
        code outright. Both stay in sync with the same design system.
      </p>

      <h2 className="text-2xl font-black tracking-tight mb-4 mt-10">Prerequisites</h2>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground font-light mb-8">
        <li>Next.js 14+ (App Router) or any React 18+ project</li>
        <li>Tailwind CSS 3.x configured</li>
        <li>TypeScript</li>
      </ul>

      <h2 className="text-2xl font-black tracking-tight mb-4 mt-10">Install dependencies</h2>
      <CodeBlock
        language="bash"
        code={`npm install clsx tailwind-merge class-variance-authority lucide-react next-themes`}
      />

      <h2 className="text-2xl font-black tracking-tight mb-4 mt-10">Add the utility</h2>
      <p className="text-muted-foreground font-light leading-relaxed mb-4">
        Create <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">lib/utils.ts</code>:
      </p>
      <CodeBlock
        language="ts"
        code={`import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}
      />

      <h2 className="text-2xl font-black tracking-tight mb-4 mt-10">Add CSS variables</h2>
      <p className="text-muted-foreground font-light leading-relaxed mb-4">
        Add the design tokens to your <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">globals.css</code>:
      </p>
      <CodeBlock
        language="css"
        code={`:root {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 100%;
  --card: 240 10% 4.9%;
  --muted: 240 3.7% 15.9%;
  --muted-foreground: 240 5% 64.9%;
  --accent: 245 72% 60%;
  --accent-foreground: 0 0% 100%;
  --accent-darker: 245 90% 82%;
  --border: 240 3.7% 20%;
  --radius: 1.5rem;
  --accent-rgb: 16, 185, 129;
}`}
      />
    </div>
  )
}
