import { DMMF } from '@prisma/generator-helper'

export function mapFieldsToTableData(modelName: string, fields: DMMF.Field[]) {
  return fields.reduce((result, field) => {
    if (field.isId || field.relationName) return result

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
      `<td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {${modelName}.${field.name}}
      </td>
      `
    )
  }, '')
}
