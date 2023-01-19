import { generatorHandler, GeneratorOptions } from '@prisma/generator-helper';
import { GENERATOR_NAME } from './constants';
import { generatePages } from './helpers/generatePages';

const { version } = require('../package.json');

generatorHandler({
  onManifest() {
    return {
      version,
      defaultOutput: '../pages',
      prettyName: GENERATOR_NAME,
    };
  },
  onGenerate: async (options: GeneratorOptions) => {
    const { models } = options.dmmf.datamodel;

    generatePages(models);
  },
});
