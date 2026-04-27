# Arquitectura del Proyecto

## Patron Principal: Data-Driven

Cada seccion de documentacion sigue el mismo patron:

```
src/data/{seccion}.ts        <- Fuente de verdad: interfaces TypeScript + arrays de datos
src/pages/{Seccion}.tsx      <- Componente de pagina que consume los datos
```

### Por que este patron

- Separa contenido de presentacion
- Facilita actualizar contenido sin tocar UI
- Permite sincronizacion automatica desde Notion via MCP (ver `hooks-skills-agents.md`)
- TypeScript valida la estructura del contenido

---

## Dos Tipos de Pagina

### 1. Pagina de Catalogo (patron SlashCommands)

Para secciones con items discretos y buscables.

**Referencia:** `src/pages/SlashCommands.tsx` + `src/data/slash-commands.ts`

Estructura:
```
Header (titulo + contador)
Search input
Filter pills (categorias)
Lista de cards expandibles (CommandCard pattern)
```

**Cuando usar:** Tips/Notas, Hooks (seccion de eventos)

### 2. Pagina Narrativa (para guias ricas)

Para secciones con explicaciones, diagramas, ejemplos de codigo y paso a paso.

Estructura:
```
Header (titulo + descripcion)
Secciones con anclas (id para TOC)
Code blocks estilizados
Callout boxes (info/warning/tip)
Tablas de referencia
```

**Cuando usar:** Skills, Sub Agentes, MCP (partes conceptuales)

### 3. Pagina Hibrida

Combinacion: intro narrativa + catalogo filtrable + secciones de guia.

**Cuando usar:** Hooks (intro + catalogo de eventos + guia de configuracion), MCP (conceptos + catalogo de servers)

---

## Reestructuracion de Navegacion Pendiente

El sidebar actual NO coincide con el contenido real. Cambio planificado:

### Estado actual (`src/components/Sidebar.tsx`)
```
/ Inicio
/slash-commands Slash Commands (activo)
/hooks Hooks (pronto)
/claude-md CLAUDE.md (pronto) <- ELIMINAR
/mcp MCP Servers (pronto)
/cli-flags CLI Flags (pronto) <- ELIMINAR
/tips Tips & Tricks (pronto)
```

### Estado objetivo
```
/ Inicio
/slash-commands Slash Commands (activo, count: 25)
/hooks Hooks (pronto -> activo)
/mcp MCP Servers (pronto -> activo)
/skills Skills (NUEVO)
/sub-agents Sub Agentes (NUEVO)
/tips Notas & Tips (pronto -> activo)
```

### Archivos a modificar

1. **`src/components/Sidebar.tsx`**
   - Eliminar `{ to: '/claude-md', ... }` y `{ to: '/cli-flags', ... }`
   - Agregar `{ to: '/skills', label: 'Skills', icon: BookMarked }`
   - Agregar `{ to: '/sub-agents', label: 'Sub Agentes', icon: Users }`
   - Importar `BookMarked`, `Users` de `lucide-react`
   - Quitar `soon: true` a medida que se implementen las paginas

2. **`src/pages/Home.tsx`**
   - Eliminar cards de CLAUDE.md y CLI Flags del array `sections`
   - Agregar card Skills: `{ to: '/skills', icon: BookMarked, iconColor: 'text-green-600', iconBg: 'bg-green-50', ... }`
   - Agregar card Sub Agentes: `{ to: '/sub-agents', icon: Users, iconColor: 'text-orange-600', iconBg: 'bg-orange-50', ... }`
   - Actualizar `available: true` en cada card a medida que se implementen

3. **`src/App.tsx`**
   - Agregar 5 rutas bajo `<Route path="/" element={<Layout />}>`:
   ```tsx
   <Route path="hooks" element={<Hooks />} />
   <Route path="mcp" element={<Mcp />} />
   <Route path="skills" element={<Skills />} />
   <Route path="sub-agents" element={<SubAgents />} />
   <Route path="tips" element={<Tips />} />
   ```

---

## Convenciones Clave

### Imports
- Siempre usar alias `@/` para imports internos: `import { cn } from '@/lib/utils'`

### ShadCN con Base UI
- NO usar prop `asChild` (es de Radix UI, no de Base UI)
- Para composicion usar `render={<Component />}`

### Estilos de Badge por Categoria

Patron establecido en SlashCommands:
```ts
const badgeStyles: Record<Category, string> = {
  context:  'bg-blue-50   text-blue-700   border-blue-200   dark:bg-blue-950/40   dark:text-blue-400   dark:border-blue-800',
  dev:      'bg-green-50  text-green-700  border-green-200  dark:bg-green-950/40  dark:text-green-400  dark:border-green-800',
  config:   'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-800',
  info:     'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-800',
  integ:    'bg-red-50    text-red-700    border-red-200    dark:bg-red-950/40    dark:text-red-400    dark:border-red-800',
  bundle:   'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800',
}
```

Cada seccion nueva define sus propios colores siguiendo este mismo patron (light bg + colored text + border + dark overrides).

### Texto UI
- Todo en espanol
- Titulos de seccion en formato "Titulo de Seccion" (capitalizacion de titulos)

### Responsive
- Sidebar visible solo en desktop (`hidden md:flex`)
- Mobile usa Sheet drawer (componente ShadCN en `Layout.tsx`)

### Dark Mode
- Variables CSS ya definidas en `src/index.css` bajo `.dark`
- Activar agregando `class="dark"` al `<html>` en `index.html`
- Ningun toggle implementado aun

---

## Como Agregar una Nueva Seccion (Checklist)

1. Crear `src/data/{seccion}.ts` con interfaces tipadas y arrays exportados
2. Crear `src/pages/{Seccion}.tsx` siguiendo el patron catalogo o narrativo
3. Agregar ruta en `src/App.tsx`
4. Actualizar `navItems` en `src/components/Sidebar.tsx` (quitar `soon: true`)
5. Actualizar `sections` en `src/pages/Home.tsx` (cambiar `available: false` a `true`)
6. Ejecutar `npm run build` para verificar sin errores TypeScript
