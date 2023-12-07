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
        <TextInput
          label="${capitalize(field.name)}"
          name="${field.name}"
          className="mb-2"
          defaultValue={${modelNameLower}.${field.name}}
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

  export default async function ${modelName}EditPage({ params }: { params: { id: string } }) {
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
            <Link href="/users">
              Return to users list
            </Link>
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
        <header className="mb-4">
          <Heading>Edit ${modelName}</Heading>
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
              Update
            </Button>
          </footer>
        </form>
      </>
    )
  }
  `
}
