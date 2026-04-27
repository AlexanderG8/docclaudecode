---
name: sync-notion
description: Fetch content from a Notion page and update the corresponding data file in src/data/. Use when Notion content has been updated and needs to sync to the web.
---

# Sincronizar Contenido desde Notion

## Pasos

1. Consultar `planification/notion-content-map.md` para obtener el Notion Page ID de la seccion a sincronizar.

2. Usar `mcp__notion__notion-fetch` con el ID de la pagina:
   ```
   id: "{notion-page-id}"
   ```

3. Analizar el contenido retornado y mapearlo a la interface TypeScript del archivo `src/data/{seccion}.ts` correspondiente.

4. Actualizar el archivo de datos respetando:
   - La estructura de interfaces existente (no modificarlas)
   - Todos los campos requeridos por las interfaces
   - El texto en espanol
   - Los valores validos para los tipos union (`cat`, `badge`, etc.)

5. Ejecutar `npm run build` para verificar que el archivo de datos es valido TypeScript.

## Mapeo de IDs de Notion

| Seccion | Notion Page ID |
|---------|---------------|
| Slash Commands | 344a0fd4-c63f-8087-80b7-fee982f78e1a |
| Hooks | 34ba0fd4-c63f-8074-9fbc-cf399cd42174 |
| MCP | 34ba0fd4-c63f-8049-8b08-e9afdecee442 |
| Skills | 34ba0fd4-c63f-8082-a290-c4f360010110 |
| Sub Agentes | 34da0fd4-c63f-8001-8bb3-caac8e9afc0a |
| Notas | 34ba0fd4-c63f-807f-85d9-fc1b8a957459 |

## Notas

- Las imagenes en Notion no se migran (no tienen equivalente en el formato web)
- Los toggle blocks se convierten en secciones o items expandibles
- Las tablas de Notion se convierten en arrays de objetos TypeScript
- Los code blocks se convierten en el campo `example` de cada item
