import { DMMF } from '@prisma/generator-helper'
import { capitalize } from '../utils/capitalize'

const typeMap = {
  String: 'text',
  Int: 'number',
  BigInt: 'number',
  Float: 'number',
  Decimal: 'number',
}

export function mapFieldsToFormInputs(
  fields: DMMF.Field[],
  modelNameToEdit?: string,
) {
  return fields.reduce((result, field) => {
    if (field.isId || field.relationName) return result

    if (field.type === 'Boolean') {
      return (
        result +
        `<div>
          <Input
            type="checkbox"
            label="${capitalize(field.name)}"
            name="${field.name}"
            className="mb-2"
            ${
              !!modelNameToEdit
                ? `defaultChecked={${modelNameToEdit}.${field.name}}`
                : ''
            }
            ${field.isRequired ? 'required' : ''}
          />
        </div>`
      )
    }

    if (field.type === 'DateTime') {
      return (
        result +
        `<div>
          <Input
            type="datetime-local"
            label="${capitalize(field.name)}"
            name="${field.name}"
            className="mb-2"
            ${
              !!modelNameToEdit
                ? `defaultValue={new Date(${modelNameToEdit}.${field.name}).toISOString().slice(0,16)}`
                : ''
            }
            ${field.isRequired ? 'required' : ''}
          />
        </div>`
      )
    }

    const type = typeMap[field.type as keyof typeof typeMap]

    if (!type) return result

    return (
      result +
      `<div>
        <Input
          type="${type}"
          label="${capitalize(field.name)}"
          name="${field.name}"
          className="mb-2"
          ${
            !!modelNameToEdit
              ? `defaultValue={${modelNameToEdit}.${field.name}}`
              : ''
          }
          ${field.isRequired ? 'required' : ''}
        />
      </div>`
    )
  }, '')
}
