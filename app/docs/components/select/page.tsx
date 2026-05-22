import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const previewCode = `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function Example() {
  return (
    <Select defaultValue="btc">
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select a pair" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="btc">BTC/USDT</SelectItem>
        <SelectItem value="eth">ETH/USDT</SelectItem>
        <SelectItem value="sol">SOL/USDT</SelectItem>
      </SelectContent>
    </Select>
  )
}`

const sourceCode = `'use client'

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-[11000] max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport className="p-1">
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
}`

export default function SelectPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Base UI</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Select</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Displays a list of options for the user to pick from, triggered by a button. Built on Radix UI.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="ui-select--default">
        <Select defaultValue="btc">
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Select a pair" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="btc">BTC/USDT</SelectItem>
            <SelectItem value="eth">ETH/USDT</SelectItem>
            <SelectItem value="sol">SOL/USDT</SelectItem>
          </SelectContent>
        </Select>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Grouped</h2>
      <ComponentPreview code={`<Select>\n  <SelectTrigger><SelectValue placeholder="Select exchange" /></SelectTrigger>\n  <SelectContent>\n    <SelectGroup>\n      <SelectLabel>CEX</SelectLabel>\n      <SelectItem value="binance">Binance</SelectItem>\n    </SelectGroup>\n  </SelectContent>\n</Select>`}>
        <Select>
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Select exchange" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>CEX</SelectLabel>
              <SelectItem value="binance">Binance</SelectItem>
              <SelectItem value="bybit">Bybit</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>DEX</SelectLabel>
              <SelectItem value="uniswap">Uniswap</SelectItem>
              <SelectItem value="curve">Curve</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/ui/select.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'value', type: 'string', description: 'Controlled selected value' },
        { name: 'defaultValue', type: 'string', description: 'Initial value when uncontrolled' },
        { name: 'onValueChange', type: '(value: string) => void', description: 'Called when the selected value changes' },
        { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disable the select' },
        { name: 'className', type: 'string', description: 'Additional CSS classes on the trigger' },
      ]} />
    </div>
  )
}
