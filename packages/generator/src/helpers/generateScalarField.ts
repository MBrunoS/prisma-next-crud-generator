import { DMMF } from '@prisma/generator-helper'
import { fieldToCapitalizedLabel } from '../utils/strings'

const typeMap = {
  String: 'text',
  Int: 'number',
  BigInt: 'number',
  Float: 'number',
  Decimal: 'number',
  DateTime: 'datetime-local',
  Boolean: 'checkbox',
  Json: 'text',
} as const

export function generateScalarField(
  field: DMMF.Field,
  isEditForm?: boolean,
  modelName?: string,
) {
  const type = typeMap[field.type as keyof typeof typeMap]

  if (!type) return ''

  return renderInput(field, type, isEditForm, modelName)
}

type ValueOf<T> = T[keyof T]
type InputType = ValueOf<typeof typeMap>

function renderInput(
  field: DMMF.Field,
  type: InputType,
  isEditForm?: boolean,
  modelName?: string,
) {
  let value = `${modelName}.${field.name}`
  const checked = `${modelName}.${field.name}`

  if (isEditForm && type === 'datetime-local') {
    value = `new Date(${modelName}.${field.name}).toISOString().slice(0,16)`
  }

  return `<div>
    <Input
      type="${type}"
      label="${fieldToCapitalizedLabel(field.name)}"
      name="${field.name}"
      className="mb-2"
      ${isEditForm && type === 'checkbox' ? `defaultChecked={${checked}}` : ''}
      ${isEditForm && type !== 'checkbox' ? `defaultValue={${value}}` : ''}
      ${field.isRequired ? 'required' : ''}
      ${field.isReadOnly ? 'disabled' : ''}
    />
  </div>`
}
