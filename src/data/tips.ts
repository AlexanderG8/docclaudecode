export type TipCategory = 'shortcut' | 'flag' | 'workflow'

export interface Tip {
  id: string
  cat: TipCategory
  badge: TipCategory
  badgeLabel: string
  title: string
  short: string
  desc: string
  keyCombo?: string
  command?: string
  example: string
}

export const tipCategories: { value: TipCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'shortcut', label: 'Atajos' },
  { value: 'flag', label: 'Flags' },
  { value: 'workflow', label: 'Flujo de trabajo' },
]

export const tips: Tip[] = [
  {
    id: 'background-tasks',
    cat: 'workflow',
    badge: 'workflow',
    badgeLabel: 'Flujo de trabajo',
    title: 'Tareas en segundo plano',
    short: 'Claude puede ejecutar múltiples tareas simultáneamente',
    desc: 'Claude Code ejecuta tareas en segundo plano mientras realiza otras. Esto se visualiza cuando aparece un mensaje indicando que hay procesos corriendo en paralelo. Es útil para tareas largas como builds o instalaciones.',
    example: '→ Claude inicia un build en segundo plano\n→ Mientras tanto, responde tus otras preguntas\n→ Notifica cuando la tarea en segundo plano termina',
  },
  {
    id: 'shift-tab',
    cat: 'shortcut',
    badge: 'shortcut',
    badgeLabel: 'Atajo',
    title: 'Modo plan con Shift + Tab',
    short: 'Activa el modo planificado o editor sin escribir comandos',
    desc: 'Presionando Shift + Tab puedes alternar entre los modos de Claude Code: modo normal, modo plan (donde Claude planifica antes de actuar) y modo auto-edición. Es la forma más rápida de cambiar el comportamiento de Claude sin escribir comandos.',
    keyCombo: 'Shift + Tab',
    example: '→ Presiona Shift + Tab para entrar al modo plan\n→ Claude ahora planificará cada acción antes de ejecutarla\n→ Presiona Shift + Tab nuevamente para cambiar de modo',
  },
  {
    id: 'ctrl-e',
    cat: 'shortcut',
    badge: 'shortcut',
    badgeLabel: 'Atajo',
    title: 'Explicación con Ctrl + E',
    short: 'Pide a Claude que explique lo que está a punto de hacer',
    desc: 'Antes de que Claude ejecute una acción o comando, presiona Ctrl + E para que te explique en detalle qué es lo que desea realizar y por qué. Ideal para entender mejor las acciones de Claude o cuando tienes dudas sobre lo que va a ejecutar.',
    keyCombo: 'Ctrl + E',
    example: '→ Claude propone ejecutar un comando\n→ Presiona Ctrl + E\n→ Claude explica el propósito y el impacto de ese comando',
  },
  {
    id: 'skip-permissions',
    cat: 'flag',
    badge: 'flag',
    badgeLabel: 'Flag',
    title: 'Saltar confirmaciones con --dangerously-skip-permissions',
    short: 'Ejecuta Claude sin pedir permisos para cada acción',
    desc: 'Iniciando Claude con el flag `--dangerously-skip-permissions` le das permisos totales para ejecutar todas las acciones sin pedirte confirmación en cada paso. Útil para proyectos personales donde confías en Claude, pero úsalo con cuidado en proyectos importantes.',
    command: 'claude --dangerously-skip-permissions',
    example: '$ claude --dangerously-skip-permissions\n→ Claude ejecuta acciones sin pedir confirmación\n→ Ideal para proyectos personales de bajo riesgo',
  },
  {
    id: 'context-tokens',
    cat: 'workflow',
    badge: 'workflow',
    badgeLabel: 'Flujo de trabajo',
    title: 'Ver uso de tokens con /context',
    short: 'Monitorea cuántos tokens estás consumiendo en la sesión',
    desc: 'El comando `/context` muestra el uso actual de tokens en la sesión: cuántos has usado, cuántos quedan disponibles y el porcentaje del contexto ocupado. Útil para saber si estás cerca del límite y si deberías usar `/clear` para liberar contexto.',
    command: '/context',
    example: '> /context\n→ Tokens usados: 45,230 / 200,000\n→ Contexto al 22% de capacidad',
  },
  {
    id: 'rewind-changes',
    cat: 'workflow',
    badge: 'workflow',
    badgeLabel: 'Flujo de trabajo',
    title: 'Revertir cambios con /rewind',
    short: 'Vuelve atrás en el historial de instrucciones de la sesión',
    desc: 'El comando `/rewind` muestra el historial de instrucciones de la sesión actual. Puedes seleccionar un punto anterior para revertir todos los cambios hechos desde entonces. Importante: al revertir, Claude Code limpia el historial por completo. Se recomienda usar git para un manejo de cambios más robusto.',
    command: '/rewind',
    example: '> /rewind\n→ Muestra el historial de instrucciones\n→ Selecciona el punto al que quieres volver\n→ Claude revierte los cambios y limpia el historial',
  },
]
