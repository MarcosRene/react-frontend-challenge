import { type PropsWithChildren, useEffect } from "react"
import { useThemeStore } from "@/shared/model/theme.store"

export function ThemeProvider({ children }: PropsWithChildren) {
  const isDarkMode = useThemeStore((state) => state.isDarkMode)

  useEffect(() => {
    const root = window.document.documentElement

    if (isDarkMode) {
      root.classList.add("dark")
      return
    }
    root.classList.remove("dark")
  }, [isDarkMode])

  return <>{children}</>
}
