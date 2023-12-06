import { DMMF } from '@prisma/generator-helper'
import { capitalize } from '../utils/capitalize'

export const create = (modelName: string, fields: DMMF.Field[]) => {
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
        <TextInput label="${capitalize(field.name)}" name="${field.name}" />
      </div>`
    )
  }, '')

  return `
  import { redirect } from "next/navigation";
  import { prisma } from '@/lib/prisma';
  import { TextInput } from '@/components/TextInput';
  import { Heading } from '@/components/Heading';
  
  export default function ${modelName}Create() {

    const handleSubmit = async (formData: FormData) => {
      'use server';

      const data = {
        ${formDataFields}
      }
      
      const ${modelNameLower} = await prisma.${modelNameLower}.create({ data });

      if (${modelNameLower}) {
        redirect(\`/${modelNameLower}s/\${${modelNameLower}.id}\`)
      }
    }

    return (
      <>
        <header>
          <Heading>Create ${modelName}</Heading>
        </header>
        <form action={handleSubmit}>
          ${fieldsInput}
          <footer>
            <button type="submit">Create</button>
            <a href="/${modelNameLower}s">Return to ${modelNameLower}s list</a>
          </footer>
        </form>
      </>
    )
  }
  `
}