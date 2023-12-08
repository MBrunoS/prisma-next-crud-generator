import { DMMF } from '@prisma/generator-helper'
import { IGNORED_FIELDS } from '../utils/ignoredFields'

export function mapFieldsToTableData(modelName: string, fields: DMMF.Field[]) {
  return fields
    .filter((field) => !IGNORED_FIELDS.includes(field.name))
    .reduce((result, field) => {
      if (field.relationName) return result

      if (field.type === 'Boolean') {
        return (
          result +
          `<td className="px-4 py-2 text-gray-700">
            {${modelName}.${field.name} ? 'Yes' : 'No'}
          </td>
          `
        )
      }

      if (field.type === 'DateTime') {
        return (
          result +
          `<td className="whitespace-nowrap px-4 py-2 text-gray-700">
            {new Date(${modelName}.${field.name}).toLocaleString()}
          </td>
          `
        )
      }

      return (
        result +
        `<td className="px-4 py-2 text-gray-700">
          {${modelName}.${field.name}}
        </td>
        `
      )
    }, '')
}
