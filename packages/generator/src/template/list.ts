import { DMMF } from '@prisma/generator-helper'
import { mapFieldsToTableData } from '../helpers/mapFieldsToTableData'
import { mapFieldsToTableTitles } from '../helpers/mapFieldsToTableTitles'

export const list = ({ name: modelName, fields }: DMMF.Model) => {
  const modelNameLower = modelName.toLowerCase()
  const tableTitles = mapFieldsToTableTitles(fields)
  const tableData = mapFieldsToTableData(modelNameLower, fields)

  return `
  import { prisma } from '@/lib/prisma';
  import { delete${modelName} } from '@/actions/${modelNameLower}';
  import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
  import { Heading } from '@/components/ui/Heading';
  import { Button } from '@/components/ui/Button';

  export default async function ${modelName}sListPage() {
    const ${modelNameLower}s = await prisma.${modelNameLower}.findMany();

    const breadcrumbs = [
      { name: 'Dashboard', href: '/' },
      { name: '${modelName}s', href: '#' }
    ]

    return (
      <>
        <Breadcrumbs elements={breadcrumbs} className="my-2" />

        <header className="flex justify-between mb-4">
          <Heading>All ${modelName}s</Heading>
          <Button
            as="a"
            href="/${modelNameLower}s/create"
            className="font-medium"
          >
           New ${modelNameLower}
          </Button>
        </header>

        <section className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="text-left">
              <tr>
                ${tableTitles}
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {${modelNameLower}s.length === 0 && (
                <tr>
                  <td colSpan={${fields.length}} className="text-center text-gray-500 py-4">
                    No ${modelNameLower}s found
                  </td>
                </tr>
              )}

              {${modelNameLower}s.map((${modelNameLower}) => (
                <tr key={${modelNameLower}.id}>
                  ${tableData}
                  <td className="inline-flex gap-x-1 px-4 py-2">
                      <Button
                        as="a"
                        href={\`/${modelNameLower}s/\${${modelNameLower}.id}\`}
                        variant="ghost"
                        size="sm"
                        className="font-medium"
                      >
                        Show
                      </Button>
                      <Button
                        as="a"
                        href={\`/${modelNameLower}s/\${${modelNameLower}.id}/edit\`}
                        variant="ghost"
                        size="sm"
                        className="font-medium"
                      >
                        Edit
                      </Button>
                      <form action={delete${modelName}} className="inline-block">
                        <input type="hidden" name="id" value={${modelNameLower}.id} />
                        <Button
                          type="submit"
                          variant="ghost"
                          size="sm"
                          className="font-medium text-red-600 hover:bg-red-100 disabled:bg-red-100"
                        >
                          Delete
                        </Button>
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
  `
}
