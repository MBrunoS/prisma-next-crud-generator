export const sidebar = (modelsNames: string[]) => {
  const resourcesList = modelsNames.reduce((result, modelName) => {
    const modelNameLower = modelName.toLowerCase()
    return (
      result +
      `
      <li>
        <Link
          href="/${modelNameLower}s"
          className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-indigo-100 hover:text-gray-700"
        >
          ${modelName}s
        </Link>
      </li>
`
    )
  }, '')

  return `
    'use client'

    import Link from 'next/link'
    import { useState } from 'react'
    import { Button } from './ui/Button'
    import { twMerge } from 'tailwind-merge'

    export const Sidebar = () => {
      const [isSidebarOpen, setIsSidebarOpen] = useState(false)

      const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev)
      }

      return (
        <>
          <aside className="flex lg:hidden">
            
            <Button
              variant="secondary"
              className={twMerge(
                'absolute top-2 text-indigo-700 transition-all duration-500',
                isSidebarOpen
                  ? 'left-[10.5rem] md:left-[12.5rem] lg:left-[16.5rem]'
                  : 'left-2',
              )}
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? (
                <CloseIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </Button>

            <div
              className={twMerge(
                'fixed top-0 left-0 z-20 h-screen w-40 md:w-48 lg:w-64 px-4 py-6 border-e bg-indigo-50 transition duration-500 transform -translate-x-full shadow-lg',
                isSidebarOpen ? 'translate-x-0' : '',
              )}
            >
              <Link href="/">
                <span className="grid h-10 w-32 place-content-center rounded-lg bg-indigo-100 text-xs text-gray-600">
                  Logo
                </span>
              </Link>

              <ul className="mt-6 space-y-1">
                ${resourcesList}
              </ul>
            </div>
          </aside>

          <aside className="hidden lg:flex h-screen flex-col justify-between border-e bg-indigo-50">
            <div className="px-4 py-6">
              <Link href="/">
                <span className="grid h-10 w-32 place-content-center rounded-lg bg-indigo-100 text-xs text-gray-600">
                  Logo
                </span>
              </Link>

              <ul className="mt-6 space-y-1">
                ${resourcesList}
              </ul>
            </div>
          </aside>
        </>
      )
    }

    const MenuIcon = ({ className }: { className: string }) => {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
          <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
        </svg>
      )
    }

    const CloseIcon = ({ className }: { className: string }) => {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
        </svg>
      )
    }
  `
}
