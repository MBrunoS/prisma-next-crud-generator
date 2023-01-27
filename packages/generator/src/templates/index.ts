import { DMMF } from '@prisma/generator-helper';
import { dashboard } from './views/dashboard';
import { list } from './views/list';
import { show } from './views/show';
import { create } from './views/create';
import { edit } from './views/edit';
import { simpleRoutes, dynamicRoutes } from './api/routes';
import { lib } from './api/lib';
import { css } from './globalStyles';
import { _app } from './_app';
import { writeFileSafely } from '../utils/writeFileSafely';
import path from 'path';

export async function generatePagesForModels(
  models: DMMF.Model[],
  output: string,
) {
  const dashboardFile = dashboard(models.map((model) => model.name));
  const pagesPath = path.join(output, 'pages');

  await Promise.all([
    writeFileSafely(path.join(pagesPath, 'index.tsx'), dashboardFile),
    writeFileSafely(path.join(output, 'lib', 'prisma.ts'), lib),
    writeFileSafely(path.join(pagesPath, '_app.tsx'), _app),
    writeFileSafely(path.join(pagesPath, 'global.css'), css, 'css'),
  ]);

  for (const model of models) {
    const modelNameLower = model.name.toLowerCase();

    const simpleRoutesFile = simpleRoutes(model.name);
    const dynamicRoutesFile = dynamicRoutes(model.name);
    const indexFile = list(model);
    const showFile = show(model.name, model.fields);
    const createFile = create(model.name, model.fields);
    const editFile = edit(model.name, model.fields);

    await Promise.all([
      writeFileSafely(
        path.join(pagesPath, 'api', `${modelNameLower}s`, 'index.tsx'),
        simpleRoutesFile,
      ),
      writeFileSafely(
        path.join(pagesPath, 'api', `${modelNameLower}s`, '[id].tsx'),
        dynamicRoutesFile,
      ),
      writeFileSafely(
        path.join(pagesPath, `${modelNameLower}s`, 'index.tsx'),
        indexFile,
      ),
      writeFileSafely(
        path.join(pagesPath, `${modelNameLower}s`, 'create.tsx'),
        createFile,
      ),
      writeFileSafely(
        path.join(pagesPath, `${modelNameLower}s`, '[id]', 'index.tsx'),
        showFile,
      ),
      writeFileSafely(
        path.join(pagesPath, `${modelNameLower}s`, '[id]', 'edit.tsx'),
        editFile,
      ),
    ]);
  }
}
