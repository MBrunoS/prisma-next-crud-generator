import { DMMF } from '@prisma/generator-helper'
import { fieldToCapitalizedLabel } from '../utils/strings'
import { IGNORED_FIELDS } from '../utils/ignoredFields'

export function mapFieldsToTableTitles(fields: DMMF.Field[]) {
  return fields
    .filter((field) => !IGNORED_FIELDS.includes(field.name))
    .reduce((result, field) => {
      if (field.relationName) return result

      return (
        result +
        `<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        ${fieldToCapitalizedLabel(field.name)}
      </th>`
      )
    }, '')
}
