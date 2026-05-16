import type { ReactNode } from "react"
import { Sidebar } from "@/widgets/sidebar"

interface MainLayoutProps {
  children?: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 pt-20 lg:pl-72 lg:pt-0">{children}</main>
    </div>
  )
}
