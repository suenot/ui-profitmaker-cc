'use client'

import * as React from 'react'
import { useMemo } from 'react'
import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

export const TIMEFRAME_LABELS: Record<string, string> = {
  '1m': '1m',
  '3m': '3m',
  '5m': '5m',
  '15m': '15m',
  '30m': '30m',
  '1h': '1h',
  '2h': '2h',
  '4h': '4h',
  '6h': '6h',
  '12h': '12h',
  '1d': '1d',
  '1w': '1w',
  '1M': '1M',
}

export interface TimeframeSelectProps {
  value: string
  onChange: (timeframe: string) => void
  availableTimeframes?: string[]
  floating?: boolean
  className?: string
}

export function TimeframeSelect({
  value,
  onChange,
  availableTimeframes,
  floating = false,
  className,
}: TimeframeSelectProps) {
  const options = useMemo(() => {
    const timeframes = availableTimeframes ?? Object.keys(TIMEFRAME_LABELS)
    return timeframes.map((tf) => ({
      id: tf,
      label: TIMEFRAME_LABELS[tf] || tf.toUpperCase(),
    }))
  }, [availableTimeframes])

  // If the current value isn't available, fall back to the first option (and notify).
  const currentValue = useMemo(() => {
    if (options.length === 0) return value
    if (options.some((tf) => tf.id === value)) return value
    const first = options[0].id
    setTimeout(() => onChange(first), 0)
    return first
  }, [value, options, onChange])

  return (
    <div
      className={cn(
        'flex items-center gap-1 rounded-lg border border-border bg-background/90 p-1 shadow-lg backdrop-blur-sm',
        floating && 'absolute bottom-4 right-4 z-10',
        className,
      )}
    >
      <Clock className="pointer-events-none ml-1 h-3 w-3 text-muted-foreground" />
      <select
        value={currentValue}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-[2.5rem] cursor-pointer appearance-none border-none bg-transparent px-1 py-1 text-sm text-foreground outline-none"
        style={{
          background: 'transparent',
          WebkitAppearance: 'none',
          MozAppearance: 'none',
        }}
      >
        {options.map((tf) => (
          <option key={tf.id} value={tf.id} className="bg-background text-foreground">
            {tf.label}
          </option>
        ))}
      </select>
    </div>
  )
}
