# Gestión de Github Issues

La acción escanea los issues de un repositorio especificado y actualiza su contenido y etiquetas basándose en una plantilla predefinida en la carpeta `ISSUE_TEMPLATE` del repositorio. Utilizamos Octokit para interactuar con la API de GitHub.

*Nota*: Esta acción se creó específicamente para el uso interno de la organización @caefisica.

## Características

- Identifica issues basados en un prefijo configurable.
- Actualiza el cuerpo y los labels del issue de acuerdo a la plantilla especificada.
- Evita el exceso de solicitudes añadiendo un retraso de 1000 milisegundos entre operaciones.

## Parámetros configurables

- `org`: Organización de GitHub.
- `repo`: Repositorio donde se ejecuta la acción.
- `branch`: Rama del repositorio donde se encuentra la plantilla.
- `templateName`: Nombre de la plantilla a utilizar.
- `issuePrefix`: Prefijo para identificar los issues que deben ser procesados.
- `gifURL`: URL de un GIF para ser añadido en comentarios.

## Uso

Añade el siguiente paso en tu `workflow` (ejemplo: .github/workflows/mi-flujo-de-trabajo.yml):

```yaml
name: Workflow de ejemplo

on:
  schedule:
    - cron: "\* \* 1 \* \*"

jobs:
  mi-trabajo:
    name: Administración de Issues
    runs-on: ubuntu-latest

    steps:
      - name: Administración de Issues
        uses: totallynotdavid/Issue-Manager-Action
        with:
          org: 'tu-organizacion'
          repo: 'tu-repositorio'
          branch: 'tu-rama'
          templateName: 'nombre-de-tu-plantilla'
          issuePrefix: 'tu-prefijo'
          gifURL: 'url-de-tu-gif'
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
