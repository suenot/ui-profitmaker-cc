import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { Logo } from './logo'
import { Github } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="relative w-8 h-8 text-foreground">
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-md group-hover:bg-accent/40 transition-colors" />
              <Logo className="relative w-full h-full" />
            </div>
            <span className="font-black text-lg tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              ui.profitmaker.cc
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/docs" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">
              Docs
            </Link>
            <a href="/storybook" className="text-sm font-bold text-muted-foreground hover:text-accent transition-colors uppercase tracking-widest">
              Components
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/suenot/ui-profitmaker-cc"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl hover:bg-accent/10 transition-colors text-muted-foreground hover:text-foreground"
          >
            <Github size={20} />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
