import { DMMF } from '@prisma/generator-helper'
import { mapFieldsToFormInputs } from '../helpers/mapFieldsToFormInputs'
import { pluralize } from '../utils/strings'

export const edit = (modelName: string, fields: DMMF.Field[]) => {
  const modelNameLower = modelName.toLowerCase()
  const modelNameLowerPlural = pluralize(modelNameLower)
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
    
    if (!${modelNameLower}) {
      return (
        <>
          <header>
            <Heading>${modelName} not found</Heading>
          </header>
          <footer>
            <Link href="/${modelNameLowerPlural}">
              Return to ${modelNameLowerPlural} list
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
              href="/${modelNameLowerPlural}"
              className="underline text-gray-500"
            >
              Return to ${modelNameLowerPlural} list
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
