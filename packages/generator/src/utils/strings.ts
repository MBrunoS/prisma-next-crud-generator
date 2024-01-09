import pluralizePkg from 'pluralize'

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function convertPascalCaseToSpaces(str: string): string {
  return str.replace(/([A-Z])/g, ' $1')
}

export function fieldToCapitalizedLabel(str: string): string {
  return capitalize(convertPascalCaseToSpaces(str))
}

export function pluralize(str: string): string {
  return pluralizePkg.plural(str)
}

export function singularize(str: string): string {
  return pluralizePkg.singular(str)
}
