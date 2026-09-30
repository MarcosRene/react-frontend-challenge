import { RouterProvider } from "@tanstack/react-router"
import type { PropsWithChildren } from "react"
import { QueryProvider } from "./query-client"
import { router } from "./routes/router"
import { ThemeProvider } from "./theme-provider"
import { ToastProvider } from "./toast-provider"

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
        <ToastProvider />
        {children}
      </ThemeProvider>
    </QueryProvider>
  )
}
