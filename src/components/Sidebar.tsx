import type { LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { Home, Terminal, Zap, BookMarked, Plug, Users, Lightbulb } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  to: string
  label: string
  icon: LucideIcon
  soon?: boolean
  exact?: boolean
  count?: number
}

const navItems: NavItem[] = [
  { to: '/', label: 'Inicio', icon: Home, exact: true },
  { to: '/slash-commands', label: 'Slash Commands', icon: Terminal, count: 25 },
  { to: '/hooks', label: 'Hooks', icon: Zap },
  { to: '/skills', label: 'Skills', icon: BookMarked },
  { to: '/mcp', label: 'MCP Servers', icon: Plug },
  { to: '/sub-agents', label: 'Sub Agentes', icon: Users },
  { to: '/tips', label: 'Tips & Tricks', icon: Lightbulb, count: 6 },
]

export default function Sidebar() {
  return (
    <div className="flex flex-col h-full select-none">
      <div className="px-4 py-5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Terminal className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="leading-none">
            <p className="text-sm font-semibold">Claude Code</p>
            <p className="text-xs text-muted-foreground mt-0.5">Docs</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) =>
          item.soon ? (
            <div
              key={item.to}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground/40 cursor-not-allowed"
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
              <span className="ml-auto text-[10px] font-medium bg-muted text-muted-foreground/60 px-1.5 py-0.5 rounded">
                Pronto
              </span>
            </div>
          ) : (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                )
              }
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
              {item.count != null && (
                <span className="ml-auto text-[11px] font-medium opacity-60">{item.count}</span>
              )}
            </NavLink>
          )
        )}
      </nav>

      <div className="px-4 py-3 border-t border-border">
        <p className="text-xs text-muted-foreground">v0.1.0</p>
      </div>
    </div>
  )
}
