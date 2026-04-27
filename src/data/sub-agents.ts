export interface EPLPhase {
  phase: number
  name: string
  badge: string
  desc: string
  example: string
}

export interface AgentConfigField {
  field: string
  values: string
  desc: string
  critical?: boolean
}

export interface AgentBenefit {
  title: string
  desc: string
}

export const eplPhases: EPLPhase[] = [
  {
    phase: 1,
    name: 'Explore',
    badge: 'Exploración',
    desc: 'Claude delega al subagente Explore cuando necesita buscar o entender un codebase sin hacer cambios. Mantiene los resultados de exploración fuera del contexto principal.',
    example: `Usuario: "Refactor the authentication module"
         ↓
Claude: [Invoca subagente Explore]
         ↓
Explore: Mapea todos los archivos de autenticación
         Identifica dependencias
         ↓
Devuelve: Lista de 12 archivos relevantes`,
  },
  {
    phase: 2,
    name: 'Plan',
    badge: 'Planificación',
    desc: 'Cuando estás en plan mode y Claude necesita entender tu codebase, delega la investigación al subagente Plan para diseñar la estrategia antes de actuar.',
    example: `Claude: [Invoca subagente Plan con output de Explore]
         ↓
Plan:   Analiza los 12 archivos
        Diseña estrategia de refactoring
        ↓
Devuelve: plan.md con pasos detallados`,
  },
  {
    phase: 3,
    name: 'Execute',
    badge: 'Ejecución',
    desc: 'Antes de modificar archivos, el agente Execute te muestra exactamente lo que intenta hacer y espera tu aprobación. Usa permissionMode: plan para mayor control.',
    example: `Usuario: [Aprueba el plan]
         ↓
Claude: [Ejecuta los cambios según plan.md]
         ↓
Resultado: Archivos modificados + resumen conciso`,
  },
]

export const agentConfigFields: AgentConfigField[] = [
  {
    field: 'name',
    values: 'string',
    desc: 'Identificador único del subagente.',
  },
  {
    field: 'description',
    values: 'string',
    desc: 'Claude usa esto para decidir cuándo invocar el subagente. Campo más importante.',
    critical: true,
  },
  {
    field: 'tools',
    values: 'Read, Write, Edit, Bash, Grep, Glob',
    desc: 'Herramientas permitidas. Limitar el scope mejora seguridad y rendimiento.',
  },
  {
    field: 'model',
    values: 'opus, sonnet, haiku, inherit',
    desc: 'Modelo a usar. Usa haiku para tareas simples, opus para análisis complejos.',
  },
  {
    field: 'memory',
    values: 'user, project, none',
    desc: 'Persistencia de memoria entre sesiones.',
  },
  {
    field: 'effort',
    values: 'low, medium, high, max',
    desc: 'Nivel de esfuerzo del subagente.',
  },
  {
    field: 'max-turns',
    values: 'number',
    desc: 'Límite de turnos antes de devolver el control al agente principal.',
  },
]

export const agentBenefits: AgentBenefit[] = [
  {
    title: 'Contexto aislado',
    desc: 'Cada subagente tiene su propia ventana de contexto, manteniendo la conversación principal limpia.',
  },
  {
    title: 'Ejecución paralela',
    desc: 'Múltiples subagentes pueden trabajar simultáneamente en subtareas independientes.',
  },
  {
    title: 'Especialización',
    desc: 'Prompts y herramientas específicas por dominio para máximo rendimiento.',
  },
  {
    title: 'Control de costos',
    desc: 'Usa Haiku para tareas simples y Opus solo para las complejas.',
  },
]

export const agentManualExample = `---
name: security-reviewer
description: Reviews code for security vulnerabilities including SQL injection, XSS, and auth issues
tools: Read, Grep, Glob
model: opus
memory: user
---

# Security Code Reviewer
You are a security-focused code reviewer specialized in finding vulnerabilities.

## Review Checklist

### 1. SQL Injection
- Check for string concatenation in queries
- Verify parameterized queries are used

### 2. Authentication
- Verify JWT validation
- Check password hashing (bcrypt, argon2)

## Output Format
- 🔴 Critical: [description]
- 🟡 Warning: [description]
- 🟢 Info: [description]`

export const agentCreationSteps = [
  'Selecciona "Create new agent" y elige Personal o Project.',
  'Elige "Generate with Claude" para que genere la configuración automáticamente.',
  'Describe el subagente: qué hace y cuándo debe invocarse.',
  'Selecciona las herramientas permitidas (Read, Edit, Bash, etc.).',
  'Elige el modelo: Sonnet para balance capacidad/velocidad.',
  'Selecciona el color de identificación visual.',
  'Activa la memoria si quieres que acumule insights entre sesiones.',
  'Revisa la descripción generada y guarda.',
]
