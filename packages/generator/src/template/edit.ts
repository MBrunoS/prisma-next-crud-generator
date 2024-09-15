import { DMMF, ReadonlyDeep } from '@prisma/generator-helper'
import { mapFieldsToFormInputs } from '../helpers/mapFieldsToFormInputs'
import { renderModelNotFound } from '../utils/renderModelNotFound'
import {
  pascalCaseToSpaces,
  pascalToCamelCase,
  pascalToSnakeCase,
  pluralize,
  singularize,
} from '../utils/strings'

export const edit = (modelName: string, fields: ReadonlyDeep<DMMF.Field[]>) => {
  const modelNameCamelCase = pascalToCamelCase(modelName)
  const fieldsInput = mapFieldsToFormInputs(fields, modelNameCamelCase, true)
  const idField = fields.find((field) => field.isId)
  const isIdNumber = idField?.type === 'Int' || idField?.type === 'BigInt'

  const hasRelations = fields.some((field) => field.kind === 'object')
  const relations = fields
    .filter((field) => field.kind === 'object')
    .map((field) => ({ name: field.name, type: field.type }))

  const relationsNames = relations.map((relation) => relation.name)

  const relationsQueries = generateRelationsQueries(relations)

  return editPageTemplate(
    modelName,
    fieldsInput,
    isIdNumber,
    hasRelations,
    relationsNames,
    relationsQueries,
  )
}

function generateRelationsQueries(relations: { name: string; type: string }[]) {
  return relations.reduce(
    (result, relation) =>
      result +
      `
    
      const ${pluralize(relation.name)} = await prisma.${singularize(
        pascalToCamelCase(relation.type),
      )}.findMany();
  `,
    '',
  )
}

function editPageTemplate(
  modelName: string,
  fieldsInput: string,
  isIdNumber: boolean,
  hasRelations: boolean,
  relationsNames: string[],
  relationsQueries: string,
) {
  const modelNameSpacedPlural = pluralize(pascalCaseToSpaces(modelName))
  const modelNameCamelCase = pascalToCamelCase(modelName)
  const modelNameSnakeCase = pascalToSnakeCase(modelName)
  const modelNameSnakeCasePlural = pluralize(modelNameSnakeCase)

  return `
  import Link from 'next/link';
  import { prisma } from '@/lib/prisma';
  import { edit${modelName} } from '@/actions/${modelNameSnakeCase}';
  import { Input } from '@/components/ui/Input';
  import { Heading } from '@/components/ui/Heading';
  import { Button } from '@/components/ui/Button';
  ${hasRelations ? `import { Select } from '@/components/ui/Select';` : ''}

  export default async function ${modelName}EditPage({ params }: { params: { id: string } }) {
    const ${modelNameCamelCase} = await prisma.${modelNameCamelCase}.findUnique({
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
    
    if (!${modelNameCamelCase}) {
      return (${renderModelNotFound(modelName)})
    }

    return (
      <>
        <header className="mb-4">
          <Heading>Edit ${modelName}</Heading>
        </header>
        <form action={edit${modelName}} className="px-2 max-w-xl">
          ${fieldsInput}

          <input type="hidden" name="id" value={${modelNameCamelCase}.id} />

          <footer className="flex items-center justify-between mt-2">
            <Link
              href="/${modelNameSnakeCasePlural}"
              className="underline text-gray-500"
            >
              Return to ${modelNameSpacedPlural} list
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
