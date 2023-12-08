import { DMMF } from '@prisma/generator-helper'
import { fieldToCapitalizedLabel } from '../utils/strings'

export function mapFieldsToTableTitles(fields: DMMF.Field[]) {
  return fields.reduce((result, field) => {
    if (field.isId || field.relationName) return result

    return (
      result +
      `<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        ${fieldToCapitalizedLabel(field.name)}
      </th>`
    )
  }, '')
}
