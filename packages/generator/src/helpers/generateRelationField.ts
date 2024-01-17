import { DMMF } from '@prisma/generator-helper'
import {
  fieldToCapitalizedLabel,
  pluralize,
  singularize,
} from '../utils/strings'

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
  const fieldName = singularize(field.name)
  const defaultValue = isEditForm
    ? `defaultValue={${
        field.isList
          ? `${modelName}.${field.name}.map((${fieldName}) => ({ label: ${fieldName}.id, value: ${fieldName}.id}))`
          : `{ label: ${modelName}.${field.name}?.id, value: ${modelName}.${field.name}?.id }`
      }}`
    : ''
  const required = field.isRequired && !field.isList ? 'required' : ''
  const disabled = field.isReadOnly ? 'isDisabled' : ''
  const multiple = field.isList ? 'isMulti' : ''

  return `
    <Select
      name="${field.name}"
      className="mt-1 mb-2"
      label="${fieldToCapitalizedLabel(field.name)}"
      placeholder="Select ${fieldToCapitalizedLabel(field.name)}"
      ${defaultValue}
      ${required}
      ${disabled}
      ${multiple}
      options={${pluralize(field.name)}.map((${fieldName}) => ({
        label: ${fieldName}.id,
        value: ${fieldName}.id,
      }))}
    />
  `
}
