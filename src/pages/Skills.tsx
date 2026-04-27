import { useState } from 'react'
import { ChevronRight, BookMarked } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  skillTypes,
  skillLocations,
  progressiveLevels,
  skillMdTemplate,
  customSkillExample,
  type SkillTypeItem,
} from '@/data/skills'

const typeStyles: Record<string, string> = {
  workflow:
    'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/60',
  integration:
    'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/60',
  document:
    'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/60 dark:text-green-300 dark:border-green-800/60',
}

const typeLabels: Record<string, string> = {
  workflow: 'Workflow',
  integration: 'Integration',
  document: 'Document',
}

export default function Skills() {
  const [expandedType, setExpandedType] = useState<string | null>(null)

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Skills</h1>
        <p className="text-muted-foreground leading-relaxed">
          Carpetas de instrucciones y recursos que Claude carga dinámicamente para mejorar su
          rendimiento en tareas especializadas y repetibles.
        </p>
      </div>

      {/* Qué es un Skill */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-3">¿Qué es un Skill?</h2>
        <div className="rounded-xl border border-border/60 bg-card px-5 py-4">
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Los Skills enseñan a Claude cómo completar tareas específicas de manera repetible: crear
            documentos con las pautas de tu empresa, analizar datos con los flujos de trabajo de tu
            organización, o automatizar tareas personales.
          </p>
          <div className="flex items-start gap-3 bg-muted/40 rounded-lg px-4 py-3 border border-border/40">
            <BookMarked className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Analogía:</span> Un Skill es como un{' '}
              <span className="font-medium text-foreground">manual de procedimientos</span> que
              Claude consulta cuando necesita hacer algo específico. No memoriza todo el manual,
              solo lo lee cuando lo necesita.
            </p>
          </div>
        </div>
      </section>

      {/* Carga Progresiva */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-1">Carga Progresiva</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Claude carga los skills en 3 etapas según los necesita, en lugar de consumir todo el
          contexto por adelantado.
        </p>
        <div className="flex flex-col gap-2">
          {progressiveLevels.map((level) => (
            <div
              key={level.level}
              className="flex items-start gap-4 rounded-lg border border-border/60 bg-card px-4 py-3"
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-[11px] font-bold mt-0.5">
                {level.level}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-medium">{level.name}</span>
                  <span className="text-[11px] text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded font-mono">
                    {level.tokens}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{level.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Estructura SKILL.md */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-1">Estructura del SKILL.md</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Cada skill requiere como mínimo un archivo <code className="font-mono text-xs bg-muted/60 px-1 py-0.5 rounded">SKILL.md</code> con frontmatter YAML y las instrucciones.
        </p>
        <div className="rounded-xl border border-border/60 bg-card px-5 py-4 mb-3">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2 opacity-60">
            Estructura de carpeta
          </p>
          <pre className="text-xs font-mono text-muted-foreground">{`mi-skill/
├── SKILL.md          # Obligatorio: metadata + instrucciones
├── REFERENCE.md      # Opcional: info de referencia
├── script.py         # Opcional: código ejecutable
└── templates/        # Opcional: plantillas, ejemplos`}</pre>
        </div>
        <pre className="text-xs font-mono bg-muted/40 border border-border/60 rounded-xl px-4 py-3.5 text-muted-foreground overflow-x-auto whitespace-pre-wrap">
          {skillMdTemplate}
        </pre>
      </section>

      {/* Ubicaciones */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-1">Ubicaciones</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Cuando skills comparten nombre en distintos niveles, mayor prioridad gana:{' '}
          <span className="font-medium text-foreground">enterprise {'>'} personal {'>'} project</span>.
        </p>
        <div className="overflow-hidden rounded-xl border border-border/60">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 border-b border-border/60">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">
                  Ruta
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground hidden sm:table-cell">
                  Alcance
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">
                  Prioridad
                </th>
              </tr>
            </thead>
            <tbody>
              {skillLocations.map((loc, i) => (
                <tr
                  key={loc.id}
                  className={cn(
                    'border-b border-border/40 last:border-0',
                    i % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                  )}
                >
                  <td className="px-4 py-2.5">
                    <code className="font-mono text-xs bg-muted/60 px-1.5 py-0.5 rounded text-foreground">
                      {loc.path}
                    </code>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground hidden sm:table-cell">
                    {loc.scope}
                  </td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{loc.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Claude vigila los directorios de skills para cambios. Agregar o editar un skill surte efecto en la sesión actual sin necesidad de reiniciar.
        </p>
      </section>

      {/* Tipos de Skills */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-1">Tipos de Skills</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Expande cada tipo para ver su descripción y un ejemplo de SKILL.md.
        </p>
        <div className="flex flex-col gap-2">
          {skillTypes.map((type) => (
            <SkillTypeCard
              key={type.id}
              item={type}
              isExpanded={expandedType === type.id}
              onToggle={() => setExpandedType(expandedType === type.id ? null : type.id)}
            />
          ))}
        </div>
      </section>

      {/* Cómo crear */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Cómo crear un Skill</h2>

        {/* Ejemplo 1: Custom */}
        <div className="rounded-xl border border-border/60 bg-card p-5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
              1
            </span>
            <p className="text-sm font-medium">Crear skill propio</p>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Crea la carpeta <code className="font-mono text-xs bg-muted/60 px-1 py-0.5 rounded">.claude/skills/nombre-skill/</code> y dentro el archivo <code className="font-mono text-xs bg-muted/60 px-1 py-0.5 rounded">SKILL.md</code> con el formato de cabecera + instrucciones:
          </p>
          <pre className="text-xs font-mono bg-muted/40 border border-border/60 rounded-md px-3 py-2.5 text-muted-foreground overflow-x-auto whitespace-pre-wrap mb-3">
            {customSkillExample}
          </pre>
          <p className="text-xs text-muted-foreground">
            Luego en Claude Code ejecuta{' '}
            <code className="font-mono bg-muted/60 px-1 py-0.5 rounded">/build</code> y realizará
            las instrucciones indicadas.
          </p>
        </div>

        {/* Ejemplo 2: Marketplace */}
        <div className="rounded-xl border border-border/60 bg-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
              2
            </span>
            <p className="text-sm font-medium">Instalar desde Marketplace</p>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Existen marketplaces donde buscar e instalar skills de la comunidad. El flujo de
            instalación:
          </p>
          <ol className="space-y-2 mb-4">
            {marketplaceSteps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground text-[10px] font-bold mt-0.5">
                  {i + 1}
                </span>
                <span className="text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
          <p className="text-xs text-muted-foreground">
            Una vez instalado, ejecuta{' '}
            <code className="font-mono bg-muted/60 px-1 py-0.5 rounded">/skills</code> en Claude
            Code para verificar los skills instalados.
          </p>
        </div>
      </section>
    </div>
  )
}

function SkillTypeCard({
  item,
  isExpanded,
  onToggle,
}: {
  item: SkillTypeItem
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
        <span
          className={cn(
            'text-[11px] px-2 py-0.5 rounded-full border font-medium shrink-0',
            typeStyles[item.id]
          )}
        >
          {typeLabels[item.id]}
        </span>
        <span className="text-sm font-medium">{item.title}</span>
        <span className="ml-auto text-xs text-muted-foreground hidden sm:block truncate max-w-52">
          {item.desc.split('.')[0]}
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
          <p className="text-sm text-muted-foreground mt-4 mb-4">{item.desc}</p>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider opacity-60 mb-2">
            Ejemplo SKILL.md
          </p>
          <pre className="text-xs font-mono bg-muted/40 border border-border/60 rounded-md px-3 py-2.5 text-muted-foreground overflow-x-auto whitespace-pre-wrap">
            {item.example}
          </pre>
        </div>
      )}
    </div>
  )
}

const marketplaceSteps = [
  'Busca el skill en el marketplace (SkillsMP o Skills by Vercel).',
  'Copia el comando de instalación del skill.',
  'Pégalo en la terminal de tu proyecto.',
  'Selecciona "Claude Code" como destino y elige proyecto o global.',
  'Selecciona el método de instalación (recomendado: Symlink).',
  'Confirma la instalación y acepta dependencias opcionales (ej. find-skills).',
]
