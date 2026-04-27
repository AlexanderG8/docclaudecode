export type HookEvent = 'pre-tool' | 'post-tool' | 'session' | 'permission'
export type ConfigScope = 'interactive' | 'project' | 'global'

export interface HookEventItem {
  id: HookEvent
  title: string
  when: string
  usecase: string
  example: string
}

export interface ConfigMethod {
  id: ConfigScope
  title: string
  desc: string
  example: string
}

export interface TroubleshootingItem {
  problem: string
  solution: string
  code?: string
}

export const hookEvents: HookEventItem[] = [
  {
    id: 'pre-tool',
    title: 'PreToolUse',
    when: 'Antes de que Claude use una herramienta (Edit, Bash, etc.)',
    usecase: 'Validaciones, checks de pre-condición, backups antes de editar archivos críticos.',
    example:
      '{\n  "PreToolUse": [\n    {\n      "matcher": "Edit(*.sql)",\n      "hooks": [{\n        "type": "command",\n        "command": "echo \'Editando SQL, verifica los cambios\'"\n      }]\n    }\n  ]\n}',
  },
  {
    id: 'post-tool',
    title: 'PostToolUse',
    when: 'Después de que Claude usa una herramienta exitosamente',
    usecase:
      'Formateo automático, linting, compilación. El hook más usado para mantener calidad de código.',
    example:
      '{\n  "PostToolUse": [\n    {\n      "matcher": "Edit(*.ts)",\n      "hooks": [{\n        "type": "command",\n        "command": "npx prettier --write {file}"\n      }]\n    }\n  ]\n}',
  },
  {
    id: 'session',
    title: 'SessionStart',
    when: 'Al iniciar una nueva sesión de Claude Code',
    usecase:
      'Setup inicial del ambiente, carga de variables, notificaciones de inicio, restauración de dependencias.',
    example:
      '{\n  "SessionStart": [\n    {\n      "hooks": [{\n        "type": "command",\n        "command": "echo \'Sesión iniciada en $(pwd)\'"\n      }]\n    }\n  ]\n}',
  },
  {
    id: 'permission',
    title: 'PermissionRequest',
    when: 'Cuando Claude necesita aprobación para ejecutar una acción',
    usecase:
      'Auto-aprobar comandos específicos seguros, logging de permisos solicitados, notificaciones.',
    example:
      '{\n  "PermissionRequest": [\n    {\n      "matcher": "Bash(npm install*)",\n      "hooks": [{\n        "type": "command",\n        "command": "echo \'Auto-aprobando npm install\'"\n      }]\n    }\n  ]\n}',
  },
]

export const configMethods: ConfigMethod[] = [
  {
    id: 'interactive',
    title: 'Comando /hooks',
    desc: 'Abre un menú interactivo donde puedes agregar, editar y remover hooks visualmente. Recomendado para empezar.',
    example: '/hooks',
  },
  {
    id: 'project',
    title: 'Archivo de proyecto',
    desc: 'Edita `.claude/settings.json` en tu proyecto. Los hooks se comparten con el equipo al hacer commit del archivo.',
    example:
      '// .claude/settings.json\n{\n  "hooks": {\n    "PostToolUse": [\n      {\n        "matcher": "Edit(*.cs)",\n        "hooks": [{\n          "type": "command",\n          "command": "dotnet format {file}"\n        }]\n      }\n    ]\n  }\n}',
  },
  {
    id: 'global',
    title: 'Archivo global',
    desc: 'Edita `~/.claude/settings.json` para hooks que quieres aplicar en todos tus proyectos.',
    example:
      '// ~/.claude/settings.json\n{\n  "hooks": {\n    "SessionStart": [\n      {\n        "hooks": [{\n          "type": "command",\n          "command": "echo \'Claude Code listo\'"\n        }]\n      }\n    ]\n  }\n}',
  },
]

export const troubleshootingItems: TroubleshootingItem[] = [
  {
    problem: 'El hook no se ejecuta',
    solution:
      'Verifica que el matcher coincide con el archivo editado y que el comando existe en tu PATH (dotnet, npx, etc.). Ejecuta /config y verifica que hooks están habilitados.',
  },
  {
    problem: 'Script no tiene permisos de ejecución',
    solution: 'Dale permisos de ejecución a los scripts en .claude/scripts/',
    code: 'chmod +x .claude/scripts/*.sh',
  },
  {
    problem: 'Quiero deshabilitar un hook temporalmente',
    solution:
      'Edita .claude/settings.json y comenta o elimina el hook. No hay flag de disable por hook individual.',
  },
]
