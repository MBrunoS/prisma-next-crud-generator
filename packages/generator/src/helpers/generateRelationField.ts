import { DMMF } from '@prisma/generator-helper'
import { fieldToCapitalizedLabel, pluralize } from '../utils/strings'

export function generateRelationField(
  field: DMMF.Field,
  isEditForm?: boolean,
  modelName?: string,
) {
  return `<div>
    ${renderSelect(field, isEditForm, modelName)}
  </div>`
}

function renderSelect(
  field: DMMF.Field,
  isEditForm?: boolean,
  modelName?: string,
) {
  const defaultValue = isEditForm
    ? `defaultValue={${modelName}.${field.name}${
        field.isList ? '.map((item) => item.id)' : '?.id'
      }}`
    : ''
  const required = field.isRequired ? 'required' : ''
  const disabled = field.isReadOnly ? 'disabled' : ''
  const multiple = field.isList ? 'multiple' : ''

  return `
    <select
      name="${field.name}"
      className="mb-2"
      ${defaultValue}
      ${required}
      ${disabled}
      ${multiple}
    >
      <option value="">Select ${fieldToCapitalizedLabel(field.name)}</option>
      {${pluralize(field.name)}.map((item) => (
        <option key={item.id} value={item.id}>
          {item.id}
        </option>
      ))}
    </select>
  `
}
