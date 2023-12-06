export const sidebar = (modelsNames: string[]) => {
  const resourcesList = modelsNames.reduce((result, modelName) => {
    const modelNameLower = modelName.toLowerCase()
    return (
      result +
      `
      <li>
        <Link
          href="${modelNameLower}s"
          className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          ${modelName}s
        </Link>
      </li>
`
    )
  }, '')

  return `
    import Link from 'next/link'
    
    export const Sidebar = () => {
      return (
        <aside className="flex h-screen flex-col justify-between border-e bg-white">
          <div className="px-4 py-6">
            <span className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
              Logo
            </span>

            <ul className="mt-6 space-y-1">
              ${resourcesList}
            </ul>
          </div>
        </aside>
      )
    }
  `
}
