export function renderModelNotFound(
  modelName: string,
  modelNameLowerPlural: string,
) {
  return `
    <>
      <header>
        <Heading>${modelName} not found</Heading>
      </header>
      <footer>
        <Link href="/${modelNameLowerPlural}">
          Return to ${modelNameLowerPlural} list
        </Link>
      </footer>
    </>
  `
}
