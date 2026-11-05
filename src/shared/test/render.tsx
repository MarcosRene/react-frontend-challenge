import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router"
import { act, render } from "@testing-library/react"

import { routeTree } from "@/app/providers/routes/routeTree.gen"
import { useAuthStore } from "@/features/auth/model/auth.store"

interface RenderWithProvidersOptions {
  initialRoute?: string
  authenticated?: boolean
}

export async function renderWithProviders({
  initialRoute = "/",
  authenticated = false,
}: RenderWithProvidersOptions = {}) {
  useAuthStore.setState({
    isAuthenticated: authenticated,
    token: authenticated ? "test-token" : null,
    email: authenticated ? "test@test.com" : null,
  })

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  })

  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: [initialRoute],
    }),
  })

  await router.load()

  let result!: ReturnType<typeof render>
  await act(async () => {
    result = render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    )
  })

  return result
}
