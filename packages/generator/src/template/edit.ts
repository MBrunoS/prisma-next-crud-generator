import { DMMF } from '@prisma/generator-helper'
import { mapFieldsToFormInputs } from '../helpers/mapFieldsToFormInputs'
import { renderModelNotFound } from '../helpers/common/renderModelNotFound'
import { pluralize, singularize } from '../utils/strings'

export const edit = (modelName: string, fields: DMMF.Field[]) => {
  const modelNameLower = modelName.toLowerCase()
  const modelNameLowerPlural = pluralize(modelNameLower)
  const fieldsInput = mapFieldsToFormInputs(fields, modelNameLower, true)
  const idField = fields.find((field) => field.isId)
  const isIdNumber = idField?.type === 'Int' || idField?.type === 'BigInt'

  const hasRelations = fields.some((field) => field.kind === 'object')
  const relationsNames = fields
    .filter((field) => field.kind === 'object')
    .map((field) => field.name)

  const relationsQueries = generateRelationsQueries(relationsNames)

  return editPageTemplate(
    modelName,
    modelNameLower,
    modelNameLowerPlural,
    fieldsInput,
    isIdNumber,
    hasRelations,
    relationsNames,
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

function editPageTemplate(
  modelName: string,
  modelNameLower: string,
  modelNameLowerPlural: string,
  fieldsInput: string,
  isIdNumber: boolean,
  hasRelations: boolean,
  relationsNames: string[],
  relationsQueries: string,
) {
  return `
  import Link from 'next/link';
  import { prisma } from '@/lib/prisma';
  import { edit${modelName} } from '@/actions/${modelNameLower}';
  import { Input } from '@/components/ui/Input';
  import { Heading } from '@/components/ui/Heading';
  import { Button } from '@/components/ui/Button';

  export default async function ${modelName}EditPage({ params }: { params: { id: string } }) {
    const ${modelNameLower} = await prisma.${modelNameLower}.findUnique({
      where: { id: ${isIdNumber ? 'Number(params.id)' : 'params.id'} },
      ${
        hasRelations
          ? `include: {
        ${relationsNames.map((name) => name + ': true').join(',\n')}
      }
      `
          : ''
      }
    });

    ${hasRelations ? relationsQueries : ''}
    
    if (!${modelNameLower}) {
      return ${renderModelNotFound(modelName, modelNameLowerPlural)}
    }

    return (
      <>
        <header className="mb-4">
          <Heading>Edit ${modelName}</Heading>
        </header>
        <form action={edit${modelName}} className="px-2 max-w-xl">
          ${fieldsInput}

          <input type="hidden" name="id" value={${modelNameLower}.id} />

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
              Update
            </Button>
          </footer>
        </form>
      </>
    )
  }
  `
}
