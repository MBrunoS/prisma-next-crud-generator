export const layout = `
import { Sidebar } from '@/components/Sidebar'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex">
        <Sidebar />
        <main className="flex-1 px-4 py-2 min-h-screen flex flex-col">{children}</main>
      </body>
    </html>
  )
}`
