import path from 'path'
import { DMMF } from '@prisma/generator-helper'
import { layout } from '../template/layout'
import { dashboard } from '../template/dashboard'
import { list } from '../template/list'
import { show } from '../template/show'
import { create } from '../template/create'
import { edit } from '../template/edit'
import { lib } from '../template/lib'
import { writeFileSafely } from '../utils/writeFileSafely'
import { sidebar } from '../template/components/sidebar'
import { textInput } from '../template/components/ui/text-input'
import { heading } from '../template/components/ui/heading'
import { button } from '../template/components/ui/button'
import { breadcrumbs } from '../template/components/ui/breadcrumbs'

export async function genPagesForModels(models: DMMF.Model[], output: string) {
  const appPath = path.join(output, 'app')
  const componentsPath = path.join(output, 'components')
  const sidebarFile = sidebar(models.map((model) => model.name))

  await Promise.all([
    writeFileSafely(path.join(output, 'lib', 'prisma.ts'), lib),
    writeFileSafely(path.join(appPath, 'layout.tsx'), layout),
    writeFileSafely(path.join(appPath, 'dashboard', 'page.tsx'), dashboard),
    writeFileSafely(path.join(componentsPath, 'Sidebar.tsx'), sidebarFile),
    writeFileSafely(
      path.join(componentsPath, 'ui', 'TextInput.tsx'),
      textInput,
    ),
    writeFileSafely(path.join(componentsPath, 'ui', 'Heading.tsx'), heading),
    writeFileSafely(path.join(componentsPath, 'ui', 'Button.tsx'), button),
    writeFileSafely(
      path.join(componentsPath, 'ui', 'Breadcrumbs.tsx'),
      breadcrumbs,
    ),
  ])

  for (const model of models) {
    const modelNameLower = model.name.toLowerCase()

    const indexFile = list(model)
    const showFile = show(model.name, model.fields)
    const createFile = create(model.name, model.fields)
    const editFile = edit(model.name, model.fields)

    await Promise.all([
      writeFileSafely(
        path.join(appPath, `${modelNameLower}s`, 'page.tsx'),
        indexFile,
      ),
      writeFileSafely(
        path.join(appPath, `${modelNameLower}s`, 'create', 'page.tsx'),
        createFile,
      ),
      writeFileSafely(
        path.join(appPath, `${modelNameLower}s`, '[id]', 'page.tsx'),
        showFile,
      ),
      writeFileSafely(
        path.join(appPath, `${modelNameLower}s`, '[id]', 'edit', 'page.tsx'),
        editFile,
      ),
    ])
  }
}
