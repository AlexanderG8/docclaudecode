# DocClaudeCode - Sitio Web de Documentacion

## Que es este proyecto

Sitio web personal de documentacion sobre Claude Code, escrito en espanol. Sirve como **backup offline de la documentacion que vive en Notion**, para tener acceso cuando Notion no este disponible o se quiera compartir de forma publica.

## Objetivo

Migrar las 6 secciones documentadas en Notion a paginas web interactivas con busqueda, filtros y contenido expandible.

## Estado Actual (2026-04-26)

| Seccion | Estado | Pagina | Datos |
|---------|--------|--------|-------|
| Slash Commands | Completado | `src/pages/SlashCommands.tsx` | `src/data/slash-commands.ts` |
| Hooks | Pendiente | - | - |
| MCP Servers | Pendiente | - | - |
| Skills | Pendiente | - | - |
| Sub Agentes | Pendiente | - | - |
| Notas & Tips | Pendiente | - | - |

**Navegacion pendiente de reestructurar:** El sidebar tiene CLAUDE.md y CLI Flags (sin contenido) en lugar de Skills y Sub Agentes. Ver `architecture.md`.

## Stack Tecnico

- **Framework:** React 19 + TypeScript 5
- **Build:** Vite 6
- **Estilos:** Tailwind CSS v4 + ShadCN/ui (Base UI, NO Radix)
- **Routing:** React Router v7
- **Iconos:** Lucide React
- **Lenguaje UI:** Espanol

## Como correr el proyecto

```bash
npm run dev      # Servidor de desarrollo en http://localhost:5173
npm run build    # Compilar produccion (tsc -b && vite build)
npm run preview  # Preview del build de produccion
```

## Estructura de carpetas relevante

```
src/
├── data/
│   └── slash-commands.ts     # Fuente de datos de comandos (patron a seguir)
├── pages/
│   ├── Home.tsx              # Landing con cards de secciones
│   └── SlashCommands.tsx     # Ejemplo de pagina de catalogo implementada
├── components/
│   ├── Layout.tsx            # Sidebar (desktop) + Sheet drawer (mobile)
│   ├── Sidebar.tsx           # Navegacion con estados activo/pronto
│   └── ui/                   # Componentes ShadCN (card, badge, input, sheet)
├── App.tsx                   # BrowserRouter + Routes
└── index.css                 # Tailwind v4 + variables CSS ShadCN
planification/                # Esta carpeta - documentacion del proyecto
.claude/
├── skills/                   # Skills personalizados para este proyecto
├── agents/                   # Sub agentes del proyecto
└── settings.json             # Hooks de proyecto
```

## Contexto de Notion

La documentacion fuente esta en la pagina de Notion "Claude Code" (dentro de "IA Para Programadores"). Ver `notion-content-map.md` para los IDs de cada pagina.
