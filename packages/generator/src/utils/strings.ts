import pluralizePkg from 'pluralize'

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function pascalCaseToSpaces(str: string): string {
  return str.replace(/([A-Z])/g, ' $1').trim()
}

export function pascalToCamelCase(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1)
}

export function pascalToSnakeCase(str: string): string {
  return str.replace(/([A-Z])/g, (_, letter, index) => {
    return (index ? '_' : '') + letter.toLowerCase()
  })
}

export function fieldToCapitalizedLabel(str: string): string {
  return capitalize(pascalCaseToSpaces(str))
}

export function pluralize(str: string): string {
  return pluralizePkg.plural(str)
}

export function singularize(str: string): string {
  return pluralizePkg.singular(str)
}
