import { DMMF } from '@prisma/generator-helper'
import { mapFieldsToTableData } from '../helpers/mapFieldsToTableData'
import { mapFieldsToTableTitles } from '../helpers/mapFieldsToTableTitles'
import { pluralize } from '../utils/strings'

export const list = ({ name: modelName, fields }: DMMF.Model) => {
  const modelNameLower = modelName.toLowerCase()
  const modelNamePlural = pluralize(modelName)
  const modelNameLowerPlural = pluralize(modelNameLower)
  const tableTitles = mapFieldsToTableTitles(fields)
  const tableData = mapFieldsToTableData(modelNameLower, fields)

  return `
  import { prisma } from '@/lib/prisma';
  import { delete${modelName} } from '@/actions/${modelNameLower}';
  import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
  import { Heading } from '@/components/ui/Heading';
  import { Button } from '@/components/ui/Button';

  export default async function ${modelNamePlural}ListPage() {
    const ${modelNameLowerPlural} = await prisma.${modelNameLower}.findMany();

    const breadcrumbs = [
      { name: 'Dashboard', href: '/' },
      { name: '${modelNamePlural}', href: '#' }
    ]

    return (
      <>
        <Breadcrumbs elements={breadcrumbs} className="my-2" />

        <header className="flex justify-between mb-4">
          <Heading>All ${modelNamePlural}</Heading>
          <Button
            as="a"
            href="/${modelNameLowerPlural}/create"
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
              {${modelNameLowerPlural}.length === 0 && (
                <tr>
                  <td colSpan={${fields.length}} className="text-center text-gray-500 py-4">
                    No ${modelNameLowerPlural} found
                  </td>
                </tr>
              )}

              {${modelNameLowerPlural}.map((${modelNameLower}) => (
                <tr key={${modelNameLower}.id}>
                  ${tableData}
                  <td className="px-4 py-2">
                    <div className="flex gap-x-1 h-full justify-center">
                      <Button
                        as="a"
                        href={\`/${modelNameLowerPlural}/\${${modelNameLower}.id}\`}
                        variant="ghost"
                        size="sm"
                        className="font-medium"
                      >
                        Show
                      </Button>
                      <Button
                        as="a"
                        href={\`/${modelNameLowerPlural}/\${${modelNameLower}.id}/edit\`}
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
                    </div>
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
