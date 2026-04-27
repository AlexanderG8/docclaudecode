# Roadmap de Secciones

## Estado General

| # | Seccion | Tipo de Pagina | Estado | Prioridad |
|---|---------|---------------|--------|-----------|
| 1 | Slash Commands | Catalogo | Completado | - |
| 2 | Notas & Tips | Catalogo | Pendiente | Alta (mas simple) |
| 3 | Hooks | Hibrida | Pendiente | Alta |
| 4 | Skills | Narrativa | Pendiente | Media |
| 5 | Sub Agentes | Narrativa | Pendiente | Media |
| 6 | MCP Servers | Hibrida extensa | Pendiente | Baja (mas compleja) |

---

## Seccion 2: Notas & Tips

**Ruta:** `/tips` | **Icono:** Lightbulb | **Color:** pink

### Interface de datos (`src/data/tips.ts`)

```ts
export type TipCategory = 'shortcut' | 'flag' | 'workflow'

export interface Tip {
  id: string
  cat: TipCategory
  badge: TipCategory
  badgeLabel: string
  title: string
  short: string
  desc: string
  keyCombo?: string   // Ej: 'Shift+Tab', 'Ctrl+E'
  command?: string    // Ej: '--dangerously-skip-permissions'
  example: string
}

export const tipCategories: { value: TipCategory | 'all'; label: string }[]
export const tips: Tip[]
```

### Contenido a migrar (6 tips de Notion)

| ID | Categoria | Titulo | keyCombo/command |
|----|-----------|--------|-----------------|
| background-tasks | workflow | Tareas en segundo plano | - |
| shift-tab | shortcut | Modo plan / editor | Shift+Tab |
| ctrl-e | shortcut | Explicacion de comando | Ctrl+E |
| skip-permissions | flag | Saltar confirmaciones | `--dangerously-skip-permissions` |
| context-tokens | workflow | Ver uso de tokens | `/context` |
| rewind-changes | workflow | Revertir cambios | `/rewind` |

### Estructura de pagina (`src/pages/Tips.tsx`)

```
Header: "Notas & Tips" + contador (6)
Search input
Filter pills: Todos | Atajos (shortcut) | Flags (flag) | Flujo de trabajo (workflow)
Lista de cards expandibles (mismo patron que SlashCommands)
  - Card header: titulo + badge + keyCombo (si aplica, con <kbd>)
  - Card expandida: descripcion completa + ejemplo
```

---

## Seccion 3: Hooks

**Ruta:** `/hooks` | **Icono:** Zap | **Color:** yellow

### Interface de datos (`src/data/hooks.ts`)

```ts
export type HookEvent = 'PreToolUse' | 'PostToolUse' | 'SessionStart' | 'PermissionRequest'
export type HandlerType = 'command' | 'http'

export interface Hook {
  event: HookEvent
  badge: HookEvent
  badgeLabel: string
  short: string
  desc: string
  whenFires: string
  usecaseTitle: string
  usecase: string
  example: string  // JSON de configuracion
}

export interface ConfigMethod {
  id: 'slash' | 'project' | 'global'
  label: string
  desc: string
  path: string
  example: string  // JSON o comando
}

export interface HandlerTypeInfo {
  id: HandlerType
  label: string
  desc: string
  example: string
}

export interface TroubleshootingItem {
  problem: string
  solution: string
  code?: string
}

export const hookEventFilters: { value: HookEvent | 'all'; label: string }[]
export const hooks: Hook[]           // 4 items
export const configMethods: ConfigMethod[]    // 3 items
export const handlerTypes: HandlerTypeInfo[]  // 2 items
export const troubleshooting: TroubleshootingItem[]
```

### Contenido a migrar (de Notion: pagina Hooks)

**4 eventos:**
- **PreToolUse** - Antes de que Claude use una herramienta. Uso: validaciones, backups
- **PostToolUse** - Despues de usar herramienta exitosamente. Uso: formateo, linting, build
- **SessionStart** - Al iniciar nueva sesion. Uso: setup inicial, carga de config
- **PermissionRequest** - Cuando Claude necesita aprobacion. Uso: auto-aprobar comandos especificos

**3 metodos de configuracion:**
1. `/hooks` - Comando interactivo (recomendado para empezar)
2. `.claude/settings.json` del proyecto - JSON de configuracion por proyecto
3. `~/.claude/settings.json` - Configuracion global para todos los proyectos

**2 tipos de handler:**
- `command` - Ejecuta un comando shell
- `http` - Hace una peticion HTTP (webhook)

**Guia de instalacion para .NET + PERN:** Contenido detallado en Notion con ejemplos de dotnet format, ESLint, TypeScript check, npm install auto-approve, bloqueo de migraciones EF Core.

**Ejemplo paso a paso:** Crear hook de notificacion Windows con PowerShell MessageBox.

### Estructura de pagina (`src/pages/Hooks.tsx`)

```
Header: "Hooks" + "Event listeners para acciones de Claude Code"
Intro: Que son los hooks (2-3 parrafos)
[CATALOGO] Search + filter por evento + cards expandibles
  - 4 cards: PreToolUse, PostToolUse, SessionStart, PermissionRequest
Configuracion: 3 cards de metodos (slash, project, global) con code blocks
Handler Types: tabla o cards de command vs http
Guia de instalacion: steps con code blocks
Troubleshooting: items colapsables
Ejemplo step-by-step: notificacion Windows
```

Badge colors para eventos:
- PreToolUse: blue
- PostToolUse: green
- SessionStart: purple
- PermissionRequest: orange

---

## Seccion 4: Skills

**Ruta:** `/skills` | **Icono:** BookMarked | **Color:** green (NUEVO en navegacion)

### Interface de datos (`src/data/skills.ts`)

```ts
export type SkillType = 'workflow' | 'integration' | 'document'
export type SkillLocation = 'global' | 'project' | 'enterprise' | 'plugin'

export interface SkillTypeInfo {
  id: SkillType
  label: string
  icon: string      // nombre del icono lucide
  desc: string
  example: string   // codigo SKILL.md de ejemplo
}

export interface SkillLocationInfo {
  id: SkillLocation
  label: string
  path: string
  desc: string
  priority: number
}

export interface ProgressiveLevel {
  level: number
  name: string   // 'Metadata' | 'Instructions' | 'Resources'
  desc: string
  tokens: string // '~100 tokens' | '~5,000 tokens' | 'variable'
}

export interface SkillMdField {
  field: string
  required: boolean
  desc: string
  example: string
}

export const skillTypes: SkillTypeInfo[]
export const skillLocations: SkillLocationInfo[]
export const progressiveLevels: ProgressiveLevel[]
export const skillMdFields: SkillMdField[]
export const customSkillExample: { title: string; steps: {...}[] }
export const marketplaceSources: { name: string; url: string; desc: string }[]
```

### Contenido a migrar (de Notion: pagina Skills)

**Concepto clave - Progressive Disclosure (3 niveles):**
1. Metadata (nombre + descripcion) - Siempre en contexto. ~100 tokens
2. Instructions (cuerpo del SKILL.md) - Solo cuando Claude decide usarlo. ~5,000 tokens
3. Resources (archivos adicionales) - Solo si las instrucciones los referencian

**Estructura minima de SKILL.md:**
```markdown
---
name: nombre-del-skill
description: Que hace y cuando usarlo (max 200 chars)
dependencies:
  - package>=version
---

# Nombre del Skill
## Overview
## Instructions
## Examples
## Guidelines
```

**Ubicaciones (prioridad: enterprise > personal > project):**
- `~/.claude/skills/` - Personal (todos los proyectos), prioridad 2
- `.claude/skills/` - Proyecto (solo este proyecto), prioridad 3
- Enterprise provision - Organizacion, prioridad 1
- Plugin - Marketplace, con namespace `plugin:skill`

**3 tipos de skills:**
1. Workflow - Guian procesos multi-paso (ej: code-review-dotnet)
2. Integration - Conocimiento sobre herramientas/MCP (ej: sqlserver-queries)
3. Document - Crean documentos con estandares (ej: erp-reports)

**Ejemplo 1:** Crear skill `/build` personalizado
**Ejemplo 2:** Instalar desde marketplace (SkillsMP, skills.sh) usando `npx skills install`

### Estructura de pagina (`src/pages/Skills.tsx`)

```
Header: "Skills" + "Carpetas de instrucciones que Claude carga dinamicamente"
Que es un Skill: intro
Progressive Disclosure: visualizacion de 3 niveles (stepped cards)
Estructura SKILL.md: tabla de campos + code block de ejemplo
Ubicaciones: 4 cards con path y prioridad
3 Tipos de Skills: cards con descripcion y ejemplo de SKILL.md
Ejemplo 1: crear /build custom (step-by-step)
Ejemplo 2: instalar desde marketplace (step-by-step con links)
```

---

## Seccion 5: Sub Agentes

**Ruta:** `/sub-agents` | **Icono:** Users | **Color:** orange (NUEVO en navegacion)

### Interface de datos (`src/data/sub-agents.ts`)

```ts
export interface BuiltinAgent {
  name: string   // 'Explore' | 'Plan' | 'Execute'
  desc: string
  whenToUse: string
  inputFrom?: string
  outputTo?: string
  example: string
}

export interface AgentBenefit {
  title: string
  desc: string
  icon: string
}

export interface AgentConfigField {
  field: string
  type: string
  required: boolean
  desc: string
  values?: string[]
}

export interface CreationMethod {
  id: 'command' | 'manual'
  label: string
  desc: string
  steps: { step: number; title: string; desc: string; code?: string }[]
}

export const builtinAgents: BuiltinAgent[]
export const benefits: AgentBenefit[]
export const agentConfigFields: AgentConfigField[]
export const creationMethods: CreationMethod[]
export const eplPatternSteps: { agent: string; action: string; output: string }[]
```

### Contenido a migrar (de Notion: pagina Sub Agentes)

**Analogia:** Los subagentes son como delegados especializados en una empresa.

**5 beneficios clave:**
- Contexto aislado - Cada subagente tiene su propia ventana de contexto
- Ejecucion paralela - Multiples subagentes trabajando simultaneamente
- Especializacion - Prompts y herramientas especificas por dominio
- Control de costos - Usa Haiku para tareas simples, Opus para complejas
- Restriccion de permisos - Limita que tools puede usar cada subagente

**3 Built-in agents:** Explore, Plan, Execute

**Patron EPL (Explore -> Plan -> Execute):**
1. Explore: mapea archivos relacionados, identifica dependencias
2. Plan: analiza archivos, disena estrategia, devuelve plan.md
3. Execute: implementa cambios segun el plan aprobado

**2 metodos de creacion:**
1. `/agents` comando interactivo (recomendado)
2. Manual: archivo .md en `.claude/agents/` o `~/.claude/agents/`

**Campos YAML del frontmatter:**
- name, description (CRITICO), tools, model (opus/sonnet/haiku/inherit), memory (user/project/none), effort (low/medium/high/max), max-turns

**Ejemplo paso a paso:** Crear agente test-creator via `/agents`

### Estructura de pagina (`src/pages/SubAgents.tsx`)

```
Header: "Sub Agentes" + "Instancias aisladas para subtareas"
Que son: intro + analogia empresa
Beneficios: 4-5 benefit cards
Built-in agents: 3 cards (Explore, Plan, Execute)
Patron EPL: visualizacion de flujo (3 pasos con flechas)
Crear custom: tabs (comando /agents vs manual)
Config YAML: tabla de campos con valores permitidos
Step-by-step: creacion de test-creator
```

---

## Seccion 6: MCP Servers (la mas compleja)

**Ruta:** `/mcp` | **Icono:** Plug | **Color:** purple

### Interface de datos (`src/data/mcp.ts`)

```ts
export type McpCategory = 'official' | 'custom'

export interface McpServer {
  name: string
  cat: McpCategory
  package: string       // '@modelcontextprotocol/server-postgres'
  short: string
  desc: string
  configJson: string    // JSON de configuracion de ejemplo
  envVars?: string[]    // Variables de entorno requeridas
}

export interface McpPrimitive {
  name: 'Tools' | 'Resources' | 'Prompts'
  controlledBy: 'model' | 'app' | 'user'
  desc: string
  examples: string[]
  whenToUse: string
}

export interface McpUseCase {
  title: string
  desc: string
  steps: string[]
  serversUsed: string[]
}

export const officialServers: McpServer[]
export const primitives: McpPrimitive[]
export const useCases: McpUseCase[]
export const securityPractices: { title: string; desc: string; example?: string }[]
export const troubleshooting: { problem: string; solution: string; code?: string }[]
export const notionMcpGuide: { step: number; title: string; desc: string; code?: string }[]
```

### Contenido a migrar (de Notion: pagina MCP)

**Analogia:** MCP es como un puerto USB-C universal para IA.

**Problema que resuelve:** Antes necesitabas N x M integraciones custom. Con MCP son solo N servers (uno por servicio).

**Arquitectura:**
```
Host (Claude Code) -> MCP Client -> [MCP Server 1 (SQL), MCP Server 2 (GitHub), ...]
                                    -> [Data Sources]
```

**3 Primitivas:** Tools (modelo decide), Resources (app decide), Prompts (usuario decide)

**6 Servidores oficiales:**
- PostgreSQL: `@modelcontextprotocol/server-postgres`
- GitHub: `@modelcontextprotocol/server-github`
- Google Drive: `@modelcontextprotocol/server-google-drive`
- Slack: `@modelcontextprotocol/server-slack`
- Filesystem: `@modelcontextprotocol/server-filesystem`
- Brave Search: `@modelcontextprotocol/server-brave-search`

**Crear server custom:** Ejemplo completo con Node.js para SQL Server (execute_query, list_tables, get_table_schema, get_stored_procedures)

**3 Casos de uso practicos:** Debugging en produccion, documentacion automatica, code review automatico

**Buenas practicas de seguridad:** minimo privilegio, no commitear credenciales, validar inputs, HTTPS para servers remotos

**Guia paso a paso:** Agregar MCP de Notion a Claude Code

### Estructura de pagina (`src/pages/Mcp.tsx`)

```
Header: "MCP Servers" + "Model Context Protocol"
Que es MCP: intro + analogia USB-C
Por que usar MCP: visualizacion del problema N*M
Arquitectura: diagrama de texto estilizado
3 Primitivas: 3 cards (Tools/Resources/Prompts)
[CATALOGO] Servidores oficiales: cards filtrables con install + config JSON
Crear server custom: guia step-by-step con codigo Node.js
Casos de uso: 3 cards expandibles
Seguridad: lista con callout boxes
Troubleshooting: items colapsables
Ejemplo Notion MCP: steps numerados
```
