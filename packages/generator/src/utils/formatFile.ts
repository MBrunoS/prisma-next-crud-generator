import prettier from 'prettier'

export const formatFile = (
  content: string,
  fileType = 'typescript',
): Promise<string> => {
  return new Promise((res, rej) =>
    prettier.resolveConfig(process.cwd()).then((options) => {
      if (!options) {
        res(content) // no prettier config was found, no need to format
      }

      try {
        const formatted = prettier.format(content, {
          ...options,
          parser: fileType,
        })

        res(formatted)
      } catch (error) {
        rej(error)
      }
    }),
  )
}
