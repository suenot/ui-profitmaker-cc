'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { CodeBlock } from './code-block'
import { ExternalLink } from 'lucide-react'

interface ComponentPreviewProps {
  children: React.ReactNode
  code: string
  language?: string
  storyId?: string
  className?: string
  previewClassName?: string
}

export function ComponentPreview({ children, code, language = 'tsx', storyId, className, previewClassName }: ComponentPreviewProps) {
  type Tab = 'preview' | 'code' | 'storybook'
  const tabs: Tab[] = ['preview', 'code', ...(storyId ? ['storybook' as Tab] : [])]
  const [tab, setTab] = useState<Tab>('preview')

  const iframeUrl = storyId ? `/storybook/iframe.html?id=${storyId}&viewMode=story` : undefined
  const fullUrl = storyId ? `/storybook/?path=/story/${storyId}` : undefined

  return (
    <div className={cn('rounded-3xl border border-border overflow-hidden', className)}>
      <div className="flex items-center gap-1 px-4 pt-3 bg-card/40 border-b border-border">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'px-4 py-2 text-sm font-bold capitalize rounded-t-xl transition-all duration-200 -mb-px',
              tab === t
                ? 'bg-background text-foreground border border-border border-b-background'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {t}
          </button>
        ))}
        {fullUrl && (
          <a
            href={fullUrl}
            className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors pb-1 pr-1"
          >
            <ExternalLink size={12} />
            Fullscreen
          </a>
        )}
      </div>

      {tab === 'preview' && (
        <div className={cn('flex min-h-[200px] items-center justify-center p-8 bg-background/50 bg-grid', previewClassName)}>
          {children}
        </div>
      )}
      {tab === 'code' && (
        <CodeBlock code={code} language={language} className="rounded-none border-0" />
      )}
      {tab === 'storybook' && iframeUrl && (
        <iframe
          src={iframeUrl}
          className="w-full bg-[#09090f]"
          style={{ minHeight: 320, border: 0 }}
          title="Storybook preview"
        />
      )}
    </div>
  )
}
