import { DMMF } from '@prisma/generator-helper';
import { dashboard } from './views/dashboard';
import { list } from './views/list';
import { show } from './views/show';
import { create } from './views/create';
import { simpleRoutes, dynamicRoutes } from './api/routes';
import { lib } from './api/lib';
import { writeFileSafely } from '../utils/writeFileSafely';

export async function generatePagesForModels(models: DMMF.Model[]) {
  const dashboardFile = dashboard(models.map((model) => model.name));

  await Promise.all([
    writeFileSafely(`./pages/index.tsx`, dashboardFile),
    writeFileSafely(`./lib/prisma.ts`, lib),
  ]);

  for (const model of models) {
    const modelNameLower = model.name.toLowerCase();

    const simpleRoutesFile = simpleRoutes(model.name);
    const dynamicRoutesFile = dynamicRoutes(model.name);
    const indexFile = list(model);
    const showFile = show(model.name, model.fields);
    const createFile = create(model.name, model.fields);

    await Promise.all([
      writeFileSafely(
        `./pages/api/${modelNameLower}s/index.tsx`,
        simpleRoutesFile,
      ),
      writeFileSafely(
        `./pages/api/${modelNameLower}s/[id].tsx`,
        dynamicRoutesFile,
      ),

      writeFileSafely(`./pages/${modelNameLower}s/index.tsx`, indexFile),
      writeFileSafely(`./pages/${modelNameLower}s/create.tsx`, createFile),
      writeFileSafely(`./pages/${modelNameLower}s/[id]/index.tsx`, showFile),
    ]);
  }
}
