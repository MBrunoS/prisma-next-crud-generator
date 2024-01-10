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
    expect(result).toContain('<select')
    expect(result).toContain('</select>')
  })

  it('should generate field name correctly', () => {
    const result = generateRelationField(field)
    expect(result).toContain(`name="testField"`)
  })

  it('should generate select with required attribute only when field is required', () => {
    const result = generateRelationField(field)
    expect(result).not.toContain('required')

    field.isRequired = true
    const result2 = generateRelationField(field)
    expect(result2).toContain('required')
  })

  it('should generate select with disabled attribute only when field is read only', () => {
    const result = generateRelationField(field)
    expect(result).not.toContain('disabled')

    field.isReadOnly = true
    const result2 = generateRelationField(field)
    expect(result2).toContain('disabled')
  })

  it('should generate select with multiple attribute only when field is list', () => {
    const result = generateRelationField(field)
    expect(result).not.toContain('multiple')

    field.isList = true
    const result2 = generateRelationField(field)
    expect(result2).toContain('multiple')
  })

  it('should generate select with default value only when isEditForm is true', () => {
    const result = generateRelationField(field)
    expect(result).not.toContain('defaultValue')

    const modelName = 'testModel'
    const result2 = generateRelationField(field, true, modelName)
    expect(result2).toContain(`defaultValue={${modelName}.testField`)
  })

  it('should generate select with pluralized field name in map function', () => {
    const result = generateRelationField(field)
    expect(result).toContain('{testFields.map')
  })

  it('should generate select with capitalized field name in option label', () => {
    const result = generateRelationField(field)
    expect(result).toContain(`Select ${field.name[0].toUpperCase()}`)
  })

  it('should generate select with capitalized field name in option value', () => {
    const result = generateRelationField(field)
    expect(result).toContain('{testField.id}')
  })

  it('should generate select with capitalized field name in option key', () => {
    const result = generateRelationField(field)
    expect(result).toContain('key={testField.id}')
  })

  it('should generate select with capitalized field name in option value when field is list', () => {
    field.isList = true
    const result = generateRelationField(field)
    expect(result).toContain('{testField.id}')
  })
})
