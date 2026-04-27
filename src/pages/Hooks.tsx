import { useState } from 'react'
import { ChevronRight, Zap, Settings, Globe, Terminal } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  hookEvents,
  configMethods,
  troubleshootingItems,
  type HookEventItem,
  type ConfigMethod,
} from '@/data/hooks'

const eventStyles: Record<string, string> = {
  'pre-tool':
    'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800/60',
  'post-tool':
    'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/60 dark:text-green-300 dark:border-green-800/60',
  session:
    'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/60',
  permission:
    'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/60',
}

const configIcons = {
  interactive: Terminal,
  project: Settings,
  global: Globe,
}

export default function Hooks() {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null)
  const [expandedConfig, setExpandedConfig] = useState<string | null>(null)

  const toggleEvent = (id: string) =>
    setExpandedEvent((prev) => (prev === id ? null : id))

  const toggleConfig = (id: string) =>
    setExpandedConfig((prev) => (prev === id ? null : id))

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Hooks</h1>
        <p className="text-muted-foreground leading-relaxed">
          Automatizaciones que se ejecutan en momentos específicos del flujo de trabajo de Claude
          Code, como "event listeners" que reaccionan a las acciones de Claude.
        </p>
      </div>

      {/* Para qué sirven */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Para qué sirven</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {useCases.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 rounded-lg border border-border/60 bg-card px-4 py-3"
            >
              <span className="mt-0.5 text-green-500 shrink-0">✓</span>
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Eventos principales */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-1">Eventos principales</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Expande cada evento para ver cuándo se dispara y un ejemplo de configuración.
        </p>
        <div className="flex flex-col gap-2">
          {hookEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isExpanded={expandedEvent === event.id}
              onToggle={() => toggleEvent(event.id)}
            />
          ))}
        </div>
      </section>

      {/* Cómo configurar */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-1">Cómo configurar</h2>
        <p className="text-sm text-muted-foreground mb-4">3 formas de agregar hooks a tu flujo.</p>
        <div className="flex flex-col gap-2">
          {configMethods.map((method) => (
            <ConfigCard
              key={method.id}
              method={method}
              isExpanded={expandedConfig === method.id}
              onToggle={() => toggleConfig(method.id)}
            />
          ))}
        </div>
      </section>

      {/* Ejemplo práctico */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Ejemplo práctico: notificación en Windows</h2>
        <div className="rounded-xl border border-border/60 bg-card p-5">
          <p className="text-sm text-muted-foreground mb-4">
            Configura un hook de notificación en PowerShell para que Windows te avise cuando Claude
            termina de ejecutar un comando:
          </p>
          <ol className="space-y-3 mb-4">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold mt-0.5">
                  {i + 1}
                </span>
                <span className="text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
          <pre className="text-xs font-mono bg-muted/40 border border-border/60 rounded-md px-3 py-2.5 text-muted-foreground overflow-x-auto whitespace-pre-wrap">
            {`powershell.exe -Command "[System.Reflection.Assembly]::LoadWithPartialName('System.Windows.Form');[System.Windows.Form.MessageBox]::Show('Claude Code needs your attention', 'Claude Code')"`}
          </pre>
        </div>
      </section>

      {/* Troubleshooting */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Troubleshooting</h2>
        <div className="flex flex-col gap-3">
          {troubleshootingItems.map((item, i) => (
            <div key={i} className="rounded-lg border border-border/60 bg-card px-4 py-3">
              <p className="text-sm font-medium mb-1">{item.problem}</p>
              <p className="text-xs text-muted-foreground">{item.solution}</p>
              {item.code && (
                <pre className="mt-2 text-xs font-mono bg-muted/40 border border-border/60 rounded px-3 py-1.5 text-muted-foreground">
                  {item.code}
                </pre>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function EventCard({
  event,
  isExpanded,
  onToggle,
}: {
  event: HookEventItem
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
        <Zap className="h-4 w-4 text-muted-foreground shrink-0" />
        <code className="font-mono text-sm font-medium bg-muted/60 text-foreground rounded px-1.5 py-0.5">
          {event.title}
        </code>
        <span
          className={cn(
            'text-[11px] px-2 py-0.5 rounded-full border font-medium shrink-0',
            eventStyles[event.id]
          )}
        >
          {event.id === 'pre-tool'
            ? 'Antes'
            : event.id === 'post-tool'
              ? 'Después'
              : event.id === 'session'
                ? 'Inicio'
                : 'Permisos'}
        </span>
        <span className="ml-auto text-xs text-muted-foreground hidden sm:block truncate max-w-52">
          {event.when}
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
          <p className="text-xs text-muted-foreground mt-4 mb-1 font-medium uppercase tracking-wider opacity-60">
            Cuándo se ejecuta
          </p>
          <p className="text-sm text-muted-foreground mb-4">{event.when}</p>
          <p className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wider opacity-60">
            Caso de uso
          </p>
          <p className="text-sm text-muted-foreground mb-4">{event.usecase}</p>
          <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider opacity-60">
            Ejemplo
          </p>
          <pre className="text-xs font-mono bg-muted/40 border border-border/60 rounded-md px-3 py-2.5 text-muted-foreground overflow-x-auto whitespace-pre-wrap">
            {event.example}
          </pre>
        </div>
      )}
    </div>
  )
}

function ConfigCard({
  method,
  isExpanded,
  onToggle,
}: {
  method: ConfigMethod
  isExpanded: boolean
  onToggle: () => void
}) {
  const Icon = configIcons[method.id]
  return (
    <div
      className={cn(
        'border rounded-xl bg-card transition-colors',
        isExpanded ? 'border-border' : 'border-border/60 hover:border-border'
      )}
    >
      <button className="flex w-full items-center gap-3 px-5 py-3.5 text-left" onClick={onToggle}>
        <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
        <span className="text-sm font-medium">{method.title}</span>
        <span className="ml-auto text-xs text-muted-foreground hidden sm:block truncate max-w-60">
          {method.desc}
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
          <p className="text-sm text-muted-foreground mt-4 mb-4">{method.desc}</p>
          <pre className="text-xs font-mono bg-muted/40 border border-border/60 rounded-md px-3 py-2.5 text-muted-foreground overflow-x-auto whitespace-pre-wrap">
            {method.example}
          </pre>
        </div>
      )}
    </div>
  )
}

const useCases = [
  {
    title: 'Automatizar tareas repetitivas',
    desc: 'Formatear código automáticamente después de cada edición.',
  },
  {
    title: 'Enforcement de calidad',
    desc: 'Correr linters, tests o validaciones antes de aceptar cambios.',
  },
  {
    title: 'Integrar con tu pipeline',
    desc: 'Ejecutar builds, notificaciones o webhooks de CI/CD.',
  },
  {
    title: 'Mantener consistencia',
    desc: 'Asegurar que todo código cumpla con tus estándares sin intervención manual.',
  },
]

const steps = [
  'Ejecuta /hooks en Claude Code para abrir el menú interactivo.',
  'Selecciona el evento "Notification" (PostToolUse).',
  'Elige "Match all (no filter)" para que aplique a todos los comandos.',
  'Haz clic en "Add new hook" e ingresa el comando de PowerShell.',
  'Selecciona "Project settings (local)" y presiona Escape para guardar.',
]
