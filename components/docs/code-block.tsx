'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
}

export function CodeBlock({ code, language = 'tsx', className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn('relative group rounded-3xl overflow-hidden bg-[#0d0f14] border border-border', className)}>
      <div className="flex items-center justify-between px-5 py-3 border-b border-border/50">
        <span className="text-xs font-mono text-muted-foreground">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-[#e0e6ed] font-mono">
        <code>{code}</code>
      </pre>
    </div>
  )
}
