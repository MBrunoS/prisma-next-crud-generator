export const dashboard = (modelsNames: string[]) => {
  const resourcesList = modelsNames.reduce((result, modelName) => {
    const modelNameLower = modelName.toLowerCase()
    return (
      result +
      `
      <div>
        <a href="${modelNameLower}s">${modelName}s</a>
      </div>
`
    )
  }, '')

  return `  
  export default function DashboardPage() {
    return (
      <>
        <header>
          <h1>Dashboard</h1>
        </header>
        <div>
          <div>Resource</div>
          ${resourcesList}
        </div>
      </>
    )
  }
  `
}
