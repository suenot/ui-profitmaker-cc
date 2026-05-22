import { cn } from '@/lib/utils'

interface PropRow {
  name: string
  type: string
  defaultValue?: string
  description: string
  required?: boolean
}

interface PropsTableProps {
  props: PropRow[]
  className?: string
}

export function PropsTable({ props, className }: PropsTableProps) {
  return (
    <div className={cn('rounded-3xl border border-border overflow-hidden', className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/20">
            <th className="text-left px-5 py-3 font-black text-xs uppercase tracking-widest text-muted-foreground">Prop</th>
            <th className="text-left px-5 py-3 font-black text-xs uppercase tracking-widest text-muted-foreground">Type</th>
            <th className="text-left px-5 py-3 font-black text-xs uppercase tracking-widest text-muted-foreground hidden md:table-cell">Default</th>
            <th className="text-left px-5 py-3 font-black text-xs uppercase tracking-widest text-muted-foreground hidden lg:table-cell">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => (
            <tr key={prop.name} className={cn('border-b border-border/50 last:border-0', i % 2 === 0 ? 'bg-transparent' : 'bg-muted/10')}>
              <td className="px-5 py-3 font-mono font-bold text-accent-darker">
                {prop.name}
                {prop.required && <span className="text-red-400 ml-1">*</span>}
              </td>
              <td className="px-5 py-3 font-mono text-muted-foreground">{prop.type}</td>
              <td className="px-5 py-3 font-mono text-muted-foreground hidden md:table-cell">{prop.defaultValue ?? '—'}</td>
              <td className="px-5 py-3 text-muted-foreground font-light hidden lg:table-cell">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
