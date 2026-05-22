'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface HeatmapSlice {
  time: number
  levels: { price: number; size: number }[]
}

export interface HeatmapTrade {
  time: number
  price: number
  size: number
  side: 'buy' | 'sell'
}

export interface HeatmapProps {
  slices: HeatmapSlice[]
  trades?: HeatmapTrade[]
  priceDecimals?: number
  tickSize?: number
  colorScale?: 'heat' | 'mono'
  showTrades?: boolean
  className?: string
}

interface Sized {
  width: number
  height: number
}

const PRICE_GUTTER = 56

function cssVar(el: HTMLElement, name: string, fallback: string): string {
  const v = getComputedStyle(el).getPropertyValue(name).trim()
  return v ? `hsl(${v})` : fallback
}

// Perceptual-ish ramp dark -> blue -> cyan -> yellow -> white.
function heatColor(t: number): [number, number, number] {
  const stops: [number, [number, number, number]][] = [
    [0, [10, 12, 30]],
    [0.35, [30, 60, 170]],
    [0.6, [40, 190, 210]],
    [0.82, [240, 220, 60]],
    [1, [255, 255, 255]],
  ]
  for (let i = 1; i < stops.length; i++) {
    if (t <= stops[i][0]) {
      const [t0, c0] = stops[i - 1]
      const [t1, c1] = stops[i]
      const f = (t - t0) / (t1 - t0 || 1)
      return [
        Math.round(c0[0] + (c1[0] - c0[0]) * f),
        Math.round(c0[1] + (c1[1] - c0[1]) * f),
        Math.round(c0[2] + (c1[2] - c0[2]) * f),
      ]
    }
  }
  return stops[stops.length - 1][1]
}

export function Heatmap({
  slices,
  trades = [],
  priceDecimals = 2,
  tickSize,
  colorScale = 'heat',
  showTrades = true,
  className,
}: HeatmapProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [size, setSize] = React.useState<Sized>({ width: 600, height: 360 })

  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect
      if (r) setSize({ width: r.width, height: r.height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  React.useLayoutEffect(() => {
    const canvas = canvasRef.current
    const host = containerRef.current
    if (!canvas || !host || size.width === 0 || size.height === 0) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = Math.round(size.width * dpr)
    canvas.height = Math.round(size.height * dpr)
    canvas.style.width = `${size.width}px`
    canvas.style.height = `${size.height}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, size.width, size.height)

    const muted = cssVar(host, '--muted-foreground', '#9ca3af')
    const border = cssVar(host, '--border', '#27272a')
    const accent = cssVar(host, '--accent', '#fbbf24') || '#fbbf24'

    if (slices.length === 0) return

    const allPrices = slices.flatMap((s) => s.levels.map((l) => l.price))
    if (trades) for (const tr of trades) allPrices.push(tr.price)
    const minPrice = Math.min(...allPrices)
    const maxPrice = Math.max(...allPrices)
    const step =
      tickSize ??
      (() => {
        const sorted = Array.from(new Set(slices.flatMap((s) => s.levels.map((l) => l.price)))).sort(
          (a, b) => a - b
        )
        let min = Infinity
        for (let i = 1; i < sorted.length; i++) min = Math.min(min, sorted[i] - sorted[i - 1])
        return Number.isFinite(min) && min > 0 ? min : 1
      })()

    const plotW = size.width - PRICE_GUTTER
    const cw = plotW / slices.length
    const rowCount = Math.max(1, Math.round((maxPrice - minPrice) / step) + 1)
    const rh = size.height / rowCount

    const yForPrice = (price: number) => ((maxPrice - price) / step) * rh

    let maxSize = 0
    for (const s of slices) for (const l of s.levels) maxSize = Math.max(maxSize, l.size)
    maxSize = maxSize || 1

    // Background fill for empty area.
    const [br, bg, bb] = colorScale === 'heat' ? heatColor(0) : [18, 18, 22]
    ctx.fillStyle = `rgb(${br},${bg},${bb})`
    ctx.fillRect(0, 0, plotW, size.height)

    slices.forEach((slice, si) => {
      const x = si * cw
      for (const l of slice.levels) {
        const t = Math.min(1, l.size / maxSize)
        if (t <= 0) continue
        const y = yForPrice(l.price)
        if (colorScale === 'heat') {
          const [r, g, b] = heatColor(t)
          ctx.fillStyle = `rgb(${r},${g},${b})`
        } else {
          ctx.fillStyle = `rgba(74,222,128,${0.1 + 0.85 * t})`
        }
        ctx.fillRect(Math.floor(x), Math.floor(y), Math.ceil(cw) + 1, Math.ceil(rh) + 1)
      }
    })

    // Trade dots.
    if (showTrades && trades.length) {
      const tMin = slices[0].time
      const tMax = slices[slices.length - 1].time
      const span = tMax - tMin || 1
      let maxTrade = 0
      for (const tr of trades) maxTrade = Math.max(maxTrade, tr.size)
      maxTrade = maxTrade || 1
      for (const tr of trades) {
        const x = ((tr.time - tMin) / span) * plotW
        const y = yForPrice(tr.price) + rh / 2
        const radius = 2 + 5 * Math.min(1, tr.size / maxTrade)
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = tr.side === 'buy' ? 'rgba(74,222,128,0.9)' : 'rgba(248,113,113,0.9)'
        ctx.fill()
        ctx.strokeStyle = 'rgba(0,0,0,0.4)'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }

    // Best bid/ask line from the most recent slice (max-size cluster center).
    const last = slices[slices.length - 1]
    if (last && last.levels.length) {
      const mid = last.levels.reduce((a, b) => (b.size > a.size ? b : a), last.levels[0])
      const y = yForPrice(mid.price) + rh / 2
      ctx.strokeStyle = accent
      ctx.setLineDash([4, 3])
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(plotW, y)
      ctx.stroke()
      ctx.setLineDash([])
    }

    // Price axis (right gutter).
    ctx.font = '10px ui-monospace, SFMono-Regular, Menlo, monospace'
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'left'
    ctx.fillStyle = muted
    const labelEvery = Math.max(1, Math.ceil(16 / rh))
    for (let i = 0; i < rowCount; i += labelEvery) {
      const price = maxPrice - i * step
      ctx.fillText(price.toFixed(priceDecimals), plotW + 6, i * rh + rh / 2)
    }

    ctx.strokeStyle = border
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(plotW + 0.5, 0)
    ctx.lineTo(plotW + 0.5, size.height)
    ctx.stroke()
  }, [slices, trades, priceDecimals, tickSize, colorScale, showTrades, size])

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full h-full bg-card text-foreground', className)}
    >
      <canvas ref={canvasRef} className="block" />
    </div>
  )
}
