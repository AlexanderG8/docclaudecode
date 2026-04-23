import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import Sidebar from './Sidebar'

export default function Layout() {
  return (
    <div className="flex h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-border bg-card">
        <Sidebar />
      </aside>

      <div className="flex flex-col flex-1 min-w-0">
        {/* Mobile header */}
        <header className="flex md:hidden items-center gap-3 px-4 h-14 border-b border-border shrink-0">
          <Sheet>
            <SheetTrigger className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg hover:bg-muted transition-colors">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-60 p-0">
              <SheetHeader className="sr-only">
                <SheetTitle>Navegación</SheetTitle>
              </SheetHeader>
              <Sidebar />
            </SheetContent>
          </Sheet>
          <span className="font-semibold text-sm">Claude Code Docs</span>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
