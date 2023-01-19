import { DMMF } from '@prisma/generator-helper';
import { writeFileSafely } from '../utils/writeFileSafely';
import { simpleRoutes, list, show, dynamicRoutes } from '../templates/';
import { lib } from '../templates/api/lib';

export async function generatePages(models: DMMF.Model[]) {
  for (const model of models) {
    const modelNameLower = model.name.toLowerCase();

    const simpleRoutesFile = simpleRoutes(model.name);
    const dynamicRoutesFile = dynamicRoutes(model.name);
    const indexFile = list(model.name);
    const showFile = show(model.name, model.fields);

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
      writeFileSafely(`./pages/${modelNameLower}s/[id]/index.tsx`, showFile),
    ]);
  }

  await writeFileSafely(`./lib/prisma.ts`, lib);
}
