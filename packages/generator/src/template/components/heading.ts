export const heading = `
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

export const Heading = ({ level = 1, className, ...props }: HeadingProps) => {
  const HeadingTag = \`h\${level}\` as React.ElementType

  const sizes = {
    1: 'text-3xl font-bold sm:text-4xl',
    2: 'text-2xl font-bold sm:text-3xl',
    3: 'text-xl font-bold sm:text-2xl',
    4: 'text-lg font-bold sm:text-xl',
    5: 'text-base font-bold sm:text-lg',
    6: 'text-sm font-bold sm:text-base',
  }

  return (
    <HeadingTag className={\`\${sizes[level]} \${className}\`} {...props} />
  )
}
`
