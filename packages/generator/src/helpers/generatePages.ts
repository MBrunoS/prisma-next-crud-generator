import { DMMF } from '@prisma/generator-helper';
import { writeFileSafely } from '../utils/writeFileSafely';
import { simpleRoutes, dynamicRoutes } from '../templates/';
import { prismaService } from '../templates/api/prismaService';

export async function generatePages(models: DMMF.Model[]) {
  for (const model of models) {
    const modelNameLower = model.name.toLowerCase();

    const simpleRoutesFile = simpleRoutes(model.name);
    const dynamicRoutesFile = dynamicRoutes(model.name);

    await Promise.all([
      writeFileSafely(
        `./pages/api/${modelNameLower}/index.tsx`,
        simpleRoutesFile,
      ),
      writeFileSafely(
        `./pages/api/${modelNameLower}/[id].tsx`,
        dynamicRoutesFile,
      ),
      writeFileSafely(`./lib/prisma.ts`, prismaService),
    ]);
  }
}
