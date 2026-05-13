import { Outlet } from "react-router-dom"
import { Sidebar } from "@/widgets/sidebar"

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 pt-20 lg:pl-80 lg:pt-0">
        <Outlet />
      </main>
    </div>
  )
}
