'use client'

import * as React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { cn } from '@/lib/utils'

export interface PortfolioAsset {
  name: string
  value: number
  percentage?: number
  change?: number
  color?: string
}

export interface PortfolioProps {
  assets: PortfolioAsset[]
  currency?: string
  title?: string
  subtitle?: string
  className?: string
}

const DEFAULT_COLORS = ['#22d3ee', '#a78bfa', '#f472b6', '#facc15', '#34d399', '#fb923c', '#60a5fa']

function formatValue(value: number, currency: string) {
  return `${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`
}

export function Portfolio({
  assets,
  currency = 'USD',
  title = 'Portfolio',
  subtitle = 'Asset allocation',
  className,
}: PortfolioProps) {
  const total = assets.reduce((sum, a) => sum + a.value, 0)
  const data = assets.map((a, i) => ({
    ...a,
    color: a.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length],
    percentage: a.percentage ?? (total > 0 ? (a.value / total) * 100 : 0),
  }))

  return (
    <div className={cn('flex w-full flex-col gap-5 rounded-2xl border border-border bg-card/40 p-5 text-foreground', className)}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-bold">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <div className="text-right">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Total</div>
          <div className="text-lg font-bold">{formatValue(total, currency)}</div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 sm:flex-row">
        <div className="relative h-44 w-44 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={2}
                stroke="none"
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs text-muted-foreground">{data.length} assets</span>
          </div>
        </div>

        <div className="flex w-full flex-col gap-1">
          {data.map((asset) => (
            <div
              key={asset.name}
              className="flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-muted/40"
            >
              <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: asset.color }} />
              <div className="flex-1 min-w-0">
                <div className="truncate text-sm font-medium">{asset.name}</div>
                <div className="text-xs text-muted-foreground">{asset.percentage.toFixed(2)}%</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{formatValue(asset.value, currency)}</div>
                {typeof asset.change === 'number' && (
                  <div className={cn('text-xs', asset.change >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {asset.change >= 0 ? '+' : ''}
                    {asset.change.toFixed(2)}%
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
