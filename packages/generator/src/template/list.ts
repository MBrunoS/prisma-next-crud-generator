import { DMMF } from '@prisma/generator-helper'
import { capitalize } from '../utils/capitalize'

export const list = ({ name: modelName, fields }: DMMF.Model) => {
  const modelNameLower = modelName.toLowerCase()
  const idType =
    fields.find((field) => field.isId)?.type === 'Int' ? 'number' : 'string'

  const tableTitles = fields.reduce((result, field) => {
    if (field.isId || field.relationName) return result

    return result + `<div>${capitalize(field.name)}</div>`
  }, '')

  const tableData = fields.reduce((result, field) => {
    if (field.isId || field.relationName) return result

    return result + `<div>{${modelNameLower}.${field.name}}</div>`
  }, '')

  return `
  import { revalidatePath } from 'next/cache'
  import { prisma } from '@/lib/prisma';

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
        <header>
          <h1>All ${modelName}s</h1>
          <a href="/${modelNameLower}s/create">
            + Create new ${modelNameLower}
          </a>
        </header>
        <div>
          <div>
            ${tableTitles}
            <div>Actions</div>
          </div>
          {${modelNameLower}s.map((${modelNameLower}) => (
            <div key={${modelNameLower}.id}>
              ${tableData}
              <div>
                <div>
                  <a href={\`${modelNameLower}s/\${${modelNameLower}.id}\`}>
                    &#128065; Show
                  </a>
                  <a href={\`${modelNameLower}s/\${${modelNameLower}.id}/edit\`}>
                    &#9998; Edit
                  </a>
                  <form action={async () => {
                    'use server';
                    handleDelete(${modelNameLower}.id)
                  }}>
                    <button type="submit">
                      &#128465; Delete
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
        <footer>
          <a href="/">Return to Dashboard</a>
        </footer>
      </>
    )
  }
  `
}
