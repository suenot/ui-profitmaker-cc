'use client'

import * as React from 'react'
import { Search, Settings, Minus, Maximize2, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GroupColorSelector, DEFAULT_GROUPS, type Group } from './group-color-selector'

export interface WidgetProps {
  title: string
  children: React.ReactNode
  /** Optional instrument label shown in the header, e.g. "binance · BTC/USDT · spot". */
  instrument?: string
  groups?: Group[]
  /** Selected group id. Controlled when paired with onGroupChange, otherwise managed internally. */
  groupId?: string
  defaultGroupId?: string
  onGroupChange?: (groupId: string | undefined) => void
  showGroupSelector?: boolean
  /** Show the instrument-search (magnifier) control next to the group dot. */
  showInstrumentSearch?: boolean
  /** Called when the header instrument-search icon is clicked. */
  onInstrumentSearch?: () => void
  /** Called when the title is edited (double-click the title to edit). */
  onTitleChange?: (title: string) => void
  headerActions?: React.ReactNode
  onSettings?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
  onClose?: () => void
  className?: string
  contentClassName?: string
}

export function Widget({
  title,
  children,
  instrument,
  groups = DEFAULT_GROUPS,
  groupId,
  defaultGroupId,
  onGroupChange,
  showGroupSelector = true,
  showInstrumentSearch = true,
  onInstrumentSearch,
  onTitleChange,
  headerActions,
  onSettings,
  onMinimize,
  onMaximize,
  onClose,
  className,
  contentClassName,
}: WidgetProps) {
  const isControlled = groupId !== undefined || onGroupChange !== undefined
  const [internalGroupId, setInternalGroupId] = React.useState(defaultGroupId)
  const currentGroupId = isControlled ? groupId : internalGroupId

  const setGroup = (id: string | undefined) => {
    if (!isControlled) setInternalGroupId(id)
    onGroupChange?.(id)
  }

  const group = currentGroupId ? groups.find((g) => g.id === currentGroupId) : undefined
  const isTransparentGroup = !group || group.color === 'transparent'

  // Title editing (double-click to edit, like the profitmaker.cc terminal).
  const [committedTitle, setCommittedTitle] = React.useState(title)
  const [isEditing, setIsEditing] = React.useState(false)
  const [draft, setDraft] = React.useState(title)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    setCommittedTitle(title)
  }, [title])

  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const startEditing = () => {
    setDraft(committedTitle)
    setIsEditing(true)
  }

  const submitTitle = () => {
    setCommittedTitle(draft)
    setIsEditing(false)
    onTitleChange?.(draft)
  }

  const cancelEditing = () => {
    setDraft(committedTitle)
    setIsEditing(false)
  }

  return (
    <div className={cn('flex flex-col overflow-hidden rounded-lg border border-border bg-card', className)}>
      <div
        className={cn(
          'flex h-10 items-center justify-between gap-2 px-3 py-2',
          isTransparentGroup ? 'bg-transparent' : 'bg-muted/60',
        )}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2">
          {showGroupSelector && (
            <GroupColorSelector
              value={currentGroupId}
              onChange={setGroup}
              groups={groups}
              className="flex-shrink-0"
            />
          )}
          {showInstrumentSearch && (
            <button
              type="button"
              onClick={onInstrumentSearch}
              className="flex-shrink-0 rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-foreground"
              title="Search instrument"
            >
              <Search size={14} />
            </button>
          )}
          {instrument && (
            <span className="flex-shrink-0 text-xs text-muted-foreground">{instrument}</span>
          )}
          <div className="min-w-0 flex-1">
            {isEditing ? (
              <input
                ref={inputRef}
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') submitTitle()
                  else if (e.key === 'Escape') cancelEditing()
                }}
                onBlur={submitTitle}
                className="w-full min-w-0 border-none bg-transparent p-0 text-xs font-medium text-foreground outline-none"
              />
            ) : (
              <h3
                className="truncate text-xs font-medium text-foreground cursor-pointer"
                onDoubleClick={startEditing}
                title="Double click to edit"
              >
                {committedTitle}
              </h3>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          {headerActions}
          {onSettings && (
            <button
              type="button"
              onClick={onSettings}
              className="rounded-sm p-1 text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
              title="Widget Settings"
            >
              <Settings size={14} />
            </button>
          )}
          {onMinimize && (
            <button
              type="button"
              onClick={onMinimize}
              className="rounded-sm p-1 text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
              title="Collapse widget"
            >
              <Minus size={14} />
            </button>
          )}
          {onMaximize && (
            <button
              type="button"
              onClick={onMaximize}
              className="rounded-sm p-1 text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
              title="Maximize widget"
            >
              <Maximize2 size={14} />
            </button>
          )}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-sm p-1 text-muted-foreground transition-colors hover:bg-muted/40 hover:text-red-400"
              title="Close widget"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      <div className={cn('flex-1 overflow-auto p-3', contentClassName)}>{children}</div>
    </div>
  )
}
