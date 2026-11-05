import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
  token: string | null
  email: string | null
  isAuthenticated: boolean
  setCredentials: (token: string, email: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      email: null,
      isAuthenticated: false,

      setCredentials: (token, email) => {
        set({ token, email, isAuthenticated: !!token })
      },

      logout: () => {
        set({ token: null, email: null, isAuthenticated: false })
      },
    }),
    {
      name: "libris:auth",
    },
  ),
)
