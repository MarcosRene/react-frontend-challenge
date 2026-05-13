import type { PropsWithChildren } from "react"

import { QueryProvider } from "./query-client"
import { AppRoutes } from "./routes"

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <AppRoutes />
      {children}
    </QueryProvider>
  )
}
