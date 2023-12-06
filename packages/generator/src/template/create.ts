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
        <TextInput
          label="${capitalize(field.name)}"
          name="${field.name}"
          className="mb-2"
          ${field.isRequired ? 'required' : ''}
        />
      </div>`
    )
  }, '')

  return `
  import { redirect } from "next/navigation";
  import Link from 'next/link';
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
        <header className="mb-4">
          <Heading>Create ${modelName}</Heading>
        </header>
        <form action={handleSubmit}>
          ${fieldsInput}

          <footer className="flex items-center justify-between mt-2">
            <Link
              href="/${modelNameLower}s"
              className="underline text-gray-500"
            >
              Return to ${modelNameLower}s list
            </Link>
  
            <button
              type="submit"
              className="inline-block rounded-lg bg-indigo-600 hover:bg-indigo-500 px-5 py-3 text-sm font-medium text-white"
            >
              Create
            </button>
          </footer>
        </form>
      </>
    )
  }
  `
}
