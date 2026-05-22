import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '@/components/ui/table'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const previewCode = `import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from '@/components/ui/table'

export default function Example() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Pair</TableHead>
          <TableHead>Side</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>BTC/USDT</TableCell>
          <TableCell>Buy</TableCell>
          <TableCell className="text-right">64,210</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}`

const sourceCode = `'use client'

import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  )
)
Table.displayName = "Table"

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
  )
)
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  )
)
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)} {...props} />
  )
)
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr ref={ref} className={cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className)} {...props} />
  )
)
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th ref={ref} className={cn("h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0", className)} {...props} />
  )
)
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)} {...props} />
  )
)
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn("mt-4 text-sm text-muted-foreground", className)} {...props} />
  )
)
TableCaption.displayName = "TableCaption"

export {
  Table, TableHeader, TableBody, TableFooter,
  TableHead, TableRow, TableCell, TableCaption,
}`

export default function TablePage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Display</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Table</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        A responsive, styled table for displaying tabular data such as orders, fills, and balances. Pure Tailwind.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="ui-table--default">
        <Table className="w-[28rem] text-foreground">
          <TableCaption>Open orders across connected exchanges.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Pair</TableHead>
              <TableHead>Side</TableHead>
              <TableHead>Size</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">BTC/USDT</TableCell>
              <TableCell>Buy</TableCell>
              <TableCell>0.50</TableCell>
              <TableCell className="text-right">64,210</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">ETH/USDT</TableCell>
              <TableCell>Sell</TableCell>
              <TableCell>4.20</TableCell>
              <TableCell className="text-right">3,180</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">SOL/USDT</TableCell>
              <TableCell>Buy</TableCell>
              <TableCell>120</TableCell>
              <TableCell className="text-right">148.50</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total orders</TableCell>
              <TableCell className="text-right">3</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/ui/table.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'className', type: 'string', description: 'Additional CSS classes (on any table part)' },
        { name: 'colSpan', type: 'number', description: 'Column span for a cell (standard HTML attr)' },
      ]} />
    </div>
  )
}
