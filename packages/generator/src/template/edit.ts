import { DMMF } from '@prisma/generator-helper'
import { mapFieldsToFormInputs } from '../helpers/mapFieldsToFormInputs'

export const edit = (modelName: string, fields: DMMF.Field[]) => {
  const modelNameLower = modelName.toLowerCase()
  const fieldsInput = mapFieldsToFormInputs(fields, modelNameLower)

  return `
  import Link from 'next/link';
  import { prisma } from '@/lib/prisma';
  import { edit${modelName} } from '@/actions/${modelNameLower}';
  import { Input } from '@/components/ui/Input';
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

    return (
      <>
        <header className="mb-4">
          <Heading>Edit ${modelName}</Heading>
        </header>
        <form action={edit${modelName}} className="px-2 max-w-xl">
          ${fieldsInput}

          <input type="hidden" name="id" value={${modelNameLower}.id} />

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
