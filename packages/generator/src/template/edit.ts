import { DMMF } from '@prisma/generator-helper'
import { capitalize } from '../utils/capitalize'

export const edit = (modelName: string, fields: DMMF.Field[]) => {
  const modelNameLower = modelName.toLowerCase()

  const formDataFields = fields.reduce((result, field) => {
    if (field.isId || field.relationName) return result

    return result + `${field.name}: formData.get('${field.name}') as string,\n`
  }, '')

  const fieldsInput = fields.reduce((result, field) => {
    if (field.isId || field.relationName) return result

    return (
      result +
      `<div>
        <label htmlFor="${field.name}">${capitalize(field.name)}:</label>
        <input
          type="text"
          id="${field.name}"
          name="${field.name}"
          defaultValue={${modelNameLower}.${field.name}}
        />
      </div>`
    )
  }, '')

  return `
  import { redirect } from "next/navigation";
  import { prisma } from '@/lib/prisma';

  export default async function ${modelName}Edit({ params }: { params: { id: string } }) {
    const ${modelNameLower} = await prisma.${modelNameLower}.findUnique({
      where: { id: params.id }
    });
    
    if (!user) {
      return (
        <>
          <header>
            <h1>User not found</h1>
          </header>
          <footer>
            <a href="/users">
              Return to users list
            </a>
          </footer>
        </>
      )
    }

    const handleSubmit = async (formData: FormData) => {
      'use server';
      
      try {
        const data = {
          ${formDataFields}
        }

        await prisma.${modelNameLower}.update({
          where: { id: ${modelNameLower}.id },
          data,
        })
      } catch (error) {
        return { message: error }
      }

      redirect(\`/${modelNameLower}s/\${${modelNameLower}.id}\`)
    }

    return (
      <>
        <header>
          <h1>Edit ${modelName}</h1>
        </header>
        <form action={handleSubmit}>
          ${fieldsInput}
          <footer>
            <button type="submit">Update</button>
            <a href="/${modelNameLower}s">Return to ${modelNameLower}s list</a>
          </footer>
        </form>
      </>
    )
  }
  `
}
