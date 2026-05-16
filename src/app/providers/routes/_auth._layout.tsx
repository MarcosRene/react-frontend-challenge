import { createFileRoute, Outlet } from "@tanstack/react-router"
import { MainLayout } from "@/app/layouts/main-layout"

export const Route = createFileRoute("/_auth/_layout")({
  component: () => (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ),
})
