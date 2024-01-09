import { DMMF } from '@prisma/generator-helper'
import { fieldToCapitalizedLabel } from '../utils/strings'

export function generateRelationField(
  field: DMMF.Field,
  fields: DMMF.Field[],
  isEditForm?: boolean,
  modelName?: string,
) {
  return `<div>
    <select
      name="${field.name}"
      className="mb-2"
      ${field.isList ? 'multiple' : ''}
      ${
        isEditForm
          ? `defaultValue={${modelName}.${field.name}.map((item) => item.id)}`
          : ''
      }
      ${field.isRequired ? 'required' : ''}
      ${field.isReadOnly ? 'disabled' : ''}
    >
      <option value="">Select ${fieldToCapitalizedLabel(field.name)}</option>
      {${field.name}.map((item) => (
        <option key={item.id} value={item.id}>
          {item.id}
        </option>
      ))}
    </select>
  </div>`
}
