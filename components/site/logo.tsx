import { cn } from '@/lib/utils'

const sizeClasses = {
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-2xl',
} as const

export function Logo({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  return (
    <span className={cn('font-black tracking-tight whitespace-nowrap', sizeClasses[size], className)}>
      <span className="text-foreground">ui.</span>
      <span className="text-accent-darker">profitmaker</span>
      <span className="text-muted-foreground">.cc</span>
    </span>
  )
}
