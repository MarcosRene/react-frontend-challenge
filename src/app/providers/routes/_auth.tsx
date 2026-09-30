import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { useAuthStore } from "@/features/auth/model/auth.store"

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ location }) => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated
    if (!isAuthenticated) {
      throw redirect({
        to: "/sign-in",
        replace: true,
        search: { redirect: location.pathname },
      })
    }
  },
  component: () => <Outlet />,
})
