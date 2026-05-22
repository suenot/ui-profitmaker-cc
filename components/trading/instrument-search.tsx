'use client'

import * as React from 'react'
import { useState, useMemo, useEffect, useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Instrument {
  account: string
  exchange: string
  market: string
  pair: string
}

export interface InstrumentSearchProps {
  value?: Instrument | null
  onChange: (instrument: Instrument | null) => void
  instruments: Instrument[]
  placeholder?: string
  className?: string
}

export function InstrumentSearch({
  value,
  onChange,
  instruments,
  placeholder = 'Search account | exchange | market | pair...',
  className,
}: InstrumentSearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const { filteredInstruments, totalFound } = useMemo(() => {
    if (!searchQuery.trim()) {
      const limited = instruments.slice(0, 100)
      return { filteredInstruments: limited, totalFound: instruments.length }
    }

    const searchWords = searchQuery
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0)

    if (searchWords.length === 0) {
      const limited = instruments.slice(0, 100)
      return { filteredInstruments: limited, totalFound: instruments.length }
    }

    const allMatches = instruments.filter((instrument) =>
      searchWords.every(
        (word) =>
          instrument.account.toLowerCase().includes(word) ||
          instrument.exchange.toLowerCase().includes(word) ||
          instrument.market.toLowerCase().includes(word) ||
          instrument.pair.toLowerCase().includes(word),
      ),
    )

    return {
      filteredInstruments: allMatches.slice(0, 200),
      totalFound: allMatches.length,
    }
  }, [instruments, searchQuery])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setHighlightedIndex((prev) =>
            prev < filteredInstruments.length - 1 ? prev + 1 : 0,
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredInstruments.length - 1,
          )
          break
        case 'Enter':
          e.preventDefault()
          if (filteredInstruments[highlightedIndex]) {
            handleSelect(filteredInstruments[highlightedIndex])
          }
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

  const handleSelect = (instrument: Instrument) => {
    onChange(instrument)
    setIsOpen(false)
    setSearchQuery('')
    setHighlightedIndex(0)
  }

  const handleClear = () => {
    onChange(null)
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
    ? `${value.account} | ${value.exchange} | ${value.market} | ${value.pair}`
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
          className="w-full rounded border border-border bg-background py-2 pl-10 pr-10 text-sm focus:border-muted focus:outline-none"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 transition-colors hover:bg-muted/20"
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

function VirtualizedInstrumentsList({
  instruments,
  totalFound,
  highlightedIndex,
  onSelect,
}: {
  instruments: Instrument[]
  totalFound: number
  highlightedIndex: number
  onSelect: (instrument: Instrument) => void
}) {
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: instruments.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
    overscan: 5,
  })

  useEffect(() => {
    if (instruments.length > 0) {
      virtualizer.scrollToIndex(highlightedIndex, { align: 'auto' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlightedIndex])

  if (instruments.length === 0) {
    return (
      <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-md border border-border bg-card shadow-lg">
        <div className="px-3 py-4 text-center text-sm text-muted-foreground">
          No accountInstrumentIds found
        </div>
        <div className="border-t border-border/50 bg-background/50 px-3 py-2">
          <div className="text-center text-xs text-muted-foreground">
            Found <span className="font-medium text-foreground">0</span> of{' '}
            <span className="font-medium text-foreground">{totalFound}</span> accountInstrumentIds
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-80 overflow-hidden rounded-md border border-border bg-card shadow-lg">
      <div ref={parentRef} className="h-72 overflow-auto" style={{ contain: 'strict' }}>
        <div
          style={{
            height: virtualizer.getTotalSize(),
            width: '100%',
            position: 'relative',
          }}
        >
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
                    'cursor-pointer border-b border-border/50 px-3 py-3 last:border-b-0',
                    isHighlighted ? 'bg-muted/20' : 'hover:bg-muted/10',
                  )}
                >
                  <div className="grid grid-cols-1 gap-1 text-xs">
                    <div className="font-medium text-foreground">
                      <span className="text-muted-foreground">Account:</span> {instrument.account}
                    </div>
                    <div className="text-foreground">
                      <span className="text-muted-foreground">Exchange:</span> {instrument.exchange}
                    </div>
                    <div className="text-foreground">
                      <span className="text-muted-foreground">Market:</span> {instrument.market}
                    </div>
                    <div className="text-foreground">
                      <span className="text-muted-foreground">Pair:</span> {instrument.pair}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="border-t border-border/50 bg-background/50 px-3 py-2">
        <div className="text-center text-xs text-muted-foreground">
          Showing <span className="font-medium text-foreground">{instruments.length}</span> of{' '}
          <span className="font-medium text-foreground">{totalFound}</span> accountInstrumentIds
        </div>
      </div>
    </div>
  )
}
