import type { PropsWithChildren } from "react"

import { QueryProvider } from "./query-client"
import { AppRoutes } from "./routes"

import { ThemeProvider } from "./theme-provider"
import { ToastProvider } from "./toast-provider"

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <AppRoutes />
        <ToastProvider />
        {children}
      </ThemeProvider>
    </QueryProvider>
  )
}
