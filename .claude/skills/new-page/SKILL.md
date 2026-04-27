---
name: new-page
description: Create a new documentation section page following the established data+page pattern. Use when adding a new section to the site.
---

# Crear Nueva Seccion de Documentacion

## Pasos

1. Identificar el tipo de pagina:
   - Catalogo: items discretos con busqueda y filtros (seguir patron de `src/pages/SlashCommands.tsx`)
   - Narrativa: guia con secciones, codigo y explicaciones
   - Hibrida: intro narrativa + catalogo filtrable + guia

2. Crear archivo de datos en `src/data/{seccion}.ts`:
   - Definir interfaces TypeScript tipadas
   - Exportar arrays de datos con toda la informacion de la seccion
   - Exportar array de filtros/categorias si aplica
   - Seguir el patron de `src/data/slash-commands.ts`

3. Crear pagina en `src/pages/{Seccion}.tsx`:
   - Para catalogo: copiar estructura de `SlashCommands.tsx` (useState para search/filter/expanded)
   - Para narrativa: secciones claras con code blocks y tablas
   - Usar componentes de `@/components/ui/` (card, badge, input, sheet, button)
   - Todo el texto en espanol
   - Importar datos desde `@/data/{seccion}`

4. Agregar ruta en `src/App.tsx`:
   - Importar el nuevo componente
   - Agregar `<Route path="{ruta}" element={<NuevaPagina />} />` dentro de `<Route path="/" element={<Layout />}>`

5. Actualizar `src/components/Sidebar.tsx`:
   - Quitar `soon: true` del nav item correspondiente
   - Agregar `count: N` con el numero de items si aplica

6. Actualizar `src/pages/Home.tsx`:
   - Cambiar `available: false` a `available: true` en la card de la seccion

7. Ejecutar `npm run build` para verificar sin errores TypeScript

## Convenciones importantes

- Path alias `@/` mapea a `src/` — siempre usarlo para imports internos
- ShadCN usa Base UI (`@base-ui/react`), NO Radix UI. No usar `asChild`, usar `render={<Component />}`
- Badge styles: `bg-{color}-50 text-{color}-700 border-{color}-200` + dark mode: `dark:bg-{color}-950/40 dark:text-{color}-400 dark:border-{color}-800`
- Los contadores de comandos/items van en el nav item como propiedad `count`
