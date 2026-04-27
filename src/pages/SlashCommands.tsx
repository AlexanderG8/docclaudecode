import { useState } from 'react'
import { Search, ChevronRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { commands, categories, type Command, type CommandCategory } from '@/data/slash-commands'

const badgeStyles: Record<CommandCategory, string> = {
  context: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/60',
  dev: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/60 dark:text-green-300 dark:border-green-800/60',
  config: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800/60',
  info: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/60',
  integ: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800/60',
  bundle: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/60',
}

export default function SlashCommands() {
  const [activeTab, setActiveTab] = useState<CommandCategory | 'all'>('all')
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const filtered = commands.filter((c) => {
    const matchTab = activeTab === 'all' || c.cat === activeTab
    const q = search.toLowerCase()
    const matchSearch =
      !q ||
      c.name.includes(q) ||
      c.desc.toLowerCase().includes(q) ||
      c.short.toLowerCase().includes(q)
    return matchTab && matchSearch
  })

  const toggle = (name: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Slash Commands</h1>
        <p className="text-muted-foreground">
          {filtered.length === commands.length
            ? `${commands.length} comandos disponibles en Claude Code`
            : `${filtered.length} de ${commands.length} comandos`}
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Buscar comando..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {categories.map((cat) => (
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

      {/* Command list */}
      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-12 text-sm">
          No se encontraron comandos.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((cmd) => (
            <CommandCard
              key={cmd.name}
              cmd={cmd}
              isExpanded={expanded.has(cmd.name)}
              onToggle={() => toggle(cmd.name)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function CommandCard({
  cmd,
  isExpanded,
  onToggle,
}: {
  cmd: Command
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
      <button
        className="flex w-full items-center gap-3 px-5 py-3.5 text-left"
        onClick={onToggle}
      >
        <code className="font-mono text-sm font-medium bg-muted/60 text-foreground rounded px-1.5 py-0.5">{cmd.name}</code>
        <span
          className={cn(
            'text-[11px] px-2 py-0.5 rounded-full border font-medium shrink-0',
            badgeStyles[cmd.badge]
          )}
        >
          {cmd.badgeLabel}
        </span>
        <span className="ml-auto text-xs text-muted-foreground hidden sm:block truncate max-w-40">
          {cmd.short}
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
          <p className="text-sm text-muted-foreground leading-relaxed mt-4 mb-4">{cmd.desc}</p>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-2">
            Caso de uso
          </p>
          <div className="rounded-lg bg-muted/40 border-l-2 border-border px-4 py-3">
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">{cmd.usecase}</p>
            <pre className="text-xs font-mono bg-background border border-border/60 rounded-md px-3 py-2.5 text-muted-foreground overflow-x-auto whitespace-pre-wrap">
              {cmd.example}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}
