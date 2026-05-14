import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { type RenderOptions, render } from "@testing-library/react"
import type { PropsWithChildren, ReactNode } from "react"

import { MemoryRouter } from "react-router-dom"

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  initialRoute?: string
}

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },

      mutations: {
        retry: false,
      },
    },
  })
}

export function renderWithProviders(
  ui: ReactNode,
  options?: CustomRenderOptions,
) {
  const { initialRoute = "/", ...renderOptions } = options || {}

  const queryClient = createTestQueryClient()

  function Wrapper({ children }: PropsWithChildren) {
    return (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[initialRoute]}>{children}</MemoryRouter>
      </QueryClientProvider>
    )
  }

  return render(ui, {
    wrapper: Wrapper,
    ...renderOptions,
  })
}
