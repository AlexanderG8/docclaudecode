# Interface Design System — docclaudecode

## Product Intent

Developer documentation site for Claude Code, written in Spanish. Users are developers learning a CLI tool. The interface should feel like a precise reference — terminal-adjacent, information-dense, fast to scan. Not SaaS, not marketing.

---

## Design Direction

**Feel:** Technical reference manual. Like a well-crafted CLI cheat sheet. Precise, not decorative.

**Depth strategy:** Borders-only — no shadows. Clean and technical, matching the CLI domain.

**Spacing base unit:** Tailwind default scale (4px base). Cards use `px-5 py-3.5` for rows, `px-5 pb-5` for expanded content.

**Border radius:** `rounded-xl` for cards/containers, `rounded-full` for filter pills, `rounded-md` for code blocks, `rounded` for inline tokens.

---

## Typography

- **Font:** Geist Variable (sans) — loaded via `@fontsource-variable/geist`
- **Command names:** `<code>` element with `font-mono text-sm font-medium bg-muted/60 rounded px-1.5 py-0.5` — signals "something you type"
- **Section labels:** `text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60`
- **Body / descriptions:** `text-sm text-muted-foreground leading-relaxed`

---

## Color System

The project palette is intentionally achromatic (all OKLCH chroma=0). Category badge colors are the only chromatic elements — they must survive both light and dark mode.

### Category Badge Styles

Each badge follows the pattern: light bg / colored text / colored border + dark mode overrides.

```ts
const badgeStyles: Record<CommandCategory, string> = {
  context: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/60',
  dev:     'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/60 dark:text-green-300 dark:border-green-800/60',
  config:  'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800/60',
  info:    'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/60',
  integ:   'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800/60',
  bundle:  'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/60',
}
```

**Rule:** Never use hardcoded color values (e.g. `border-blue-300`) outside of this badge system. All other borders and surfaces use design system tokens (`border-border`, `bg-muted`, etc.).

---

## Component Patterns

### Command Card (expandable list row)

```tsx
// Container
<div className="border rounded-xl bg-card transition-colors border-border/60 hover:border-border">

// Trigger row
<button className="flex w-full items-center gap-3 px-5 py-3.5 text-left">
  <code className="font-mono text-sm font-medium bg-muted/60 text-foreground rounded px-1.5 py-0.5">
    {cmd.name}
  </code>
  <span className={cn('text-[11px] px-2 py-0.5 rounded-full border font-medium shrink-0', badgeStyles[cmd.badge])}>
    {cmd.badgeLabel}
  </span>
  <span className="ml-auto text-xs text-muted-foreground hidden sm:block truncate max-w-40">
    {cmd.short}
  </span>
  <ChevronRight className={cn('h-4 w-4 text-muted-foreground shrink-0 transition-transform', isExpanded && 'rotate-90')} />
</button>

// Expanded content
<div className="px-5 pb-5 border-t border-border/60">
  <p className="text-sm text-muted-foreground leading-relaxed mt-4 mb-4">{cmd.desc}</p>
  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-2">Caso de uso</p>
  <div className="rounded-lg bg-muted/40 border-l-2 border-border px-4 py-3">
    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{cmd.usecase}</p>
    <pre className="text-xs font-mono bg-background border border-border/60 rounded-md px-3 py-2.5 text-muted-foreground overflow-x-auto whitespace-pre-wrap">
      {cmd.example}
    </pre>
  </div>
</div>
```

### Dynamic Result Count

Show total when unfiltered, show `X de Y` when filter/search is active:

```tsx
{filtered.length === commands.length
  ? `${commands.length} comandos disponibles en Claude Code`
  : `${filtered.length} de ${commands.length} comandos`}
```

### Category Filter Pills

```tsx
<button className={cn(
  'px-3 py-1 rounded-full text-xs font-medium border transition-colors',
  activeTab === cat.value
    ? 'bg-primary text-primary-foreground border-primary'
    : 'border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground'
)}>
```

---

## Rules

1. No hardcoded hex or Tailwind color classes outside the badge system
2. Command names always rendered as `<code>` tokens, not `<span>`
3. Left-border accents in cards use `border-border`, never a specific color
4. Dark mode variants required for any component that uses chromatic color
