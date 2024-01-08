import { DMMF } from '@prisma/generator-helper'
import { fieldToCapitalizedLabel } from '../utils/strings'

const typeMap = {
  String: 'text',
  Int: 'number',
  BigInt: 'number',
  Float: 'number',
  Decimal: 'number',
}

export function generateScalarField(
  field: DMMF.Field,
  isEditForm?: boolean,
  modelName?: string,
) {
  if (field.type === 'Boolean') {
    return `<div>
      <Input
        type="checkbox"
        label="${fieldToCapitalizedLabel(field.name)}"
        name="${field.name}"
        className="mb-2"
        ${isEditForm ? `defaultChecked={${modelName}.${field.name}}` : ''}
        ${field.isRequired ? 'required' : ''}
        ${field.isReadOnly ? 'disabled' : ''}
      />
    </div>`
  }

  if (field.type === 'DateTime') {
    return `<div>
      <Input
        type="datetime-local"
        label="${fieldToCapitalizedLabel(field.name)}"
        name="${field.name}"
        className="mb-2"
        ${
          isEditForm
            ? `defaultValue={new Date(${modelName}.${field.name}).toISOString().slice(0,16)}`
            : ''
        }
        ${field.isRequired ? 'required' : ''}
        ${field.isReadOnly ? 'disabled' : ''}
      />
    </div>`
  }

  const type = typeMap[field.type as keyof typeof typeMap]

  if (!type) return ''

  return `<div>
    <Input
      type="${type}"
      label="${fieldToCapitalizedLabel(field.name)}"
      name="${field.name}"
      className="mb-2"
      ${isEditForm ? `defaultValue={${modelName}.${field.name}}` : ''}
      ${field.isRequired ? 'required' : ''}
      ${field.isReadOnly ? 'disabled' : ''}
    />
  </div>`
}
