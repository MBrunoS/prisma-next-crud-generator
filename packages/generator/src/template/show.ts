import { DMMF } from '@prisma/generator-helper'
import { mapFieldsToShowData } from '../helpers/mapFieldsToShowData'
import { pluralize } from '../utils/strings'

export const show = (modelName: string, fields: DMMF.Field[]) => {
  const modelNameLower = modelName.toLowerCase()
  const modelNameLowerPlural = pluralize(modelNameLower)
  const fieldsList = mapFieldsToShowData(modelNameLower, fields)

  return `
  import Link from 'next/link';
  import { prisma } from '@/lib/prisma';
  import { Heading } from '@/components/ui/Heading';

  export default async function ${modelName}Page({ params }: { params: { id: string } }) {
    const ${modelNameLower} = await prisma.${modelNameLower}.findUnique({
      where: { id: params.id }
    });
    
    if (!${modelNameLower}) {
      return (
        <>
          <header>
            <Heading>${modelName} not found</Heading>
          </header>
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

    return (
      <>
        <header className="mt-2 mb-4">
          <Heading>${modelName} #{${modelNameLower}.id.substring(0,6)}...</Heading>
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
