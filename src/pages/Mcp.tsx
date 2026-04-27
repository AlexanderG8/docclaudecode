import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  mcpPrimitives,
  mcpServers,
  mcpUseCases,
  securityTips,
  troubleshootItems,
  faqs,
  notionInstallSteps,
  notionInstallCommand,
  mcpConfigExample,
  type McpPrimitive,
  type McpUseCase,
  type McpFaq,
} from '@/data/mcp'

const primitiveStyles: Record<string, string> = {
  tools:
    'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/60',
  resources:
    'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/60 dark:text-green-300 dark:border-green-800/60',
  prompts:
    'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/60',
}

export default function Mcp() {
  const [expandedPrimitive, setExpandedPrimitive] = useState<string | null>(null)
  const [expandedUseCase, setExpandedUseCase] = useState<string | null>(null)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">MCP Servers</h1>
        <p className="text-muted-foreground leading-relaxed">
          Model Context Protocol — el estándar abierto de Anthropic que permite a Claude conectarse
          de forma segura con bases de datos, APIs y herramientas externas.
        </p>
      </div>

      {/* Qué es MCP */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-3">¿Qué es MCP?</h2>
        <div className="rounded-xl border border-border/60 bg-card px-5 py-4">
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            MCP es un estándar abierto introducido por Anthropic en noviembre de 2024 que permite a
            Claude conectarse de forma segura y estandarizada con sistemas externos donde viven tus
            datos.
          </p>
          <div className="bg-muted/40 rounded-lg border border-border/40 px-4 py-3 mb-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Analogía:</span> MCP es como un{' '}
              <span className="font-medium text-foreground">puerto USB-C universal</span> para IA.
              Antes cada herramienta necesitaba una integración custom. Ahora un solo protocolo
              conecta cualquier cliente MCP con cualquier servidor MCP.
            </p>
          </div>
          <div className="rounded-lg bg-muted/40 border border-border/60 px-4 py-3">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider opacity-60 mb-2">
              El problema N×M resuelto
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-foreground mb-1">Sin MCP</p>
                <p className="text-xs text-muted-foreground">
                  3 herramientas × 5 servicios = <span className="font-medium text-red-600 dark:text-red-400">15 integraciones custom</span>
                </p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Con MCP</p>
                <p className="text-xs text-muted-foreground">
                  5 MCP servers usados por todos = <span className="font-medium text-green-600 dark:text-green-400">5 integraciones</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Arquitectura */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-3">Arquitectura</h2>
        <pre className="text-xs font-mono bg-muted/40 border border-border/60 rounded-xl px-4 py-4 text-muted-foreground overflow-x-auto">{`┌─────────────────────────────┐
│     MCP Host (Claude Code)  │
│  ┌────────────────────────┐ │
│  │   LLM (Claude Sonnet)  │ │
│  └────────────────────────┘ │
│  ┌────────────────────────┐ │
│  │      MCP Client        │ │ ← Traduce requests
│  └────────────────────────┘ │
└─────────────────────────────┘
        ↓         ↓         ↓
 ┌──────────┐ ┌────────┐ ┌────────┐
 │MCP Server│ │  MCP   │ │  MCP   │
 │SQL Server│ │ GitHub │ │ Drive  │
 └──────────┘ └────────┘ └────────┘
      ↓             ↓          ↓
 ┌────────┐    ┌────────┐ ┌────────┐
 │  SQL   │    │Git API │ │ Drive  │
 └────────┘    └────────┘ └────────┘`}</pre>
      </section>

      {/* 3 Primitivas */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-1">Las 3 Primitivas de MCP</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Cada servidor MCP puede exponer uno o varios de estos tipos de capacidades.
        </p>
        <div className="flex flex-col gap-2">
          {mcpPrimitives.map((p) => (
            <PrimitiveCard
              key={p.id}
              primitive={p}
              isExpanded={expandedPrimitive === p.id}
              onToggle={() => setExpandedPrimitive(expandedPrimitive === p.id ? null : p.id)}
            />
          ))}
        </div>
      </section>

      {/* Configuración */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-1">Instalación y Configuración</h2>
        <p className="text-sm text-muted-foreground mb-4">Dos formas de agregar MCP servers.</p>
        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-border/60 bg-card px-5 py-4">
            <p className="text-sm font-medium mb-2">Opción A — Comando interactivo (recomendado)</p>
            <pre className="text-xs font-mono bg-muted/40 border border-border/60 rounded-md px-3 py-2 text-muted-foreground">
              {`claude\n> /mcp`}
            </pre>
          </div>
          <div className="rounded-xl border border-border/60 bg-card px-5 py-4">
            <p className="text-sm font-medium mb-2">
              Opción B — Archivo{' '}
              <code className="font-mono text-xs bg-muted/60 px-1 py-0.5 rounded">
                ~/.claude/mcp.json
              </code>
            </p>
            <pre className="text-xs font-mono bg-muted/40 border border-border/60 rounded-md px-3 py-2.5 text-muted-foreground overflow-x-auto whitespace-pre-wrap">
              {mcpConfigExample}
            </pre>
          </div>
        </div>
      </section>

      {/* Servidores oficiales */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Servidores Oficiales</h2>
        <div className="overflow-hidden rounded-xl border border-border/60">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 border-b border-border/60">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">
                  Servidor
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground hidden sm:table-cell">
                  Paquete
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">
                  Para qué
                </th>
              </tr>
            </thead>
            <tbody>
              {mcpServers.map((s, i) => (
                <tr
                  key={s.name}
                  className={cn(
                    'border-b border-border/40 last:border-0',
                    i % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                  )}
                >
                  <td className="px-4 py-2.5 text-sm font-medium">{s.name}</td>
                  <td className="px-4 py-2.5 hidden sm:table-cell">
                    <code className="font-mono text-xs text-muted-foreground">{s.package}</code>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{s.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Casos de uso */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-1">Casos de Uso Prácticos</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Ejemplos de cómo combinar varios MCP servers en un solo prompt.
        </p>
        <div className="flex flex-col gap-2">
          {mcpUseCases.map((u) => (
            <UseCaseCard
              key={u.id}
              useCase={u}
              isExpanded={expandedUseCase === u.id}
              onToggle={() => setExpandedUseCase(expandedUseCase === u.id ? null : u.id)}
            />
          ))}
        </div>
      </section>

      {/* Ejemplo Notion */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Ejemplo: Instalar MCP de Notion</h2>
        <div className="rounded-xl border border-border/60 bg-card p-5">
          <p className="text-sm text-muted-foreground mb-4">
            Conecta Claude Code con tu workspace de Notion para leer y escribir páginas directamente
            desde la terminal.
          </p>
          <pre className="text-xs font-mono bg-muted/40 border border-border/60 rounded-md px-3 py-2 text-muted-foreground mb-4">
            {notionInstallCommand}
          </pre>
          <ol className="space-y-2">
            {notionInstallSteps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground text-[10px] font-bold mt-0.5">
                  {i + 1}
                </span>
                <span className="text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Seguridad */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Seguridad y Mejores Prácticas</h2>
        <div className="flex flex-col gap-3">
          {securityTips.map((tip, i) => (
            <div key={i} className="rounded-xl border border-border/60 bg-card px-5 py-4">
              <p className="text-sm font-medium mb-1">{tip.title}</p>
              <p className="text-xs text-muted-foreground mb-2">{tip.desc}</p>
              {tip.code && (
                <pre className="text-xs font-mono bg-muted/40 border border-border/60 rounded-md px-3 py-2 text-muted-foreground overflow-x-auto whitespace-pre-wrap">
                  {tip.code}
                </pre>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Troubleshooting</h2>
        <div className="flex flex-col gap-3">
          {troubleshootItems.map((item, i) => (
            <div key={i} className="rounded-lg border border-border/60 bg-card px-4 py-3">
              <p className="text-sm font-medium mb-1">{item.problem}</p>
              <p className="text-xs text-muted-foreground">{item.solution}</p>
              {item.code && (
                <pre className="mt-2 text-xs font-mono bg-muted/40 border border-border/60 rounded px-3 py-1.5 text-muted-foreground overflow-x-auto whitespace-pre-wrap">
                  {item.code}
                </pre>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Preguntas Frecuentes</h2>
        <div className="flex flex-col gap-2">
          {faqs.map((faq, i) => (
            <FaqCard
              key={i}
              faq={faq}
              isExpanded={expandedFaq === i}
              onToggle={() => setExpandedFaq(expandedFaq === i ? null : i)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

function PrimitiveCard({
  primitive,
  isExpanded,
  onToggle,
}: {
  primitive: McpPrimitive
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
        <code className="font-mono text-sm font-medium bg-muted/60 text-foreground rounded px-1.5 py-0.5">
          {primitive.title}
        </code>
        <span className={cn('text-[11px] px-2 py-0.5 rounded-full border font-medium shrink-0', primitiveStyles[primitive.id])}>
          {primitive.control}
        </span>
        <span className="ml-auto text-xs text-muted-foreground hidden sm:block truncate max-w-48">
          {primitive.desc}
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
          <p className="text-sm text-muted-foreground mt-4 mb-3">{primitive.desc}</p>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-2">
            Ejemplos
          </p>
          <ul className="space-y-1 mb-3">
            {primitive.examples.map((ex, i) => (
              <li key={i} className="text-xs font-mono text-muted-foreground bg-muted/40 px-3 py-1.5 rounded">
                {ex}
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Cuándo usar:</span> {primitive.when}
          </p>
        </div>
      )}
    </div>
  )
}

function UseCaseCard({
  useCase,
  isExpanded,
  onToggle,
}: {
  useCase: McpUseCase
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
        <span className="text-sm font-medium">{useCase.title}</span>
        <ChevronRight
          className={cn(
            'ml-auto h-4 w-4 text-muted-foreground shrink-0 transition-transform',
            isExpanded && 'rotate-90'
          )}
        />
      </button>

      {isExpanded && (
        <div className="px-5 pb-5 border-t border-border/60">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mt-4 mb-2">
            Prompt
          </p>
          <p className="text-sm text-muted-foreground italic mb-4">"{useCase.prompt}"</p>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-2">
            Cómo lo resuelve Claude
          </p>
          <ol className="space-y-2">
            {useCase.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground text-[10px] font-bold mt-0.5">
                  {i + 1}
                </span>
                <span className="text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

function FaqCard({
  faq,
  isExpanded,
  onToggle,
}: {
  faq: McpFaq
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
        <span className="text-sm font-medium">{faq.question}</span>
        <ChevronRight
          className={cn(
            'ml-auto h-4 w-4 text-muted-foreground shrink-0 transition-transform',
            isExpanded && 'rotate-90'
          )}
        />
      </button>

      {isExpanded && (
        <div className="px-5 pb-4 border-t border-border/60">
          <p className="text-sm text-muted-foreground mt-4">{faq.answer}</p>
        </div>
      )}
    </div>
  )
}
