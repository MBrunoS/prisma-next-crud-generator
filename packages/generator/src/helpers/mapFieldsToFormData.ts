import { DMMF } from '@prisma/generator-helper'
import { IGNORED_FIELDS } from '../utils/ignoredFields'

const typeMap = {
  String: 'string',
  Int: 'number',
  BigInt: 'number',
  Float: 'number',
  Decimal: 'number',
}

export function mapFieldsToFormData(fields: DMMF.Field[]) {
  return fields
    .filter((field) => !IGNORED_FIELDS.includes(field.name))
    .reduce((result, field) => {
      if (field.relationName) return result

      if (field.type === 'Boolean') {
        return (
          result + `${field.name}: formData.get('${field.name}') === 'on',\n`
        )
      }

      if (field.type === 'DateTime') {
        return (
          result +
          `${field.name}: new Date(formData.get('${field.name}') as string).toISOString(),\n`
        )
      }

      const type = typeMap[field.type as keyof typeof typeMap]

      if (!type) return result

      return (
        result + `${field.name}: formData.get('${field.name}') as ${type},\n`
      )
    }, '')
}
