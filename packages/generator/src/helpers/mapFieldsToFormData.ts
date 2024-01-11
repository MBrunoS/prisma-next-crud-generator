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
    .filter(
      (field) =>
        !isRelationScalar(field, fields) &&
        !IGNORED_FIELDS.includes(field.name),
    )
    .reduce((result, field) => {
      if (field.kind === 'object') {
        return (
          result +
          `${field.name}: formData.get('${field.name}') != '' ? { connect: { id: formData.get('${field.name}') as string } } : undefined,\n`
        )
      }

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

function isRelationScalar(field: DMMF.Field, fields: DMMF.Field[]) {
  return (
    field.kind === 'scalar' &&
    fields.some((f) => f.relationFromFields?.includes(field.name))
  )
}
