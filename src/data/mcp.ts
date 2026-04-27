export interface McpPrimitive {
  id: string
  title: string
  control: string
  desc: string
  examples: string[]
  when: string
}

export interface McpServer {
  name: string
  package: string
  use: string
}

export interface McpUseCase {
  id: string
  title: string
  prompt: string
  steps: string[]
}

export interface McpSecurityTip {
  title: string
  desc: string
  code?: string
}

export interface McpTroubleshoot {
  problem: string
  solution: string
  code?: string
}

export interface McpFaq {
  question: string
  answer: string
}

export const mcpPrimitives: McpPrimitive[] = [
  {
    id: 'tools',
    title: 'Tools',
    control: 'Controladas por el modelo',
    desc: 'Acciones que Claude decide cuándo ejecutar de forma autónoma.',
    examples: [
      'execute_query(sql) — ejecuta un SELECT en tu BD',
      'create_issue(title, body) — crea un issue en GitHub',
      'send_email(to, subject, body) — envía un email',
    ],
    when: 'Para acciones que Claude debe poder ejecutar de forma autónoma.',
  },
  {
    id: 'resources',
    title: 'Resources',
    control: 'Controlados por la app',
    desc: 'Datos que la aplicación o usuario decide exponer como contexto de solo lectura.',
    examples: [
      'file://README.md — contenido del README',
      'db://schema/Users — schema de la tabla Users',
      'config://appsettings.json — configuración del proyecto',
    ],
    when: 'Para contexto estático que Claude necesita leer pero no modificar.',
  },
  {
    id: 'prompts',
    title: 'Prompts',
    control: 'Controlados por el usuario',
    desc: 'Templates de prompts que el servidor sugiere y el usuario activa para workflows comunes.',
    examples: [
      '"Review this PR for security issues"',
      '"Explain this SQL query in plain language"',
      '"Generate unit tests for this controller"',
    ],
    when: 'Para workflows comunes que quieres estandarizar en tu equipo.',
  },
]

export const mcpServers: McpServer[] = [
  {
    name: 'PostgreSQL',
    package: '@modelcontextprotocol/server-postgres',
    use: 'Queries, schemas, explain plans',
  },
  {
    name: 'GitHub',
    package: '@modelcontextprotocol/server-github',
    use: 'Repos, issues, PRs, commits',
  },
  {
    name: 'Google Drive',
    package: '@modelcontextprotocol/server-google-drive',
    use: 'Leer/escribir docs y sheets',
  },
  {
    name: 'Slack',
    package: '@modelcontextprotocol/server-slack',
    use: 'Enviar mensajes, leer canales',
  },
  {
    name: 'Filesystem',
    package: '@modelcontextprotocol/server-filesystem',
    use: 'Acceso seguro a archivos locales',
  },
  {
    name: 'Brave Search',
    package: '@modelcontextprotocol/server-brave-search',
    use: 'Búsquedas web en tiempo real',
  },
]

export const mcpUseCases: McpUseCase[] = [
  {
    id: 'debugging',
    title: 'Debugging en producción',
    prompt: 'Query the production database for all failed transactions in the last hour and create a GitHub issue with the details',
    steps: [
      'MCP SQL Server → ejecuta query de transacciones fallidas',
      'Claude analiza los resultados y detecta el patrón',
      'MCP GitHub → crea issue con contexto completo y código de error',
    ],
  },
  {
    id: 'documentation',
    title: 'Documentación automática',
    prompt: 'Document all the stored procedures in the database and save the documentation to Google Drive',
    steps: [
      'MCP SQL Server → lista y describe cada stored procedure',
      'Claude genera markdown con parámetros y ejemplos',
      'MCP Google Drive → sube el documento al directorio correcto',
    ],
  },
  {
    id: 'code-review',
    title: 'Code Review automático',
    prompt: 'Review the latest PR on GitHub and check if the SQL queries are optimized according to our database schema',
    steps: [
      'MCP GitHub → obtiene el diff del PR',
      'MCP SQL Server → obtiene schemas e índices relevantes',
      'Claude analiza queries en el código vs índices disponibles',
      'MCP GitHub → comenta directamente en el PR con sugerencias',
    ],
  },
]

export const securityTips: McpSecurityTip[] = [
  {
    title: 'Principio de mínimo privilegio',
    desc: 'Usa usuarios de BD con permisos de solo lectura para servidores MCP que no necesitan escribir.',
    code: `// mcp.json — usuario readonly
{
  "mcpServers": {
    "postgres-readonly": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-postgres",
               "postgresql://readonly_user:pass@localhost/db"]
    }
  }
}`,
  },
  {
    title: 'Nunca commitees credenciales',
    desc: 'Usa variables de entorno y referencialas en mcp.json.',
    code: `export GITHUB_TOKEN="ghp_token"
export SQL_PASSWORD="tu_password"

# En mcp.json:
{ "env": { "SQL_PASSWORD": "\${SQL_PASSWORD}" } }`,
  },
  {
    title: 'Valida inputs en servidores custom',
    desc: 'Rechaza operaciones no permitidas directamente en el servidor MCP.',
    code: `// Solo permite SELECT
if (!/^\\s*SELECT/i.test(query)) {
  throw new Error("Solo se permiten consultas SELECT");
}`,
  },
  {
    title: 'HTTPS para servidores remotos',
    desc: 'Si expones un MCP server en red, usa siempre HTTPS + autenticación. Nunca HTTP plano.',
  },
]

export const troubleshootItems: McpTroubleshoot[] = [
  {
    problem: 'El servidor MCP no se conecta',
    solution: 'Verifica que el comando existe en tu PATH y que el JSON de configuración es válido.',
    code: `npx @modelcontextprotocol/server-postgres --version
claude --debug
cat ~/.claude/mcp.json | jq`,
  },
  {
    problem: '"Tool not found" aunque el servidor está conectado',
    solution: 'Reinicia Claude Code y verifica que el servidor exporta las tools correctamente con una prueba manual.',
    code: `echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node tu-servidor.js`,
  },
  {
    problem: 'Errores de autenticación',
    solution: 'Verifica las variables de entorno y recarga la configuración con /mcp reload.',
    code: `echo $GITHUB_TOKEN
echo $SQL_PASSWORD
# En Claude: /mcp reload`,
  },
]

export const faqs: McpFaq[] = [
  {
    question: '¿Puedo usar MCP con otros LLMs además de Claude?',
    answer: 'Sí, MCP es un estándar abierto introducido por Anthropic en noviembre de 2024. OpenAI y Google DeepMind ya lo adoptaron.',
  },
  {
    question: '¿Los MCP servers consumen muchos tokens?',
    answer: 'No si están bien diseñados. Claude carga las tools on-demand, no todas al inicio de la sesión.',
  },
  {
    question: '¿Puedo crear un MCP server en C# para .NET?',
    answer: 'Sí, existe un SDK oficial: @modelcontextprotocol/sdk-csharp. También hay SDKs para Python, Go y otros lenguajes.',
  },
  {
    question: '¿Es seguro dar acceso a Claude a mi base de datos?',
    answer: 'Sí, si usas usuarios con permisos restringidos y validas los inputs en el servidor. El MCP server actúa como capa de seguridad entre Claude y tu BD.',
  },
]

export const notionInstallSteps = [
  'Instala el MCP de Notion con el comando oficial de Claude.',
  'Ingresa a Claude Code y ejecuta /mcp para ver los MCP integrados.',
  'Selecciona Notion y elige "Authenticate" para autenticar.',
  'Se abrirá un enlace en tu navegador — selecciona tu workspace y confirma.',
  'Claude Code mostrará un mensaje de autenticación completada.',
  'Ya puedes pedirle a Claude que lea y escriba en tu Notion.',
]

export const notionInstallCommand = `claude mcp add --transport http notion https://mcp.notion.com/mcp`

export const mcpConfigExample = `// ~/.claude/mcp.json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": [
        "@modelcontextprotocol/server-postgres",
        "postgresql://user:pass@localhost:5432/mibd"
      ]
    },
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_tu_token_aqui"
      }
    }
  }
}`
