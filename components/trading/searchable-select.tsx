'use client'

import * as React from 'react'
import { useState, useRef, useEffect, useMemo } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { ChevronDown, Search, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SearchableSelectProps {
  value: string
  onValueChange: (value: string) => void
  options: string[]
  placeholder?: string
  searchPlaceholder?: string
  loading?: boolean
  className?: string
  disabled?: boolean
  optionLabels?: Record<string, string>
}

export function SearchableSelect({
  value,
  onValueChange,
  options,
  placeholder = 'Select option...',
  searchPlaceholder = 'Search options...',
  loading = false,
  className,
  disabled = false,
  optionLabels = {},
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options
    const query = searchQuery.toLowerCase()
    return options.filter((option) => {
      const label = optionLabels[option] || option
      return (
        option.toLowerCase().includes(query) ||
        label.toLowerCase().includes(query)
      )
    })
  }, [options, searchQuery, optionLabels])

  const shouldUseVirtualization = filteredOptions.length > 100

  const virtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => 32,
    enabled: shouldUseVirtualization,
  })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchQuery('')
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  const handleSelect = (option: string) => {
    onValueChange(option)
    setIsOpen(false)
    setSearchQuery('')
  }

  const handleToggle = () => {
    if (disabled || loading) return
    setIsOpen((prev) => !prev)
    if (!isOpen) setSearchQuery('')
  }

  const renderOption = (option: string) => {
    const isSelected = option === value
    return (
      <button
        key={option}
        type="button"
        onClick={() => handleSelect(option)}
        className={cn(
          'w-full px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground',
          'focus:bg-accent focus:text-accent-foreground focus:outline-none',
          isSelected && 'bg-accent font-medium text-accent-foreground',
        )}
      >
        {optionLabels[option] || option}
      </button>
    )
  }

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled || loading}
        className={cn(
          'flex h-8 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
          'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          isOpen && 'ring-2 ring-ring ring-offset-2',
        )}
      >
        <span className={cn('truncate', !value && 'text-muted-foreground')}>
          {value ? optionLabels[value] || value : placeholder}
        </span>
        <div className="flex items-center gap-1">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          <ChevronDown
            className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-md border border-border bg-popover shadow-lg">
          <div className="border-b border-border p-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full rounded border border-input bg-background py-1.5 pl-8 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
          </div>

          <div
            ref={listRef}
            className="max-h-60 overflow-auto"
            style={{
              height: shouldUseVirtualization ? '240px' : 'auto',
              maxHeight: '240px',
            }}
          >
            {filteredOptions.length === 0 ? (
              <div className="p-3 text-center text-sm text-muted-foreground">
                {searchQuery ? 'Nothing found' : 'No options available'}
              </div>
            ) : shouldUseVirtualization ? (
              <div
                style={{
                  height: virtualizer.getTotalSize(),
                  width: '100%',
                  position: 'relative',
                }}
              >
                {virtualizer.getVirtualItems().map((virtualItem) => {
                  const option = filteredOptions[virtualItem.index]
                  return (
                    <div
                      key={virtualItem.key}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: virtualItem.size,
                        transform: `translateY(${virtualItem.start}px)`,
                      }}
                    >
                      {renderOption(option)}
                    </div>
                  )
                })}
              </div>
            ) : (
              filteredOptions.map(renderOption)
            )}
          </div>

          {filteredOptions.length > 0 && (
            <div className="border-t border-border px-3 py-1.5 text-xs text-muted-foreground">
              {searchQuery
                ? `Found: ${filteredOptions.length} of ${options.length}`
                : `Total: ${options.length} options`}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
