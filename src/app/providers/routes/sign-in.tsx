import { createFileRoute, redirect } from "@tanstack/react-router"
import { useAuthStore } from "@/features/auth/model/auth.store"
import { SignIn } from "@/pages/sign-in/ui/sign-in"

export const Route = createFileRoute("/sign-in")({
  beforeLoad: () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated
    if (isAuthenticated) {
      throw redirect({ to: "/explore", replace: true })
    }
  },
  component: SignIn,
})
