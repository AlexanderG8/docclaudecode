import { useState } from 'react'
import { Search, ChevronRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { tips, tipCategories, type Tip, type TipCategory } from '@/data/tips'

const badgeStyles: Record<TipCategory, string> = {
  shortcut:
    'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/60',
  flag: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800/60',
  workflow:
    'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/60 dark:text-green-300 dark:border-green-800/60',
}

export default function Tips() {
  const [activeTab, setActiveTab] = useState<TipCategory | 'all'>('all')
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const filtered = tips.filter((t) => {
    const matchTab = activeTab === 'all' || t.cat === activeTab
    const q = search.toLowerCase()
    const matchSearch =
      !q ||
      t.title.toLowerCase().includes(q) ||
      t.desc.toLowerCase().includes(q) ||
      t.short.toLowerCase().includes(q)
    return matchTab && matchSearch
  })

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Tips & Tricks</h1>
        <p className="text-muted-foreground">
          {filtered.length === tips.length
            ? `${tips.length} tips y atajos de productividad`
            : `${filtered.length} de ${tips.length} tips`}
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Buscar tip..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {tipCategories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveTab(cat.value)}
            className={cn(
              'px-3 py-1 rounded-full text-xs font-medium border transition-colors',
              activeTab === cat.value
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tips list */}
      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-12 text-sm">No se encontraron tips.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((tip) => (
            <TipCard
              key={tip.id}
              tip={tip}
              isExpanded={expanded.has(tip.id)}
              onToggle={() => toggle(tip.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function TipCard({
  tip,
  isExpanded,
  onToggle,
}: {
  tip: Tip
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <div
      className={cn(
        'border rounded-xl bg-card transition-colors',
        isExpanded ? 'border-border' : 'border-border/60 hover:border-border'
      )}
    >
      <button className="flex w-full items-center gap-3 px-5 py-3.5 text-left" onClick={onToggle}>
        {tip.keyCombo ? (
          <kbd className="font-mono text-sm font-medium bg-muted/60 text-foreground rounded px-1.5 py-0.5 border border-border/60 shrink-0">
            {tip.keyCombo}
          </kbd>
        ) : tip.command ? (
          <code className="font-mono text-sm font-medium bg-muted/60 text-foreground rounded px-1.5 py-0.5 shrink-0">
            {tip.command}
          </code>
        ) : null}
        <span
          className={cn(
            'text-[11px] px-2 py-0.5 rounded-full border font-medium shrink-0',
            badgeStyles[tip.badge]
          )}
        >
          {tip.badgeLabel}
        </span>
        <span className="ml-2 text-sm font-medium truncate">{tip.title}</span>
        <span className="ml-auto text-xs text-muted-foreground hidden sm:block truncate max-w-40 shrink-0">
          {tip.short}
        </span>
        <ChevronRight
          className={cn(
            'h-4 w-4 text-muted-foreground shrink-0 transition-transform',
            isExpanded && 'rotate-90'
          )}
        />
      </button>

      {isExpanded && (
        <div className="px-5 pb-5 border-t border-border/60">
          <p className="text-sm text-muted-foreground leading-relaxed mt-4 mb-4">{tip.desc}</p>
          <pre className="text-xs font-mono bg-muted/40 border border-border/60 rounded-md px-3 py-2.5 text-muted-foreground overflow-x-auto whitespace-pre-wrap">
            {tip.example}
          </pre>
        </div>
      )}
    </div>
  )
}
