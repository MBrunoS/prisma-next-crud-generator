import { DMMF } from '@prisma/generator-helper'
import { mapFieldsToFormData } from '../helpers/mapFieldsToFormData'
import {
  pascalToCamelCase,
  pascalToSnakeCase,
  pluralize,
} from '../utils/strings'

export const actions = (
  modelName: string,
  fields: DMMF.Field[],
  models: DMMF.Model[],
) => {
  const modelNameCamelCase = pascalToCamelCase(modelName)
  const modelNameSnakeCase = pascalToSnakeCase(modelName)
  const modelNameSnakeCasePlural = pluralize(modelNameSnakeCase)
  const formDataCreateFields = mapFieldsToFormData(fields, models)
  const formDataEditFields = mapFieldsToFormData(fields, models, true)
  const idField = fields.find((field) => field.name === 'id')
  const isIdNumber = idField?.type === 'Int' || idField?.type === 'BigInt'

  return `
  'use server';
  import { redirect } from "next/navigation";
  import { revalidatePath } from "next/cache";
  import { prisma } from "@/lib/prisma";

  export async function create${modelName}(formData: FormData) {
    const data = {
      ${formDataCreateFields}
    }
    
    const ${modelNameCamelCase} = await prisma.${modelNameCamelCase}.create({ data });

    if (${modelNameCamelCase}) {
      redirect(\`/${modelNameSnakeCasePlural}/\${${modelNameCamelCase}.id}\`)
    }
  }

  export async function edit${modelName}(formData: FormData) {
    const id = formData.get('id') as string
    try {
      const data = {
        ${formDataEditFields}
      }
      
      await prisma.${modelNameCamelCase}.update({
        where: { ${isIdNumber ? 'id: Number(id)' : 'id'} },
        data,
      })
    } catch (error) {
      console.error('[EDIT ACTION ERROR:', error)
      return { message: error }
    }

    redirect(\`/${modelNameSnakeCasePlural}/\${id}\`)
  }

  export async function delete${modelName} (formData: FormData) {
    const id = formData.get('id') as string;
    try {
      await prisma.${modelNameCamelCase}.delete({
        where: { ${isIdNumber ? 'id: Number(id)' : 'id'} },
      });
    } catch (error) {
      console.error('DELETE ACTION ERROR:', error);
      return { message: 'Unable to delete ${modelNameCamelCase}' };
    }

    revalidatePath(\`/${modelNameSnakeCasePlural}\`)
  }
  `
}
