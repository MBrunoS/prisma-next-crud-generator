import { DMMF } from '@prisma/generator-helper'
import { mapFieldsToFormData } from '../helpers/mapFieldsToFormData'
import { mapFieldsToFormInputs } from '../helpers/mapFieldsToFormInputs'

export const create = (modelName: string, fields: DMMF.Field[]) => {
  const modelNameLower = modelName.toLowerCase()
  const formDataFields = mapFieldsToFormData(fields)
  const fieldsInput = mapFieldsToFormInputs(fields)

  return `
  import { redirect } from "next/navigation";
  import Link from 'next/link';
  import { prisma } from '@/lib/prisma';
  import { Input } from '@/components/ui/Input';
  import { Heading } from '@/components/ui/Heading';
  import { Button } from '@/components/ui/Button';
  
  export default function ${modelName}CreatePage() {

    const handleSubmit = async (formData: FormData) => {
      'use server';

      const data = {
        ${formDataFields}
      }
      console.log(formData.get('published'), typeof formData.get('published'))
      
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
