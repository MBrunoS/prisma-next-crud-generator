import { DMMF } from '@prisma/generator-helper'
import { capitalize } from '../utils/capitalize'

export const list = ({ name: modelName, fields }: DMMF.Model) => {
  const modelNameLower = modelName.toLowerCase()
  const idType =
    fields.find((field) => field.isId)?.type === 'Int' ? 'number' : 'string'

  const tableTitles = fields.reduce((result, field) => {
    if (field.isId || field.relationName) return result

    return (
      result +
      `<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        ${capitalize(field.name)}
      </th>`
    )
  }, '')

  const tableData = fields.reduce((result, field) => {
    if (field.isId || field.relationName) return result

    return (
      result +
      `<td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {${modelNameLower}.${field.name}}
      </td>
      `
    )
  }, '')

  return `
  import { revalidatePath } from 'next/cache'
  import Link from 'next/link'
  import { prisma } from '@/lib/prisma';
  import { Heading } from '@/components/Heading';

  export default async function ${modelName}Index() {
    const ${modelNameLower}s = await prisma.${modelNameLower}.findMany();

    const handleDelete = async (id: ${idType}) => {
      try {
        await prisma.${modelNameLower}.delete({
          where: { id }
        });
      } catch (error) {
        return { message: error };
      }

      revalidatePath(\`/${modelNameLower}s\`)
    }

    return (
      <>
        <header className="flex justify-between mb-4">
          <Heading>All ${modelName}s</Heading>
          <Link
            href="/${modelNameLower}s/create"
            className="inline-flex items-center rounded border border-indigo-600 bg-indigo-600 px-10 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
          >
           <PlusIcon className="w-4 h-4 inline-block mr-1" />
           Create new ${modelNameLower}
          </Link>
        </header>

        <section className="overflow-x-auto flex-grow">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="text-left">
              <tr>
                ${tableTitles}
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {${modelNameLower}s.map((${modelNameLower}) => (
                <tr key={${modelNameLower}.id}>
                  ${tableData}
                  <td className="inline-flex gap-x-1 px-4 py-2">
                    <Link
                      href={\`${modelNameLower}s/\${${modelNameLower}.id}\`}
                      className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                    >
                      Show
                    </Link>
                    <Link
                      href={\`${modelNameLower}s/\${${modelNameLower}.id}/edit\`}
                      className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                    >
                      Edit
                    </Link>
                    <form
                      action={async () => {
                        'use server';
                        handleDelete(${modelNameLower}.id)
                      }}
                      className="inline-block"
                    >
                      <button
                        type="submit"
                        className="inline-block rounded bg-red-500 px-4 py-2 text-xs font-medium text-white hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <footer className="flex justify-center">
          <Link href="/" className="hover:text-indigo-600 inline-flex items-center">
            <ArrowLeftIcon className="w-4 h-4 inline-block mr-2" />
            Return to Dashboard
          </Link>
        </footer>
      </>
    )
  }

  const ArrowLeftIcon = ({ className }: { className: string }) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M7.28 7.72a.75.75 0 010 1.06l-2.47 2.47H21a.75.75 0 010 1.5H4.81l2.47 2.47a.75.75 0 11-1.06 1.06l-3.75-3.75a.75.75 0 010-1.06l3.75-3.75a.75.75 0 011.06 0z" clipRule="evenodd" />
      </svg>
    )
  }
  
  const PlusIcon = ({ className }: { className: string }) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z" clipRule="evenodd" />
      </svg>

    )
  }
  `
}
