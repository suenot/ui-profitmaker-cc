'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={cn('p-2 rounded-xl hover:bg-accent/10 transition-colors text-muted-foreground hover:text-foreground', className)}
      aria-label="Toggle theme"
    >
      <Sun size={20} className="hidden dark:block" />
      <Moon size={20} className="block dark:hidden" />
    </button>
  )
}
