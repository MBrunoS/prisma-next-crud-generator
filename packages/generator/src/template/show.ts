import { DMMF } from '@prisma/generator-helper'
import { capitalize } from '../utils/capitalize'

export const show = (modelName: string, fields: DMMF.Field[]) => {
  const modelNameLower = modelName.toLowerCase()

  const fieldsList = fields.reduce((result, field) => {
    if (field.isId || field.relationName) return result

    return (
      result +
      `<p><strong>${capitalize(field.name)}:</strong> {${modelNameLower}.${
        field.name
      }}</p>`
    )
  }, '')

  return `
  import { prisma } from '@/lib/prisma';
  import { Heading } from '@/components/Heading';

  export default async function ${modelName}Show({ params }: { params: { id: string } }) {
    const ${modelNameLower} = await prisma.${modelNameLower}.findUnique({
      where: { id: params.id }
    });
    
    if (!user) {
      return (
        <>
          <header>
            <Heading>User not found</Heading>
          </header>
          <footer>
            <a href="/users">
              Return to users list
            </a>
          </footer>
        </>
      )
    }

    return (
      <>
        <header>
          <Heading>${modelName} #{${modelNameLower}.id.substring(0,6)}...</Heading>
        </header>
        <div >
          ${fieldsList}
        </div>
        <footer>
          <a href="/${modelNameLower}s">Return to ${modelNameLower}s list</a>
        </footer>
      </>
    )
  }
  `
}
