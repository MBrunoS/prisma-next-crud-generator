import { DMMF } from '@prisma/generator-helper'
import { mapFieldsToFormData } from '../helpers/mapFieldsToFormData'
import { pluralize } from '../utils/strings'

export const actions = (modelName: string, fields: DMMF.Field[]) => {
  const modelNameLower = modelName.toLowerCase()
  const modelNameLowerPlural = pluralize(modelNameLower)
  const formDataFields = mapFieldsToFormData(fields)
  const idField = fields.find((field) => field.name === 'id')
  const isIdNumber = idField?.type === 'Int' || idField?.type === 'BigInt'

  return `
  'use server';
  import { redirect } from "next/navigation";
  import { revalidatePath } from "next/cache";
  import { prisma } from "@/lib/prisma";

  export async function create${modelName}(formData: FormData) {
    const data = {
      ${formDataFields}
    }
    
    const ${modelNameLower} = await prisma.${modelNameLower}.create({ data });

    if (${modelNameLower}) {
      redirect(\`/${modelNameLowerPlural}/\${${modelNameLower}.id}\`)
    }
  }

  export async function edit${modelName}(formData: FormData) {
    const id = formData.get('id') as string
    try {
      const data = {
        ${formDataFields}
      }

      await prisma.${modelNameLower}.update({
        where: { ${isIdNumber ? 'id: Number(id)' : 'id'} },
        data,
      })
    } catch (error) {
      console.error('EDIT ACTION ERROR:', error)
      return { message: error }
    }

    redirect(\`/${modelNameLowerPlural}/\${id}\`)
  }

  export async function delete${modelName} (formData: FormData) {
    const id = formData.get('id') as string;
    try {
      await prisma.${modelNameLower}.delete({
        where: { ${isIdNumber ? 'id: Number(id)' : 'id'} },
      });
    } catch (error) {
      console.error('DELETE ACTION ERROR:', error);
      return { message: 'Unable to delete ${modelNameLower}' };
    }

    revalidatePath(\`/${modelNameLowerPlural}\`)
  }
  `
}
