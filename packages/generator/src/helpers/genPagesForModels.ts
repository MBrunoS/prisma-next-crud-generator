import path from 'path'
import { DMMF, ReadonlyDeep } from '@prisma/generator-helper'
import { layout } from '../template/layout'
import { dashboard } from '../template/dashboard'
import { list } from '../template/list'
import { show } from '../template/show'
import { create } from '../template/create'
import { edit } from '../template/edit'
import { lib } from '../template/lib'
import { writeFileSafely } from '../utils/writeFileSafely'
import { sidebar } from '../template/components/sidebar'
import { input } from '../template/components/ui/input'
import { heading } from '../template/components/ui/heading'
import { button } from '../template/components/ui/button'
import { breadcrumbs } from '../template/components/ui/breadcrumbs'
import { select } from '../template/components/ui/select'
import { actions } from '../template/actions'
import { pascalToSnakeCase, pluralize } from '../utils/strings'

export async function genPagesForModels(models: ReadonlyDeep<DMMF.Model[]>, output: string) {
  const appPath = path.join(output, 'app')
  const componentsPath = path.join(output, 'components')
  const actionsPath = path.join(output, 'actions')
  const sidebarFile = sidebar(models.map((model) => model.name))

  await Promise.all([
    writeFileSafely(path.join(output, 'lib', 'prisma.ts'), lib),
    writeFileSafely(path.join(appPath, 'layout.tsx'), layout),
    writeFileSafely(path.join(appPath, 'page.tsx'), dashboard),
    writeFileSafely(path.join(componentsPath, 'Sidebar.tsx'), sidebarFile),
    writeFileSafely(path.join(componentsPath, 'ui', 'Input.tsx'), input),
    writeFileSafely(path.join(componentsPath, 'ui', 'Heading.tsx'), heading),
    writeFileSafely(path.join(componentsPath, 'ui', 'Button.tsx'), button),
    writeFileSafely(
      path.join(componentsPath, 'ui', 'Breadcrumbs.tsx'),
      breadcrumbs,
    ),
    writeFileSafely(path.join(componentsPath, 'ui', 'Select.tsx'), select),
  ])

  for (const model of models) {
    const modelNameSnakeCase = pascalToSnakeCase(model.name)
    const modelNameSnakeCasePlural = pluralize(modelNameSnakeCase)

    const indexFile = list(model)
    const showFile = show(model.name, model.fields)
    const createFile = create(model.name, model.fields)
    const editFile = edit(model.name, model.fields)
    const actionsFile = actions(model.name, model.fields, models)

    await Promise.all([
      writeFileSafely(
        path.join(appPath, `${modelNameSnakeCasePlural}`, 'page.tsx'),
        indexFile,
      ),
      writeFileSafely(
        path.join(appPath, `${modelNameSnakeCasePlural}`, 'create', 'page.tsx'),
        createFile,
      ),
      writeFileSafely(
        path.join(appPath, `${modelNameSnakeCasePlural}`, '[id]', 'page.tsx'),
        showFile,
      ),
      writeFileSafely(
        path.join(
          appPath,
          `${modelNameSnakeCasePlural}`,
          '[id]',
          'edit',
          'page.tsx',
        ),
        editFile,
      ),
      writeFileSafely(
        path.join(actionsPath, `${modelNameSnakeCase}.ts`),
        actionsFile,
      ),
    ])
  }
}
