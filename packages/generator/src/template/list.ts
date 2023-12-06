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
        <nav aria-label="Breadcrumb" className="my-2">
          <ol className="flex items-center gap-1 text-sm text-gray-600">
            <li>
              <Link href="/" className="block transition hover:text-indigo-600">
                Dashboard
              </Link>
            </li>
            <li>
            <ChevronRightIcon className="w-5 h-5" />
            </li>
            <li>
              ${capitalize(modelName)}s
            </li>
          </ol>
        </nav>

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
      </>
    )
  }
  
  const PlusIcon = ({ className }: { className: string }) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z" clipRule="evenodd" />
      </svg>

    )
  }

  const ChevronRightIcon = ({ className }: { className: string }) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
      </svg>
    )
  }
  `
}
