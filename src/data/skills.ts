export type SkillType = 'workflow' | 'integration' | 'document'
export type SkillScope = 'personal' | 'project' | 'enterprise' | 'marketplace'

export interface SkillTypeItem {
  id: SkillType
  title: string
  desc: string
  example: string
}

export interface SkillLocation {
  id: SkillScope
  path: string
  scope: string
  priority: string
}

export interface ProgressiveLevel {
  level: number
  name: string
  tokens: string
  desc: string
}

export const skillTypes: SkillTypeItem[] = [
  {
    id: 'workflow',
    title: 'Workflow Skills',
    desc: 'Guían a Claude en procesos multi-paso con checklist y etapas definidas. Ideal para tareas repetitivas que siguen un proceso específico.',
    example: `---
name: code-review-dotnet
description: Reviews .NET code for security, performance, and best practices
---

## Review Checklist
1. Security: SQL injection, XSS, auth issues
2. Performance: N+1 queries, inefficient LINQ
3. Best practices: async/await, IDisposable, naming`,
  },
  {
    id: 'integration',
    title: 'Integration Skills',
    desc: 'Añaden conocimiento sobre cómo usar herramientas o MCP servers. Capturan flujos de trabajo y mejores prácticas para que Claude las aplique consistentemente.',
    example: `---
name: sqlserver-queries
description: Best practices for querying ERPGrupoPimentel database
---

## Query Guidelines
- Always use parameterized queries
- Include NOLOCK hints for read-only queries
- Use EXISTS instead of IN for large datasets`,
  },
  {
    id: 'document',
    title: 'Document Skills',
    desc: 'Crean documentos profesionales siguiendo estándares y plantillas específicas de tu empresa u organización.',
    example: `---
name: erp-reports
description: Create sales reports following company template
---

## Report Structure
1. Executive Summary
2. Period Comparison
3. Top Products
4. Regional Breakdown`,
  },
]

export const skillLocations: SkillLocation[] = [
  {
    id: 'personal',
    path: '~/.claude/skills/',
    scope: 'Personal — todos tus proyectos',
    priority: '2',
  },
  {
    id: 'project',
    path: '.claude/skills/',
    scope: 'Proyecto — solo este proyecto',
    priority: '3',
  },
  {
    id: 'enterprise',
    path: 'Enterprise provision',
    scope: 'Organización — todos los usuarios',
    priority: '1 (máxima)',
  },
  {
    id: 'marketplace',
    path: 'Plugin / Marketplace',
    scope: 'Marketplace — se invoca con namespace plugin:skill',
    priority: 'Namespace propio',
  },
]

export const progressiveLevels: ProgressiveLevel[] = [
  {
    level: 1,
    name: 'Metadata',
    tokens: '~100 tokens',
    desc: 'Nombre y descripción — siempre en contexto. Claude decide si cargar el skill basándose solo en esto.',
  },
  {
    level: 2,
    name: 'Instructions',
    tokens: '~5,000 tokens',
    desc: 'Cuerpo del SKILL.md — se carga solo cuando Claude decide usar el skill.',
  },
  {
    level: 3,
    name: 'Resources',
    tokens: 'Variable',
    desc: 'Archivos adicionales (scripts, plantillas) — se cargan solo si las instrucciones los referencian.',
  },
]

export const skillMdTemplate = `---
name: nombre-del-skill
description: Descripción clara de qué hace y cuándo usarlo (máx 200 caracteres)
dependencies:
  - package-name>=version
---

# Nombre del Skill

## Overview
Explicación de qué hace el skill y cuándo Claude debe usarlo.

## Instructions
Pasos específicos que Claude debe seguir.

## Examples
Ejemplos concretos de uso.

## Guidelines
Mejores prácticas y restricciones.`

export const customSkillExample = `---
name: build
description: Revisar el código al ejecutar npm run build, y si falla, corrige los errores y vuelve a intentar.
---

1. Ejecuta el comando \`npm run build\` en el terminal.
2. Si el comando falla, revisar los mensajes de error en la salida.
3. Identifica y corrige los errores según los mensajes de error.

### Notas adicionales:
- No modificar las reglas de eslint.`
