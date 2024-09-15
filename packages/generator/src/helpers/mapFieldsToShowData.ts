import { DMMF, ReadonlyDeep } from '@prisma/generator-helper'
import { fieldToCapitalizedLabel } from '../utils/strings'
import { IGNORED_FIELDS } from '../utils/ignoredFields'

export function mapFieldsToShowData(modelName: string, fields: ReadonlyDeep<DMMF.Field[]>) {
  return fields
    .filter((field) => !IGNORED_FIELDS.includes(field.name))
    .reduce((result, field) => {
      if (field.relationName) return result

      if (field.type === 'Boolean') {
        return (
          result +
          `<p className="text-gray-700 mb-4 last:mb-0"><strong className="text-gray-900">${fieldToCapitalizedLabel(
            field.name,
          )}:</strong> {${modelName}.${field.name} ? 'Yes' : 'No'}</p>`
        )
      }

      if (field.type === 'DateTime') {
        return (
          result +
          `<p className="text-gray-700 mb-4 last:mb-0"><strong className="text-gray-900">${fieldToCapitalizedLabel(
            field.name,
          )}:</strong> {new Date(${modelName}.${
            field.name
          }).toLocaleString()}</p>`
        )
      }

      return (
        result +
        `<p className="text-gray-700 mb-4 last:mb-0"><strong className="text-gray-900">${fieldToCapitalizedLabel(
          field.name,
        )}:</strong> {${modelName}.${field.name}}</p>`
      )
    }, '')
}
