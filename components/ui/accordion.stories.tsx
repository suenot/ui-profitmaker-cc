import type { Meta, StoryObj } from '@storybook/react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './accordion'

const meta: Meta = {
  title: 'UI/Accordion',
  component: Accordion,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-80 text-foreground">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is a market maker?</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          A market maker continuously quotes both buy and sell prices to provide liquidity.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How are spreads set?</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Spreads are configured per-pair and adapt to volatility and inventory.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it self-hosted?</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Yes — run it on your own infrastructure with full control.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
