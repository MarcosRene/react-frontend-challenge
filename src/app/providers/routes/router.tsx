import { createBrowserRouter, Navigate } from "react-router-dom"
import { DashboardPage } from "@/pages/dashboard/ui/dashboard"
import { SignIn } from "@/pages/sign-in/ui/sign-in"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/sign-in" replace />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
])
