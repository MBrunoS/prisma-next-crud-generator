import { describe, expect, it } from 'vitest'
import {
  capitalize,
  pascalCaseToSpaces,
  fieldToCapitalizedLabel,
  pascalToCamelCase,
  pascalToSnakeCase,
  pluralize,
  singularize,
} from '../utils/strings'

describe('capitalize', () => {
  it('should capitalize the first letter of a string', () => {
    const result = capitalize('hello')
    expect(result).toBe('Hello')
  })

  it('should handle empty strings', () => {
    const result = capitalize('')
    expect(result).toBe('')
  })

  it('should handle strings with no capital letters', () => {
    const result = capitalize('hello')
    expect(result).toBe('Hello')
  })

  it('should handle strings with a capital letter', () => {
    const result = capitalize('Hello')
    expect(result).toBe('Hello')
  })

  it('should handle strings with multiple capital letters', () => {
    const result = capitalize('HELLO')
    expect(result).toBe('HELLO')
  })
})

describe('pascalCaseToSpaces', () => {
  it('should convert PascalCase to spaces', () => {
    const result = pascalCaseToSpaces('HelloWorld')
    expect(result).toBe('Hello World')
  })

  it('should handle empty strings', () => {
    const result = pascalCaseToSpaces('')
    expect(result).toBe('')
  })

  it('should handle strings with no capital letters', () => {
    const result = pascalCaseToSpaces('hello')
    expect(result).toBe('hello')
  })

  it('should handle strings with a capital letter', () => {
    const result = pascalCaseToSpaces('Hello')
    expect(result).toBe('Hello')
  })

  it('should handle strings with multiple capital letters', () => {
    const result = pascalCaseToSpaces('HELLO')
    expect(result).toBe('H E L L O')
  })
})

describe('pascalToCamelCase', () => {
  it('should convert PascalCase to camelCase', () => {
    const result = pascalToCamelCase('HelloWorld')
    expect(result).toBe('helloWorld')
  })

  it('should handle empty strings', () => {
    const result = pascalToCamelCase('')
    expect(result).toBe('')
  })

  it('should handle strings with no capital letters', () => {
    const result = pascalToCamelCase('hello')
    expect(result).toBe('hello')
  })

  it('should handle strings with a capital letter', () => {
    const result = pascalToCamelCase('Hello')
    expect(result).toBe('hello')
  })

  it('should handle strings with multiple capital letters', () => {
    const result = pascalToCamelCase('HELLO')
    expect(result).toBe('hELLO')
  })
})

describe('pascalToSnakeCase', () => {
  it('should convert PascalCase to snake_case', () => {
    const result = pascalToSnakeCase('HelloWorld')
    expect(result).toBe('hello_world')
  })

  it('should handle empty strings', () => {
    const result = pascalToSnakeCase('')
    expect(result).toBe('')
  })

  it('should handle strings with no capital letters', () => {
    const result = pascalToSnakeCase('hello')
    expect(result).toBe('hello')
  })

  it('should handle strings with a capital letter', () => {
    const result = pascalToSnakeCase('Hello')
    expect(result).toBe('hello')
  })

  it('should handle strings with multiple capital letters', () => {
    const result = pascalToSnakeCase('HELLO')
    expect(result).toBe('h_e_l_l_o')
  })
})

describe('fieldToCapitalizedLabel', () => {
  it('should return a capitalized string', () => {
    const result = fieldToCapitalizedLabel('myFieldName')
    expect(result).toBe('My Field Name')
  })

  it('should handle single word strings', () => {
    const result = fieldToCapitalizedLabel('field')
    expect(result).toBe('Field')
  })

  it('should handle empty strings', () => {
    const result = fieldToCapitalizedLabel('')
    expect(result).toBe('')
  })

  it('should handle strings with no capital letters', () => {
    const result = fieldToCapitalizedLabel('myfield')
    expect(result).toBe('Myfield')
  })
})

describe('pluralize', () => {
  it('should pluralize a singular word', () => {
    const result = pluralize('cat')
    expect(result).toBe('cats')
  })

  it('should handle empty strings', () => {
    const result = pluralize('')
    expect(result).toBe('')
  })

  it('should handle snake_case words', () => {
    const result = pluralize('snake_case')
    expect(result).toBe('snake_cases')
  })

  it('should handle PascalCase words', () => {
    const result = pluralize('PascalCase')
    expect(result).toBe('PascalCases')
  })

  it('should handle camelCase words', () => {
    const result = pluralize('camelCase')
    expect(result).toBe('camelCases')
  })
})

describe('singularize', () => {
  it('should singularize a plural word', () => {
    const result = singularize('cats')
    expect(result).toBe('cat')
  })

  it('should handle empty strings', () => {
    const result = singularize('')
    expect(result).toBe('')
  })

  it('should handle snake_case words', () => {
    const result = singularize('snake_cases')
    expect(result).toBe('snake_case')
  })

  it('should handle PascalCase words', () => {
    const result = singularize('PascalCases')
    expect(result).toBe('PascalCase')
  })

  it('should handle camelCase words', () => {
    const result = singularize('camelCases')
    expect(result).toBe('camelCase')
  })
})
