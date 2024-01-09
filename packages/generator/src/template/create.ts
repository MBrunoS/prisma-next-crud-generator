import { DMMF } from '@prisma/generator-helper'
import { mapFieldsToFormInputs } from '../helpers/mapFieldsToFormInputs'
import { pluralize, singularize } from '../utils/strings'

export const create = (modelName: string, fields: DMMF.Field[]) => {
  const modelNameLower = modelName.toLowerCase()
  const modelNameLowerPlural = pluralize(modelNameLower)
  const fieldsInput = mapFieldsToFormInputs(fields)

  const relationsNames = fields
    .filter((field) => field.kind === 'object')
    .map((field) => field.name)

  const relationsQueries = generateRelationsQueries(relationsNames)

  return createPageTemplate(
    modelName,
    modelNameLower,
    modelNameLowerPlural,
    fieldsInput,
    relationsQueries,
  )
}

function generateRelationsQueries(relationsNames: string[]) {
  return relationsNames.reduce(
    (result, relationName) =>
      result +
      `
    const ${pluralize(relationName)} = await prisma.${singularize(
      relationName,
    )}.findMany();
  `,
    '',
  )
}

function createPageTemplate(
  modelName: string,
  modelNameLower: string,
  modelNameLowerPlural: string,
  fieldsInput: string,
  relationsQueries: string,
) {
  return `
  import Link from 'next/link';
  import { prisma } from '@/lib/prisma';
  import { create${modelName} } from '@/actions/${modelNameLower}';
  import { Input } from '@/components/ui/Input';
  import { Heading } from '@/components/ui/Heading';
  import { Button } from '@/components/ui/Button';
  
  export default async function ${modelName}CreatePage() {
    ${relationsQueries}
    return (
      <>
        <header className="mb-4">
          <Heading>Create ${modelName}</Heading>
        </header>
        <form action={create${modelName}} className="px-2 max-w-xl">
          ${fieldsInput}

          <footer className="flex items-center justify-between mt-2">
            <Link
              href="/${modelNameLowerPlural}"
              className="underline text-gray-500"
            >
              Return to ${modelNameLowerPlural} list
            </Link>
  
            <Button
              type="submit"
            >
              Create
            </Button>
          </footer>
        </form>
      </>
    )
  }
  `
}
