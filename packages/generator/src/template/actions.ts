import { DMMF } from '@prisma/generator-helper'
import { mapFieldsToFormData } from '../helpers/mapFieldsToFormData'

export const actions = (modelName: string, fields: DMMF.Field[]) => {
  const modelNameLower = modelName.toLowerCase()
  const formDataFields = mapFieldsToFormData(fields)

  return `
  'use server';
  import { redirect } from "next/navigation";
  import { revalidatePath } from "next/cache";
  import { prisma } from "@/lib/prisma";

  export async function create${modelName}(formData: FormData) {
    const data = {
      ${formDataFields}
    }
    console.log(formData.get('published'), typeof formData.get('published'))
    
    const ${modelNameLower} = await prisma.${modelNameLower}.create({ data });

    if (${modelNameLower}) {
      redirect(\`/${modelNameLower}s/\${${modelNameLower}.id}\`)
    }
  }

  export async function edit${modelName}(formData: FormData) {
    const id = formData.get('id') as string
    try {
      const data = {
        ${formDataFields}
      }

      await prisma.${modelNameLower}.update({
        where: { id },
        data,
      })
    } catch (error) {
      console.error('EDIT ACTION ERROR:', error)
      return { message: error }
    }

    redirect(\`/${modelNameLower}s/\${id}\`)
  }

  export async function delete${modelName} (formData: FormData) {
    const id = formData.get('id') as string;
    try {
      await prisma.${modelNameLower}.delete({
        where: { id }
      });
    } catch (error) {
      console.error('DELETE ACTION ERROR:', error);
      return { message: 'Unable to delete ${modelNameLower}' };
    }

    revalidatePath(\`/${modelNameLower}s\`)
  }
  `
}
