# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal documentation site for learning Claude Code, written in Spanish. Built with React + TypeScript + Tailwind CSS v4 + ShadCN (Base UI). The original `claude_code_slash_commands.html` is kept as a historical reference but is no longer the active codebase.

## Development

```bash
npm run dev      # dev server at http://localhost:5173
npm run build    # tsc -b && vite build
npm run preview  # preview production build
```

## Architecture

```
src/
├── data/
│   └── slash-commands.ts     # All command data — single source of truth
├── pages/
│   ├── Home.tsx              # Landing page with section cards
│   └── SlashCommands.tsx     # Search + filter + expandable command cards
├── components/
│   ├── Layout.tsx            # Sidebar (desktop) + Sheet drawer (mobile) + Outlet
│   ├── Sidebar.tsx           # Nav links with NavLink active states
│   └── ui/                   # ShadCN components (card, badge, input, sheet, button)
├── lib/
│   └── utils.ts              # cn() utility from ShadCN
├── App.tsx                   # BrowserRouter + Routes
├── main.tsx                  # React root
├── index.css                 # Tailwind v4 imports + ShadCN CSS variables
└── vite-env.d.ts             # Vite client types (required for CSS imports)
components.json               # ShadCN configuration (style, base color, aliases)
```

**Stack:** Vite 6 · React 19 · TypeScript 5 · Tailwind CSS v4 · ShadCN/ui (Base UI) · React Router v7 · Lucide React

## Key Conventions

- Path alias `@/` maps to `src/` — always use it for imports across the project
- ShadCN uses **Base UI** (`@base-ui/react`) instead of Radix UI — no `asChild` prop; use `render={<Component />}` for composition
- All command data lives in `src/data/slash-commands.ts` — edit the `commands` array there for content changes
- New documentation sections: add a route in `App.tsx`, a nav item in `Sidebar.tsx`, a card in `Home.tsx`, and a new page in `src/pages/`

## Adding a New Documentation Section

1. Create `src/pages/NewSection.tsx`
2. Add route in `App.tsx`: `<Route path="new-section" element={<NewSection />} />`
3. Add nav item in `Sidebar.tsx` `navItems` array (remove `soon: true` when ready)
4. Update the section card in `Home.tsx` `sections` array (`available: true`)

## Adding or Editing Slash Commands

Edit the `commands` array in `src/data/slash-commands.ts`. Valid `cat`/`badge` values:

| cat value  | Badge label    |
|------------|----------------|
| `context`  | Contexto       |
| `dev`      | Desarrollo     |
| `config`   | Configuración  |
| `info`     | Info & Estado  |
| `integ`    | Integraciones  |
| `bundle`   | Bundle Skill   |

Each command requires: `name`, `cat`, `badge`, `badgeLabel`, `short`, `desc`, `usecaseTitle`, `usecase`, `example`.

## Dark Mode

Dark mode CSS variables are already defined in `index.css` under the `.dark` class (ShadCN default). To activate it, add `class="dark"` to the `<html>` element in `index.html`. A theme toggle component has not been implemented yet.
