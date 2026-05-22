'use client'

import * as React from 'react'
import { useMemo } from 'react'
import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

export type TimeframeOption = string | { value: string; label: string }

export interface TimeframeSelectProps {
  value: string
  onChange: (timeframe: string) => void
  /** List of available timeframes, either plain strings or {value,label} objects */
  timeframes?: TimeframeOption[]
  className?: string
}

const DEFAULT_TIMEFRAMES: string[] = ['1m', '5m', '15m', '1h', '4h', '1d', '1w']

export const TimeframeSelect: React.FC<TimeframeSelectProps> = ({
  value,
  onChange,
  timeframes = DEFAULT_TIMEFRAMES,
  className,
}) => {
  const options = useMemo(
    () =>
      timeframes.map((tf) =>
        typeof tf === 'string' ? { value: tf, label: tf } : tf
      ),
    [timeframes]
  )

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-lg border border-border bg-card/90 p-1 shadow-lg backdrop-blur-sm',
        className
      )}
    >
      <Clock className="ml-1 h-3 w-3 pointer-events-none text-muted-foreground" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-[2.5rem] cursor-pointer appearance-none border-none bg-transparent py-1 pl-1 pr-1 text-sm text-foreground outline-none"
        style={{ background: 'transparent', WebkitAppearance: 'none', MozAppearance: 'none' }}
      >
        {options.map((tf) => (
          <option key={tf.value} value={tf.value} className="bg-card text-foreground">
            {tf.label}
          </option>
        ))}
      </select>
    </div>
  )
}
