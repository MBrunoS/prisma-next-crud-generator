import { DMMF } from '@prisma/generator-helper'
import { capitalize } from '../utils/capitalize'

export function mapFieldsToShowData(modelName: string, fields: DMMF.Field[]) {
  return fields.reduce((result, field) => {
    if (field.isId || field.relationName) return result

    if (field.type === 'DateTime') {
      return (
        result +
        `<p className="text-gray-700 mb-4 last:mb-0"><strong className="text-gray-900">${capitalize(
          field.name,
        )}:</strong> {new Date(${modelName}.${
          field.name
        }).toLocaleString()}</p>`
      )
    }

    return (
      result +
      `<p className="text-gray-700 mb-4 last:mb-0"><strong className="text-gray-900">${capitalize(
        field.name,
      )}:</strong> {${modelName}.${field.name}}</p>`
    )
  }, '')
}
