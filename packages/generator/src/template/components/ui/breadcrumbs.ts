export const breadcrumbs = `
import React from 'react'
import Link from 'next/link'

interface BreadcrumbsProps extends React.HTMLAttributes<HTMLDivElement> {
  elements: { name: string; href: string }[]
}

export const Breadcrumbs = React.forwardRef<HTMLDivElement, BreadcrumbsProps>(
  ({ elements, ...props }, ref) => {
    return (
      <nav aria-label="Breadcrumb" {...props} ref={ref}>
        <ol className="flex items-center gap-1 text-sm text-gray-600">
          {elements.map((elem, index) => {
            if (index === elements.length - 1) {
              return (
                <li key={elem.name}>{elem.name}</li>
              )
            }

            return (
              <React.Fragment key={elem.name}>
                <li>
                  <Link
                    href={elem.href}
                    className="block transition hover:text-indigo-600"
                  >
                    {elem.name}
                  </Link>
                </li>
                <li>
                  <ChevronRightIcon className="w-5 h-5" />
                </li>
              </React.Fragment>
            )
          })}
        </ol>
      </nav>
    )
  },
)

const ChevronRightIcon = ({ className }: { className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
        clipRule="evenodd"
      />
    </svg>
  )
}
`
