import { generatorHandler, GeneratorOptions } from '@prisma/generator-helper';
import { GENERATOR_NAME } from './constants';
import { generatePagesForModels } from './templates';

const { version } = require('../package.json');

generatorHandler({
  onManifest() {
    return {
      version,
      defaultOutput: '../',
      prettyName: GENERATOR_NAME,
    };
  },
  onGenerate: async (options: GeneratorOptions) => {
    const { models } = options.dmmf.datamodel;
    const outputFolder = options.generator.output?.value!;

    await generatePagesForModels(models, outputFolder);
  },
});
