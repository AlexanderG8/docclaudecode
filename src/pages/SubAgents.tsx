import { useState } from 'react'
import { ChevronRight, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  eplPhases,
  agentConfigFields,
  agentBenefits,
  agentManualExample,
  agentCreationSteps,
  type EPLPhase,
} from '@/data/sub-agents'

const phaseColors = [
  'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/60',
  'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/60',
  'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/60 dark:text-green-300 dark:border-green-800/60',
]

export default function SubAgents() {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null)

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Sub Agentes</h1>
        <p className="text-muted-foreground leading-relaxed">
          Instancias separadas que tu agente principal puede generar para manejar subtareas
          enfocadas, con contexto aislado y herramientas específicas.
        </p>
      </div>

      {/* Qué son */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-3">¿Qué son los Subagentes?</h2>
        <div className="rounded-xl border border-border/60 bg-card px-5 py-4">
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Los subagentes son instancias de agente separadas que Claude puede generar para delegar
            subtareas específicas. Trabajan de forma aislada y devuelven solo la información
            necesaria, manteniendo tu ventana de contexto principal limpia.
          </p>
          <div className="flex items-start gap-3 bg-muted/40 rounded-lg px-4 py-3 border border-border/40">
            <Users className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Analogía:</span> Los subagentes son
              como <span className="font-medium text-foreground">delegados especializados</span> en
              una empresa. El manager principal (Claude) delega tareas específicas a especialistas
              que trabajan de forma independiente y reportan solo los resultados.
            </p>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Beneficios clave</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {agentBenefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex items-start gap-3 rounded-lg border border-border/60 bg-card px-4 py-3"
            >
              <span className="mt-0.5 text-green-500 shrink-0">✓</span>
              <div>
                <p className="text-sm font-medium">{benefit.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subagentes Built-in */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-3">Subagentes Built-in</h2>
        <div className="rounded-xl border border-border/60 bg-card px-5 py-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Claude Code incluye subagentes integrados que Claude invoca automáticamente cuando es
            apropiado. Cada uno hereda los permisos de la conversación padre con restricciones de
            herramientas adicionales. Los tres principales son{' '}
            <span className="font-medium text-foreground">Explore</span>,{' '}
            <span className="font-medium text-foreground">Plan</span> y{' '}
            <span className="font-medium text-foreground">Execute</span>, que forman el patrón EPL
            descrito a continuación.
          </p>
        </div>
      </section>

      {/* Patrón EPL */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-1">Patrón Explore → Plan → Execute</h2>
        <p className="text-sm text-muted-foreground mb-4">
          El patrón más confiable para tareas de ingeniería complejas. Tres fases encadenadas, cada
          una como invocación distinta de subagente.
        </p>
        <div className="flex flex-col gap-2">
          {eplPhases.map((phase) => (
            <PhaseCard
              key={phase.phase}
              phase={phase}
              colorClass={phaseColors[phase.phase - 1]}
              isExpanded={expandedPhase === phase.phase}
              onToggle={() => setExpandedPhase(expandedPhase === phase.phase ? null : phase.phase)}
            />
          ))}
        </div>
      </section>

      {/* Crear subagentes */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Crear Subagentes Personalizados</h2>

        {/* Método 1: /agents */}
        <div className="rounded-xl border border-border/60 bg-card p-5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
              1
            </span>
            <p className="text-sm font-medium">Comando /agents (Recomendado)</p>
            <code className="ml-auto font-mono text-xs bg-muted/60 px-1.5 py-0.5 rounded text-muted-foreground">
              /agents
            </code>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Abre un menú interactivo guiado para crear, editar y listar subagentes. Claude puede
            generar la configuración automáticamente a partir de tu descripción.
          </p>
          <ol className="space-y-2">
            {agentCreationSteps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground text-[10px] font-bold mt-0.5">
                  {i + 1}
                </span>
                <span className="text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Método 2: Manual */}
        <div className="rounded-xl border border-border/60 bg-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
              2
            </span>
            <p className="text-sm font-medium">Crear archivo manualmente</p>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Crea un archivo Markdown con frontmatter YAML en una de estas ubicaciones:
          </p>
          <div className="flex gap-3 mb-4">
            <code className="text-xs font-mono bg-muted/60 px-2 py-1 rounded text-muted-foreground">
              ~/.claude/agents/nombre.md
            </code>
            <span className="text-xs text-muted-foreground self-center">personal</span>
          </div>
          <div className="flex gap-3 mb-4">
            <code className="text-xs font-mono bg-muted/60 px-2 py-1 rounded text-muted-foreground">
              .claude/agents/nombre.md
            </code>
            <span className="text-xs text-muted-foreground self-center">proyecto</span>
          </div>
          <pre className="text-xs font-mono bg-muted/40 border border-border/60 rounded-md px-3 py-2.5 text-muted-foreground overflow-x-auto whitespace-pre-wrap">
            {agentManualExample}
          </pre>
        </div>
      </section>

      {/* Tabla de configuración */}
      <section>
        <h2 className="text-lg font-semibold mb-1">Campos de configuración</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Todos los campos del frontmatter YAML de un subagente.
        </p>
        <div className="overflow-hidden rounded-xl border border-border/60">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 border-b border-border/60">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">
                  Campo
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground hidden sm:table-cell">
                  Valores
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">
                  Descripción
                </th>
              </tr>
            </thead>
            <tbody>
              {agentConfigFields.map((f, i) => (
                <tr
                  key={f.field}
                  className={cn(
                    'border-b border-border/40 last:border-0',
                    i % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                  )}
                >
                  <td className="px-4 py-2.5">
                    <code className="font-mono text-xs bg-muted/60 px-1.5 py-0.5 rounded text-foreground">
                      {f.field}
                    </code>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground hidden sm:table-cell font-mono">
                    {f.values}
                  </td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">
                    {f.critical && (
                      <span className="inline-block mr-1.5 text-[10px] px-1.5 py-0.5 rounded-full border bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800/60 font-medium">
                        crítico
                      </span>
                    )}
                    {f.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function PhaseCard({
  phase,
  colorClass,
  isExpanded,
  onToggle,
}: {
  phase: EPLPhase
  colorClass: string
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
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-[11px] font-bold">
          {phase.phase}
        </span>
        <span className="text-sm font-medium">{phase.name}</span>
        <span className={cn('text-[11px] px-2 py-0.5 rounded-full border font-medium shrink-0', colorClass)}>
          {phase.badge}
        </span>
        <span className="ml-auto text-xs text-muted-foreground hidden sm:block truncate max-w-52">
          {phase.desc.split('.')[0]}
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
          <p className="text-sm text-muted-foreground mt-4 mb-4">{phase.desc}</p>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider opacity-60 mb-2">
            Flujo
          </p>
          <pre className="text-xs font-mono bg-muted/40 border border-border/60 rounded-md px-3 py-2.5 text-muted-foreground overflow-x-auto whitespace-pre-wrap">
            {phase.example}
          </pre>
        </div>
      )}
    </div>
  )
}
