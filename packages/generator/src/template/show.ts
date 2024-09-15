import { DMMF, ReadonlyDeep } from '@prisma/generator-helper'
import { mapFieldsToShowData } from '../helpers/mapFieldsToShowData'
import {
  pascalCaseToSpaces,
  pascalToCamelCase,
  pascalToSnakeCase,
  pluralize,
} from '../utils/strings'
import { renderModelNotFound } from '../utils/renderModelNotFound'

export const show = (modelName: string, fields: ReadonlyDeep<DMMF.Field[]>) => {
  const modelNameSpaced = pascalCaseToSpaces(modelName)
  const modelNameSpacedPlural = pluralize(modelNameSpaced)
  const modelNameCamelCase = pascalToCamelCase(modelName)
  const modelNameSnakeCasePlural = pluralize(pascalToSnakeCase(modelName))
  const fieldsList = mapFieldsToShowData(modelNameCamelCase, fields)
  const idField = fields.find((field) => field.name === 'id')
  const isIdNumber = idField?.type === 'Int' || idField?.type === 'BigInt'

  return `
  import Link from 'next/link';
  import { prisma } from '@/lib/prisma';
  import { Heading } from '@/components/ui/Heading';

  export default async function ${modelName}Page({ params }: { params: { id: string } }) {
    const ${modelNameCamelCase} = await prisma.${modelNameCamelCase}.findUnique({
      where: { id: ${isIdNumber ? 'Number(params.id)' : 'params.id'} }
    });
    
    if (!${modelNameCamelCase}) {
      return (${renderModelNotFound(modelName)})
    }

    return (
      <>
        <header className="mt-2 mb-4">
          <Heading>${modelNameSpaced} #${
            isIdNumber
              ? `{${modelNameCamelCase}.id}`
              : `{${modelNameCamelCase}.id.substring(0,6)}...`
          }</Heading>
        </header>

        <section className="relative overflow-hidden rounded-lg border border-gray-200 p-4 sm:p-6 lg:p-8 max-w-xl mb-4">
          <span
            className="absolute inset-x-0 bottom-0 h-21 bg-gradient-to-r from-indigo-300 via-indigo-500 to-indigo-600"
          ></span>
          ${fieldsList}
        </section>

        <footer>
          <Link
            href="/${modelNameSnakeCasePlural}"
            className="underline text-gray-500"
          >
            Return to ${modelNameSpacedPlural} list
          </Link>
        </footer>
      </>
    )
  }
  `
}
