import { pascalCaseToSpaces, pascalToSnakeCase, pluralize } from './strings'

export function renderModelNotFound(modelName: string) {
  const modelNameSpaced = pascalCaseToSpaces(modelName)
  const modelNameSpacedPlural = pluralize(modelNameSpaced)
  const modelNameSnakeCasePlural = pluralize(pascalToSnakeCase(modelName))
  return `
    <>
      <header>
        <Heading>${modelNameSpaced} not found</Heading>
      </header>
      <footer>
        <Link href="/${modelNameSnakeCasePlural}">
          Return to ${modelNameSpacedPlural} list
        </Link>
      </footer>
    </>
  `
}
