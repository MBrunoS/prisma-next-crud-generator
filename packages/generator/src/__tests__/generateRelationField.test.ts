import { describe, expect, it, beforeEach } from '@jest/globals'
import { DMMF } from '@prisma/generator-helper'
import { generateRelationField } from '../helpers/generateRelationField'

describe('generateRelationField', () => {
  let field: DMMF.Field

  beforeEach(() => {
    field = {
      name: 'testField',
      isList: false,
      isRequired: false,
      isReadOnly: false,
      kind: 'object',
      isUnique: false,
      isId: false,
      type: 'String',
      hasDefaultValue: false,
    }
  })

  it('should generate select element correctly', () => {
    const result = generateRelationField(field)
    expect(result).toContain('<div>')
    expect(result).toContain('<Select')
  })

  it('should generate field name correctly', () => {
    const result = generateRelationField(field)
    expect(result).toContain(`name="testField"`)
  })

  it('should generate select with required attribute only when field is required', () => {
    const result = generateRelationField(field)
    expect(result).not.toContain('required')

    const result2 = generateRelationField({
      ...field,
      isRequired: true,
    })
    expect(result2).toContain('required')
  })

  it('should generate select with disabled attribute only when field is read only', () => {
    const result = generateRelationField(field)
    expect(result).not.toContain('isDisabled')

    const result2 = generateRelationField({
      ...field,
      isReadOnly: true,
    })
    expect(result2).toContain('isDisabled')
  })

  it('should generate select with multiple attribute only when field is list', () => {
    const result = generateRelationField(field)
    expect(result).not.toContain('isMulti')

    const result2 = generateRelationField({
      ...field,
      isList: true,
    })
    expect(result2).toContain('isMulti')
  })

  it('should generate select with default value only when isEditForm is true', () => {
    const result = generateRelationField(field)
    expect(result).not.toContain('defaultValue')

    const modelName = 'testModel'
    const result2 = generateRelationField(field, true, modelName)
    expect(result2).toContain(`defaultValue={{ label: ${modelName}.testField`)
  })

  it('should generate select with pluralized field name in options', () => {
    const result = generateRelationField(field)
    expect(result).toContain('options={testFields.map')
  })

  it('should generate select with capitalized field name placeholder', () => {
    const result = generateRelationField(field)
    expect(result).toContain(`placeholder="Select Test Field"`)
  })

  it('should generate select with option value and label', () => {
    const result = generateRelationField(field)
    expect(result).toContain('label: testField.id')
    expect(result).toContain('value: testField.id')
  })
})
