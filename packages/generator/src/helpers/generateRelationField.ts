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
  const disabled = field.isReadOnly ? 'isDisabled' : ''
  const multiple = field.isList ? 'isMulti' : ''

  return `
    <Select
      name="${field.name}"
      className="mb-2"
      placeholder="Select ${fieldToCapitalizedLabel(field.name)}"
      ${defaultValue}
      ${required}
      ${disabled}
      ${multiple}
      options={${pluralize(field.name)}.map((${field.name}) => ({
        label: ${field.name}.id,
        value: ${field.name}.id,
      }))}
    />
  `
}
