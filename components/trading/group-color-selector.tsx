'use client'

import * as React from 'react'
import { Plus, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Group {
  id: string
  name: string
  /** Hex color, or 'transparent' for "no group". */
  color: string
  account?: string
  exchange?: string
  market?: string
  tradingPair?: string
}

export const GROUP_COLORS = [
  'transparent',
  '#00BCD4',
  '#F44336',
  '#9C27B0',
  '#2196F3',
  '#4CAF50',
  '#FF9800',
  '#E91E63',
] as const

const COLOR_NAMES: Record<string, string> = {
  transparent: 'Transparent',
  '#00BCD4': 'Cyan',
  '#F44336': 'Red',
  '#9C27B0': 'Purple',
  '#2196F3': 'Blue',
  '#4CAF50': 'Green',
  '#FF9800': 'Orange',
  '#E91E63': 'Pink',
}

export const DEFAULT_GROUPS: Group[] = GROUP_COLORS.map((color) => ({
  id: color === 'transparent' ? 'transparent' : COLOR_NAMES[color].toLowerCase(),
  name: COLOR_NAMES[color],
  color,
}))

function isConfigured(g: Group): boolean {
  return Boolean(g.account || g.exchange || g.market || g.tradingPair)
}

export interface GroupColorSelectorProps {
  value?: string
  onChange: (groupId: string | undefined) => void
  groups?: Group[]
  onResetGroup?: (groupId: string) => void
  className?: string
}

export function GroupColorSelector({
  value,
  onChange,
  groups = DEFAULT_GROUPS,
  onResetGroup,
  className,
}: GroupColorSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!isOpen) return
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [isOpen])

  const selected = value ? groups.find((g) => g.id === value) : undefined
  const isTransparent = !selected || selected.color === 'transparent'

  const select = (id: string | undefined) => {
    onChange(id)
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className={cn('relative inline-flex', className)}>
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        title={
          selected && !isTransparent
            ? `Group: ${selected.name} (click to change)`
            : 'Select group color'
        }
        className={cn(
          'flex h-3 w-3 items-center justify-center rounded-full border transition-colors',
          isTransparent ? 'border-muted-foreground hover:border-foreground' : 'hover:opacity-80',
        )}
        style={{
          backgroundColor: isTransparent ? 'transparent' : selected!.color,
          borderColor: isTransparent ? undefined : selected!.color,
        }}
      >
        {isTransparent && <Plus size={6} className="text-muted-foreground" />}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-72 rounded-md border border-border bg-card shadow-lg">
          <div className="max-h-72 overflow-y-auto p-2">
            {groups.map((group) => {
              const configured = isConfigured(group)
              return (
                <div
                  key={group.id}
                  onClick={() => select(group.id)}
                  className={cn(
                    'group flex cursor-pointer items-start gap-3 rounded px-3 py-2.5 text-sm hover:bg-muted/30',
                    value === group.id && 'bg-muted/40',
                  )}
                >
                  <span
                    className="mt-0.5 h-3 w-3 shrink-0 rounded-full border"
                    style={{
                      backgroundColor: group.color === 'transparent' ? 'transparent' : group.color,
                      borderColor: group.color === 'transparent' ? 'hsl(var(--border))' : group.color,
                    }}
                  />
                  <div className="flex-1 text-left">
                    {configured ? (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-400" title="Configured" />
                          <span className="font-medium text-foreground">{group.name} — Configured</span>
                        </div>
                        <div className="pl-3.5 text-xs text-muted-foreground">
                          {group.account && <span className="mr-2">{group.account}</span>}
                          {group.exchange && <span className="mr-2">• {group.exchange}</span>}
                          {group.market && <span className="mr-2">• {group.market}</span>}
                          {group.tradingPair && <span>• {group.tradingPair}</span>}
                        </div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">{group.name}</span>
                    )}
                  </div>
                  {configured && onResetGroup && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        onResetGroup(group.id)
                      }}
                      className="shrink-0 rounded p-1 opacity-0 transition-opacity hover:bg-muted/40 group-hover:opacity-100"
                      title="Reset group settings"
                    >
                      <X size={12} className="text-muted-foreground hover:text-foreground" />
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
