import { DMMF } from '@prisma/generator-helper'
import { generateScalarField } from '../helpers/generateScalarField'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { fieldToCapitalizedLabel } from '../utils/strings'

describe('generateScalarField', () => {
  let field: DMMF.Field

  beforeEach(() => {
    field = {
      name: 'testField',
      type: 'String',
      kind: 'scalar',
      isList: false,
      isRequired: false,
      isReadOnly: false,
      isUnique: false,
      isId: false,
      hasDefaultValue: false,
    }
  })

  it('should return empty string if type is not in typeMap', () => {
    field.type = 'UnknownType'
    const result = generateScalarField(field)
    expect(result).toBe('')
  })

  it('should generate Input with correct attributes', () => {
    const result = generateScalarField(field)
    expect(result).toContain('<div>')
    expect(result).toContain('<Input')
    expect(result).toContain(`type="text"`)
    expect(result).toContain(`label="${fieldToCapitalizedLabel(field.name)}"`)
    expect(result).toContain(`name="${field.name}"`)
    expect(result).toContain('className="mb-2"')
    expect(result).not.toContain('defaultValue')
    expect(result).not.toContain('defaultChecked')
    expect(result).not.toContain('required')
    expect(result).not.toContain('disabled')
  })

  it('should generate Input with correct attributes when field is required', () => {
    field.isRequired = true
    const result = generateScalarField(field)
    expect(result).toContain('required')
  })

  it('should generate Input with correct parameters when field is read only', () => {
    field.isReadOnly = true
    const result = generateScalarField(field)
    expect(result).toContain('disabled')
  })

  it('should generate Input with correct parameters when field is checkbox', () => {
    field.type = 'Boolean'

    const result = generateScalarField(field)
    expect(result).toContain('type="checkbox"')
    expect(result).not.toContain('defaultChecked')

    const result2 = generateScalarField(field, true, 'modelName')
    expect(result2).toContain('type="checkbox"')
    expect(result2).toContain('defaultChecked={modelName.testField}')
  })

  it('should generate Input with correct parameters when field is datetime-local', () => {
    field.type = 'DateTime'

    const result = generateScalarField(field)
    expect(result).toContain('type="datetime-local"')
    expect(result).not.toContain('defaultValue')

    const result2 = generateScalarField(field, true, 'modelName')
    expect(result2).toContain('type="datetime-local"')
    expect(result2).toContain(
      'defaultValue={new Date(modelName.testField).toISOString().slice(0,16)}',
    )
  })
})
