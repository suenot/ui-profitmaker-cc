'use client'

import * as React from 'react'
import { useState, useMemo, useEffect, useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Instrument {
  symbol: string
  name?: string
  exchange?: string
  type?: string
}

export interface InstrumentSearchProps {
  value?: Instrument | null
  onSelect: (instrument: Instrument | null) => void
  instruments: Instrument[]
  placeholder?: string
  className?: string
}

export const InstrumentSearch: React.FC<InstrumentSearchProps> = ({
  value,
  onSelect,
  instruments,
  placeholder = 'Search symbol | name | exchange...',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const { filteredInstruments, totalFound } = useMemo(() => {
    if (!searchQuery.trim()) {
      return { filteredInstruments: instruments.slice(0, 200), totalFound: instruments.length }
    }
    const searchWords = searchQuery
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0)

    if (searchWords.length === 0) {
      return { filteredInstruments: instruments.slice(0, 200), totalFound: instruments.length }
    }

    const allMatches = instruments.filter((instrument) =>
      searchWords.every(
        (word) =>
          instrument.symbol.toLowerCase().includes(word) ||
          (instrument.name?.toLowerCase().includes(word) ?? false) ||
          (instrument.exchange?.toLowerCase().includes(word) ?? false) ||
          (instrument.type?.toLowerCase().includes(word) ?? false)
      )
    )

    return { filteredInstruments: allMatches.slice(0, 200), totalFound: allMatches.length }
  }, [instruments, searchQuery])

  const handleSelect = (instrument: Instrument) => {
    onSelect(instrument)
    setIsOpen(false)
    setSearchQuery('')
    setHighlightedIndex(0)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setHighlightedIndex((prev) => (prev < filteredInstruments.length - 1 ? prev + 1 : 0))
          break
        case 'ArrowUp':
          e.preventDefault()
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : filteredInstruments.length - 1))
          break
        case 'Enter':
          e.preventDefault()
          if (filteredInstruments[highlightedIndex]) handleSelect(filteredInstruments[highlightedIndex])
          break
        case 'Escape':
          e.preventDefault()
          setIsOpen(false)
          inputRef.current?.blur()
          break
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, filteredInstruments, highlightedIndex])

  const handleClear = () => {
    onSelect(null)
    setSearchQuery('')
    setHighlightedIndex(0)
    inputRef.current?.focus()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setHighlightedIndex(0)
    if (!isOpen) setIsOpen(true)
  }

  const displayValue = value
    ? [value.symbol, value.name, value.exchange].filter(Boolean).join(' | ')
    : ''

  return (
    <div className={cn('relative', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={isOpen ? searchQuery : displayValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onBlur={(e) => {
            setTimeout(() => {
              if (!e.currentTarget.contains(document.activeElement)) {
                setIsOpen(false)
                setSearchQuery('')
              }
            }, 200)
          }}
          placeholder={placeholder}
          className="w-full rounded border border-border bg-card py-2 pl-10 pr-10 text-sm text-foreground focus:border-accent focus:outline-none"
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 transition-colors hover:bg-muted"
            title="Clear selection"
          >
            <X size={12} className="text-muted-foreground hover:text-foreground" />
          </button>
        )}
      </div>

      {isOpen && (
        <VirtualizedInstrumentsList
          instruments={filteredInstruments}
          totalFound={totalFound}
          highlightedIndex={highlightedIndex}
          onSelect={handleSelect}
        />
      )}
    </div>
  )
}

const VirtualizedInstrumentsList: React.FC<{
  instruments: Instrument[]
  totalFound: number
  highlightedIndex: number
  onSelect: (instrument: Instrument) => void
}> = ({ instruments, totalFound, highlightedIndex, onSelect }) => {
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: instruments.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 56,
    overscan: 5,
  })

  if (instruments.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-md border border-border bg-popover shadow-lg">
        <div className="px-3 py-4 text-center text-sm text-muted-foreground">No instruments found</div>
        <div className="border-t border-border/50 bg-card/50 px-3 py-2">
          <div className="text-center text-xs text-muted-foreground">
            Found <span className="font-medium text-foreground">0</span> of{' '}
            <span className="font-medium text-foreground">{totalFound}</span> instruments
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-80 overflow-hidden rounded-md border border-border bg-popover shadow-lg">
      <div ref={parentRef} className="h-72 overflow-auto" style={{ contain: 'strict' }}>
        <div style={{ height: virtualizer.getTotalSize(), width: '100%', position: 'relative' }}>
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const instrument = instruments[virtualRow.index]
            const isHighlighted = virtualRow.index === highlightedIndex
            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={virtualizer.measureElement}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div
                  onClick={() => onSelect(instrument)}
                  className={cn(
                    'cursor-pointer border-b border-border/50 px-3 py-2.5 last:border-b-0',
                    isHighlighted ? 'bg-muted' : 'hover:bg-muted/60'
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-foreground">{instrument.symbol}</span>
                    {instrument.exchange && (
                      <span className="text-xs uppercase tracking-wider text-muted-foreground">
                        {instrument.exchange}
                      </span>
                    )}
                  </div>
                  {(instrument.name || instrument.type) && (
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                      {instrument.name && <span>{instrument.name}</span>}
                      {instrument.type && <span className="opacity-70">· {instrument.type}</span>}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="border-t border-border/50 bg-card/50 px-3 py-2">
        <div className="text-center text-xs text-muted-foreground">
          Showing <span className="font-medium text-foreground">{instruments.length}</span> of{' '}
          <span className="font-medium text-foreground">{totalFound}</span> instruments
        </div>
      </div>
    </div>
  )
}
