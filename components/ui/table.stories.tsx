import type { Meta, StoryObj } from '@storybook/react'
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './table'

const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const orders = [
  { id: 'BTC/USDT', side: 'Buy', size: '0.50', price: '64,210' },
  { id: 'ETH/USDT', side: 'Sell', size: '4.20', price: '3,180' },
  { id: 'SOL/USDT', side: 'Buy', size: '120', price: '148.50' },
]

export const Default: Story = {
  render: () => (
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
        {orders.map((o) => (
          <TableRow key={o.id}>
            <TableCell className="font-medium">{o.id}</TableCell>
            <TableCell>{o.side}</TableCell>
            <TableCell>{o.size}</TableCell>
            <TableCell className="text-right">{o.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total orders</TableCell>
          <TableCell className="text-right">3</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
}
