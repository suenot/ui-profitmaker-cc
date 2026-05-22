import { Header } from '@/components/site/header'
import { Sidebar } from '@/components/docs/sidebar'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-8">
        <div className="flex gap-12">
          <Sidebar />
          <main className="flex-1 min-w-0 py-8">{children}</main>
        </div>
      </div>
    </div>
  )
}
