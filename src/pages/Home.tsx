import { Link } from 'react-router-dom'
import {
  Terminal,
  Zap,
  FileText,
  Plug,
  Flag,
  Lightbulb,
  ArrowRight,
  BookOpen,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const sections = [
  {
    to: '/slash-commands',
    icon: Terminal,
    title: 'Slash Commands',
    description: 'Referencia completa de todos los comandos slash disponibles en Claude Code.',
    count: '25 comandos',
    available: true,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
  },
  {
    to: '/hooks',
    icon: Zap,
    title: 'Hooks',
    description: 'Automatiza acciones antes y después de que Claude use sus herramientas.',
    count: null,
    available: false,
    iconColor: 'text-yellow-600',
    iconBg: 'bg-yellow-50',
  },
  {
    to: '/claude-md',
    icon: FileText,
    title: 'CLAUDE.md',
    description: 'Cómo escribir instrucciones persistentes efectivas para tus proyectos.',
    count: null,
    available: false,
    iconColor: 'text-green-600',
    iconBg: 'bg-green-50',
  },
  {
    to: '/mcp',
    icon: Plug,
    title: 'MCP Servers',
    description: 'Conecta bases de datos, APIs y herramientas externas a Claude Code.',
    count: null,
    available: false,
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-50',
  },
  {
    to: '/cli-flags',
    icon: Flag,
    title: 'CLI Flags',
    description: 'Todas las opciones de línea de comandos para controlar el comportamiento.',
    count: null,
    available: false,
    iconColor: 'text-orange-600',
    iconBg: 'bg-orange-50',
  },
  {
    to: '/tips',
    icon: Lightbulb,
    title: 'Tips & Tricks',
    description: 'Patrones de productividad y mejores prácticas para el día a día.',
    count: null,
    available: false,
    iconColor: 'text-pink-600',
    iconBg: 'bg-pink-50',
  },
]

const quickStart = [
  {
    step: '1',
    title: 'Instala Claude Code',
    desc: 'npm install -g @anthropic-ai/claude-code',
    mono: true,
  },
  {
    step: '2',
    title: 'Inicia en tu proyecto',
    desc: 'Abre la terminal en el directorio del proyecto y escribe claude',
    mono: false,
  },
  {
    step: '3',
    title: 'Configura con /init',
    desc: 'Ejecuta /init para que Claude aprenda tu codebase y genere CLAUDE.md',
    mono: false,
  },
]

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-5">
          <BookOpen className="h-5 w-5 text-muted-foreground" />
          <Badge variant="secondary" className="text-xs font-mono">
            claude-sonnet-4-6
          </Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Claude Code Docs</h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Guía de referencia personal para aprender y dominar Claude Code — el CLI oficial de
          Anthropic para programación asistida por IA.
        </p>
      </div>

      {/* Quick start */}
      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          Empezar aquí
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {quickStart.map((item) => (
            <div key={item.step} className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold mt-0.5">
                {item.step}
              </div>
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p
                  className={cn(
                    'text-xs text-muted-foreground mt-0.5',
                    item.mono && 'font-mono'
                  )}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sections grid */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          Secciones
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <Card
              key={section.to}
              className={cn(
                'transition-all duration-150',
                section.available
                  ? 'hover:shadow-sm hover:border-border cursor-pointer'
                  : 'opacity-55'
              )}
            >
              {section.available ? (
                <Link to={section.to} className="block h-full">
                  <SectionCardContent section={section} />
                </Link>
              ) : (
                <SectionCardContent section={section} />
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

type Section = (typeof sections)[number]

function SectionCardContent({ section }: { section: Section }) {
  return (
    <>
      <CardHeader className="pb-2">
        <div
          className={cn(
            'w-9 h-9 rounded-lg flex items-center justify-center mb-3',
            section.iconBg
          )}
        >
          <section.icon className={cn('h-4.5 w-4.5', section.iconColor)} />
        </div>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-[15px] leading-snug">{section.title}</CardTitle>
          {section.available ? (
            <ArrowRight className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
          ) : (
            <Badge variant="outline" className="text-[10px] shrink-0 font-normal">
              Pronto
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-xs leading-relaxed">
          {section.description}
        </CardDescription>
        {section.count && (
          <p className="text-xs text-muted-foreground mt-2 font-medium">{section.count}</p>
        )}
      </CardContent>
    </>
  )
}
