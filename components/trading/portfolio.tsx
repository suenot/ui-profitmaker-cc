'use client'

import * as React from 'react'
import { ChevronDown, ChevronRight, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface PortfolioAsset {
  symbol: string
  name: string
  quantity: string
  price: string
  avg: string
  value: string
  share: string
  profit: string
  profitPercent: string
}

export interface PortfolioCategory {
  id: string
  name: string
  total: string
  share: string
  items: PortfolioAsset[]
}

export interface PortfolioChange {
  value: string
  percent: string
}

export interface PortfolioProps {
  categories: PortfolioCategory[]
  title?: string
  subtitle?: string
  todayChange?: PortfolioChange
  allTimeChange?: PortfolioChange
  className?: string
}

const defaultCategories: PortfolioCategory[] = [
  {
    id: 'currency',
    name: 'Currency and Metals',
    total: '1 110,73 ₽',
    share: '0,01%',
    items: [
      { symbol: 'RUB', name: 'Russian Ruble', quantity: '1 026,85', price: '', avg: '', value: '1 026,85 ₽', share: '0,01%', profit: '', profitPercent: '' },
      { symbol: 'EUR', name: 'Euro', quantity: '0,72', price: '93,6650 ₽', avg: '79,0475 ₽', value: '67,44 ₽', share: '≈0,00%', profit: '10,52 ₽', profitPercent: '18,49%' },
      { symbol: 'USD', name: 'US Dollar', quantity: '0,19', price: '86,5675 ₽', avg: '91,8200 ₽', value: '16,45 ₽', share: '≈0,00%', profit: '-1,00 ₽', profitPercent: '-5,72%' },
    ],
  },
  {
    id: 'funds',
    name: 'Funds',
    total: '13 404 600,00 ₽',
    share: '99,99%',
    items: [
      { symbol: 'LQDT', name: 'LQDT', quantity: '8 250 000', price: '1,6248 ₽', avg: '1,3589 ₽', value: '13 404 600,00 ₽', share: '99,99%', profit: '2 193 526,50 ₽', profitPercent: '19,57%' },
    ],
  },
]

function avatarLabel(symbol: string): string {
  if (symbol === 'RUB') return '₽'
  if (symbol === 'EUR') return '€'
  if (symbol === 'USD') return '$'
  return symbol.slice(0, 2)
}

export function Portfolio({
  categories = defaultCategories,
  title = 'Balance',
  subtitle = 'Trading Portfolio',
  todayChange = { value: '8 248,37 ₽', percent: '0,06%' },
  allTimeChange = { value: '2 193 536,03 ₽', percent: '19,56%' },
  className,
}: PortfolioProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)

  return (
    <div className={cn('h-full flex flex-col', className)}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-base font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center text-sm">
            <span className="mr-2">Value in Rubles</span>
            <ChevronDown size={16} />
          </div>
          <div className="flex items-center text-sm">
            <span className="mr-2">All Time</span>
            <ChevronDown size={16} />
          </div>
          <button className="p-1 rounded hover:bg-muted/50">
            <Settings size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-muted/20 p-3 rounded-md">
          <div className="text-sm text-muted-foreground mb-1">Today</div>
          <div className="flex items-baseline">
            <span className="text-xl font-medium mr-2">{todayChange.value}</span>
            <span className="text-green-400">({todayChange.percent})</span>
          </div>
        </div>
        <div className="bg-muted/20 p-3 rounded-md">
          <div className="text-sm text-muted-foreground mb-1">All Time</div>
          <div className="flex items-baseline">
            <span className="text-xl font-medium mr-2">{allTimeChange.value}</span>
            <span className="text-green-400">({allTimeChange.percent})</span>
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-auto">
        <div className="mb-1 border-b border-border pb-2">
          <div className="grid grid-cols-8 text-xs text-muted-foreground">
            <div className="col-span-1">Name</div>
            <div className="text-right">Total</div>
            <div className="text-right">Price</div>
            <div className="text-right">Average</div>
            <div className="text-right">Value</div>
            <div className="text-right">Share</div>
            <div className="text-right">Profit</div>
            <div className="text-right">Profit, %</div>
          </div>
        </div>

        {categories.map((category) => (
          <div key={category.id} className="mb-3">
            <div
              className="flex items-center py-2 cursor-pointer text-sm hover:bg-muted/10"
              onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
            >
              {selectedCategory === category.id ? (
                <ChevronDown size={16} className="mr-1 text-foreground/70" />
              ) : (
                <ChevronRight size={16} className="mr-1 text-foreground/70" />
              )}
              <span className="font-medium">{category.name}</span>
              <span className="ml-auto">{category.total}</span>
              <span className="ml-4 w-12 text-right">{category.share}</span>
            </div>

            {selectedCategory === category.id && (
              <div className="pl-6">
                {category.items.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-8 py-2 text-sm border-t border-border/30 hover:bg-muted/10"
                  >
                    <div className="col-span-1 flex items-center">
                      <div className="mr-2 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">
                        {avatarLabel(item.symbol)}
                      </div>
                      <div>
                        <div>{item.name}</div>
                      </div>
                    </div>
                    <div className="text-right">{item.quantity}</div>
                    <div className="text-right">{item.price}</div>
                    <div className="text-right">{item.avg}</div>
                    <div className="text-right">{item.value}</div>
                    <div className="text-right">{item.share}</div>
                    <div
                      className={cn(
                        'text-right',
                        item.profit.includes('-')
                          ? 'text-red-400'
                          : item.profit
                            ? 'text-green-400'
                            : '',
                      )}
                    >
                      {item.profit}
                    </div>
                    <div
                      className={cn(
                        'text-right',
                        item.profitPercent.includes('-')
                          ? 'text-red-400'
                          : item.profitPercent
                            ? 'text-green-400'
                            : '',
                      )}
                    >
                      {item.profitPercent}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
