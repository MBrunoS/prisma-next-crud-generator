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
  import { TextInput } from '@/components/ui/TextInput';
  import { Heading } from '@/components/ui/Heading';
  import { Button } from '@/components/ui/Button';
  
  export default function ${modelName}CreatePage() {

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
        <form action={handleSubmit} className="px-2 max-w-xl">
          ${fieldsInput}

          <footer className="flex items-center justify-between mt-2">
            <Link
              href="/${modelNameLower}s"
              className="underline text-gray-500"
            >
              Return to ${modelNameLower}s list
            </Link>
  
            <Button
              type="submit"
            >
              Create
            </Button>
          </footer>
        </form>
      </>
    )
  }
  `
}
