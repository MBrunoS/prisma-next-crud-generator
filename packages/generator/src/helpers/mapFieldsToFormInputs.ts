import { DMMF } from '@prisma/generator-helper'
import { IGNORED_FIELDS } from '../utils/ignoredFields'
import { generateRelationField } from './generateRelationField'
import { generateScalarField } from './generateScalarField'

interface FieldStrategy {
  shouldProcess(field: DMMF.Field, fields: DMMF.Field[]): boolean
  process(field: DMMF.Field, modelName?: string, isEditForm?: boolean): string
}

class ObjectFieldStrategy implements FieldStrategy {
  shouldProcess(field: DMMF.Field): boolean {
    return field.kind === 'object'
  }

  process(field: DMMF.Field, modelName?: string, isEditForm?: boolean): string {
    return generateRelationField(field, isEditForm, modelName)
  }
}

class ScalarFieldStrategy implements FieldStrategy {
  shouldProcess(field: DMMF.Field, fields: DMMF.Field[]): boolean {
    return (
      field.kind === 'scalar' &&
      !fields.some((f) => f.relationFromFields?.includes(field.name)) &&
      !IGNORED_FIELDS.includes(field.name)
    )
  }

  process(field: DMMF.Field, modelName?: string, isEditForm?: boolean): string {
    return generateScalarField(field, isEditForm, modelName)
  }
}

export function mapFieldsToFormInputs(
  fields: DMMF.Field[],
  modelName?: string,
  isEditForm?: boolean,
) {
  const strategies: FieldStrategy[] = [
    new ObjectFieldStrategy(),
    new ScalarFieldStrategy(),
  ]

  return fields.reduce((result, field) => {
    for (const strategy of strategies) {
      if (strategy.shouldProcess(field, fields)) {
        return result + strategy.process(field, modelName, isEditForm)
      }
    }

    return result
  }, '')
}
