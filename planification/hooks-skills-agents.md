# Hooks, Skills y Sub Agentes Recomendados para este Proyecto

## Hooks Recomendados

Configurar en `.claude/settings.json` (nivel proyecto).

### Hook 1: Build Validation (PostToolUse)

Ejecuta el build de TypeScript automaticamente despues de cada edicion para detectar errores antes de terminar la sesion.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "npm run build 2>&1 | tail -30"
          }
        ]
      }
    ]
  }
}
```

**Por que:** Este proyecto usa TypeScript estricto con interfaces complejas en `src/data/`. Un error de tipo en los datos rompe toda la pagina. Mejor detectarlo inmediatamente.

### Hook 2: Data File Protection (PreToolUse)

Avisa antes de modificar archivos de datos para recordar preservar las interfaces TypeScript.

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'AVISO: Modificando archivo de datos. Verifica que las interfaces TypeScript no se rompan.'"
          }
        ]
      }
    ]
  }
}
```

**Por que:** Los archivos `src/data/*.ts` son la fuente de verdad de todo el contenido. Cambiar una interface sin actualizar los datos rompe el build.

### Hook 3: Session Context Loader (SessionStart)

Al iniciar sesion, recuerda a Claude las convenciones del proyecto.

```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "echo 'DocClaudeCode: React doc site en espanol. Patron: src/data/*.ts + src/pages/*.tsx. Importa con @/. ShadCN usa Base UI (NO asChild). Badge styles: light bg + colored text + border.'"
          }
        ]
      }
    ]
  }
}
```

**Por que:** Contexto rapido sin cargar CLAUDE.md en cada mensaje. Especialmente util para recordar que es Base UI y no Radix.

---

## Skills Recomendados

### Skill existente: `/build`

Ya instalado en `.claude/skills/build/SKILL.md`. Funciona bien tal como esta.

### Skill nuevo: `/new-page`

Crea una seccion de documentacion completa siguiendo el patron establecido.

**Ubicacion:** `.claude/skills/new-page/SKILL.md`

```markdown
---
name: new-page
description: Create a new documentation section page following the established data+page pattern. Use when adding a new section to the site.
---

# Crear Nueva Seccion de Documentacion

## Pasos

1. Identificar el tipo de pagina:
   - Catalogo: items discretos con busqueda y filtros (seguir patron SlashCommands.tsx)
   - Narrativa: guia rica con secciones y codigo (secciones con anclas)
   - Hibrida: intro + catalogo + guia

2. Crear archivo de datos en `src/data/{seccion}.ts`:
   - Definir interfaces TypeScript tipadas
   - Exportar arrays de datos con toda la informacion de la seccion
   - Exportar array de filtros/categorias si aplica

3. Crear pagina en `src/pages/{Seccion}.tsx`:
   - Para catalogo: copiar estructura de SlashCommands.tsx (useState para search/filter/expanded)
   - Para narrativa: estructura con secciones claras y code blocks
   - Usar componentes de `@/components/ui/` (card, badge, input)
   - Todo el texto en espanol
   - Importar datos desde `@/data/{seccion}`

4. Agregar ruta en `src/App.tsx`:
   - Importar el nuevo componente
   - Agregar `<Route path="{ruta}" element={<NuevaPagina />} />`

5. Actualizar `src/components/Sidebar.tsx`:
   - Quitar `soon: true` del nav item correspondiente
   - Agregar `count: N` si aplica

6. Actualizar `src/pages/Home.tsx`:
   - Cambiar `available: false` a `available: true` en la card de la seccion

7. Ejecutar `npm run build` para verificar sin errores

## Notas importantes
- Path alias `@/` mapea a `src/`
- ShadCN usa Base UI, NO Radix. No usar `asChild`, usar `render={<Component />}`
- Badge styles: `bg-{color}-50 text-{color}-700 border-{color}-200` + dark mode overrides
- El texto del sidebar debe estar en espanol
```

### Skill nuevo: `/sync-notion`

Sincroniza el contenido de una seccion desde Notion usando el MCP.

**Ubicacion:** `.claude/skills/sync-notion/SKILL.md`

```markdown
---
name: sync-notion
description: Fetch content from a Notion page and update the corresponding data file in src/data/. Use when Notion content has been updated and needs to sync to the web.
---

# Sincronizar Contenido desde Notion

## Pasos

1. Usar `mcp__notion__notion-fetch` con el ID de la pagina de Notion
   (Ver planification/notion-content-map.md para los IDs)

2. Analizar el contenido retornado y mapearlo a la interface TypeScript
   del archivo `src/data/{seccion}.ts` correspondiente

3. Actualizar el archivo de datos manteniendo:
   - La misma estructura de interfaces
   - Todos los campos requeridos
   - El texto en espanol
   - Los valores validos para los tipos union (cat, badge, etc.)

4. Ejecutar `npm run build` para verificar que el archivo de datos es valido

## Mapeo de IDs de Notion
Ver `planification/notion-content-map.md`

## Notas
- No modificar las interfaces TypeScript, solo los datos
- Si el contenido de Notion tiene imagenes, omitirlas (no aplican al formato web)
- Mantener consistencia de estilos con el resto del contenido del sitio
```

---

## Sub Agentes Recomendados

### Sub agente existente: `test-creator`

Ya configurado en `.claude/agents/`. Funciona bien para crear tests de nuevas funcionalidades.

### Sub agente nuevo: `content-migrator`

Especializado en migrar contenido de Notion a TypeScript, con acceso a las herramientas MCP de Notion.

**Ubicacion:** `.claude/agents/content-migrator.md`

```markdown
---
name: content-migrator
description: "Migrates content from Notion pages to typed TypeScript data files in src/data/. Use when a new section needs its data populated from Notion, or when Notion content has been updated."
tools: Read, Write, Edit, Glob, mcp__notion__notion-fetch, mcp__notion__notion-search
model: sonnet
color: blue
memory: project
---

# Content Migrator Agent

Eres un agente especializado en migrar contenido de Notion a archivos de datos TypeScript para el sitio docclaudecode.

## Tu funcion

1. Usar las herramientas MCP de Notion para obtener el contenido de la pagina indicada
2. Transformar ese contenido a la estructura TypeScript definida en `src/data/`
3. Escribir o actualizar el archivo de datos correspondiente
4. Verificar que el archivo compile correctamente

## Reglas criticas

- Mantener todo el texto en espanol
- Respetar las interfaces TypeScript existentes (no modificarlas)
- Los valores de `cat`, `badge`, `badgeLabel` deben coincidir con los tipos union definidos
- Omitir imagenes de Notion (no tienen equivalente en el formato web)
- Si un campo de la interface no tiene contenido equivalente en Notion, usar string descriptivo

## Mapeo de IDs de Notion

Ver `planification/notion-content-map.md` para los IDs de cada pagina.
```

### Sub agente nuevo: `page-reviewer`

Revisa paginas nuevas por consistencia con los patrones establecidos.

**Ubicacion:** `.claude/agents/page-reviewer.md`

```markdown
---
name: page-reviewer
description: "Reviews new documentation pages for pattern consistency, design system compliance, and content quality. Use after creating or significantly modifying a page."
tools: Read, Glob, Grep
model: sonnet
color: green
memory: project
---

# Page Reviewer Agent

Eres un agente especializado en revisar la calidad y consistencia de las paginas del sitio docclaudecode.

## Checklist de revision

### Imports y estructura
- [ ] Todos los imports usan el alias `@/`
- [ ] No hay imports de Radix UI (debe ser Base UI)
- [ ] Datos importados desde `@/data/{seccion}`

### Patrones de UI
- [ ] Badge styles siguen el patron: `bg-{color}-50 text-{color}-700 border-{color}-200` + dark overrides
- [ ] Componentes de ShadCN usados correctamente (no `asChild`, usar `render=`)
- [ ] Cards expandibles siguen el patron de `SlashCommands.tsx`

### Contenido
- [ ] Todo el texto en espanol
- [ ] Titulos consistentes con el resto del sitio
- [ ] Sin contenido hardcodeado que deberia estar en `src/data/`

### Responsive
- [ ] Funciona en mobile (sin sidebar, con Sheet drawer)
- [ ] Funciona en desktop (con sidebar de 240px)

### TypeScript
- [ ] Ejecutar `npm run build` sin errores
- [ ] Tipos explicitamente definidos (sin `any`)

## Output esperado

Lista de issues encontrados con:
- Descripcion del problema
- Ubicacion (archivo:linea)
- Sugerencia de correccion
```
