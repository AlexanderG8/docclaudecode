# Mapeo de Contenido Notion -> Secciones Web

## Pagina Principal

| Campo | Valor |
|-------|-------|
| Titulo | Claude Code |
| Notion Page ID | `344a0fd4-c63f-803a-8982-c5b845f4f75a` |
| URL | https://www.notion.so/344a0fd4c63f803a8982c5b845f4f75a |
| Ultima actualizacion | 2026-04-26 |
| Padre | IA Para Programadores |

---

## Subpaginas (Secciones del Sitio)

| Seccion Web | Ruta | Titulo Notion | Notion Page ID | Data file |
|-------------|------|--------------|----------------|-----------|
| Slash Commands | `/slash-commands` | Comand Slash | `344a0fd4-c63f-8087-80b7-fee982f78e1a` | `src/data/slash-commands.ts` |
| Hooks | `/hooks` | Hooks | `34ba0fd4-c63f-8074-9fbc-cf399cd42174` | `src/data/hooks.ts` (pendiente) |
| MCP Servers | `/mcp` | MCP | `34ba0fd4-c63f-8049-8b08-e9afdecee442` | `src/data/mcp.ts` (pendiente) |
| Skills | `/skills` | Skills | `34ba0fd4-c63f-8082-a290-c4f360010110` | `src/data/skills.ts` (pendiente) |
| Sub Agentes | `/sub-agents` | Sub Agentes | `34da0fd4-c63f-8001-8bb3-caac8e9afc0a` | `src/data/sub-agents.ts` (pendiente) |
| Notas & Tips | `/tips` | Notas | `34ba0fd4-c63f-807f-85d9-fc1b8a957459` | `src/data/tips.ts` (pendiente) |

---

## Como usar estos IDs con el MCP de Notion

En Claude Code con el MCP de Notion configurado, usar:

```
# Obtener contenido de una pagina especifica
mcp__notion__notion-fetch con id: "34ba0fd4-c63f-8074-9fbc-cf399cd42174"

# Buscar dentro de la pagina Claude Code
mcp__notion__notion-search con page_url: "344a0fd4c63f803a8982c5b845f4f75a"
```

O usar el skill `/sync-notion` que ya tiene este mapeo incorporado.

---

## Jerarquia en Notion

```
My Notes
└── (Database)
    └── IA Para Programadores
        └── Claude Code (344a0fd4...)
            ├── Comand Slash (344a0fd4-c63f-8087...)
            ├── Hooks (34ba0fd4-c63f-8074...)
            ├── MCP (34ba0fd4-c63f-8049...)
            ├── Skills (34ba0fd4-c63f-8082...)
            ├── Sub Agentes (34da0fd4-c63f-8001...)
            └── Notas (34ba0fd4-c63f-807f...)
```

---

## Notas de Sincronizacion

- Las paginas de Notion tienen imagenes (capturas de pantalla) que NO se migran al sitio web
- El contenido textual y de codigo se migra completamente
- Las tablas de Notion se convierten en arrays de objetos TypeScript
- Los bloques de codigo (code blocks) se convierten en el campo `example` de cada item
- Los toggle blocks (contenido expandible) se convierten en secciones o items expandibles

### Frecuencia recomendada de sincronizacion

Revisar si hay actualizaciones en Notion antes de iniciar cada sesion de desarrollo. Usar el campo `timestamp` de los resultados de `mcp__notion__notion-search` para detectar cambios recientes.
