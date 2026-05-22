'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-bold uppercase tracking-widest transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
  {
    variants: {
      variant: {
        default: 'bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5',
        outline: 'border border-border bg-card/50 text-foreground hover:bg-muted hover:-translate-y-0.5',
        ghost: 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        link: 'text-accent-darker underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        default: 'h-12 px-8 py-3',
        sm: 'h-9 px-5 text-xs',
        lg: 'h-14 px-10 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
