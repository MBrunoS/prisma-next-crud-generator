export const heading = `
import React from "react"
import { twMerge } from "tailwind-merge"

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(({ level = 1, className, ...props }, ref) => {
  const HeadingTag = \`h\${level}\` as React.ElementType

  const sizes = {
    1: 'text-3xl font-bold sm:text-4xl text-gray-900',
    2: 'text-2xl font-bold sm:text-3xl text-gray-900',
    3: 'text-xl font-bold sm:text-2xl text-gray-900',
    4: 'text-lg font-bold sm:text-xl text-gray-900',
    5: 'text-base font-bold sm:text-lg text-gray-900',
    6: 'text-sm font-bold sm:text-base text-gray-900',
  }

  return (
    <HeadingTag className={twMerge(sizes[level], className)} {...props} ref={ref} />
  )
})
`
