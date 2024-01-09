import { DMMF } from '@prisma/generator-helper'
import { mapFieldsToShowData } from '../helpers/mapFieldsToShowData'
import { pluralize } from '../utils/strings'
import { renderModelNotFound } from '../helpers/common/renderModelNotFound'

export const show = (modelName: string, fields: DMMF.Field[]) => {
  const modelNameLower = modelName.toLowerCase()
  const modelNameLowerPlural = pluralize(modelNameLower)
  const fieldsList = mapFieldsToShowData(modelNameLower, fields)
  const idField = fields.find((field) => field.name === 'id')
  const isIdNumber = idField?.type === 'Int' || idField?.type === 'BigInt'

  return `
  import Link from 'next/link';
  import { prisma } from '@/lib/prisma';
  import { Heading } from '@/components/ui/Heading';

  export default async function ${modelName}Page({ params }: { params: { id: string } }) {
    const ${modelNameLower} = await prisma.${modelNameLower}.findUnique({
      where: { id: ${isIdNumber ? 'Number(params.id)' : 'params.id'} }
    });
    
    if (!${modelNameLower}) {
      return (${renderModelNotFound(modelNameLower, modelNameLowerPlural)})
    }

    return (
      <>
        <header className="mt-2 mb-4">
          <Heading>${modelName} #${
            isIdNumber
              ? `{${modelNameLower}.id}`
              : `{${modelNameLower}.id.substring(0,6)}...`
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
            href="/${modelNameLowerPlural}"
            className="underline text-gray-500"
          >
            Return to ${modelNameLowerPlural} list
          </Link>
        </footer>
      </>
    )
  }
  `
}
