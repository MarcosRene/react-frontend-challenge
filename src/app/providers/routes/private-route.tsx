import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "@/features/auth/model/auth.store"

export function PrivateRouter() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />
  }

  return <Outlet />
}
