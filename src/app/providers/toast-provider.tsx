import { useThemeStore } from "@/shared/model/theme.store"
import { Toaster } from "@/shared/ui/sonner"

export function ToastProvider() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode)

  return (
    <Toaster richColors theme={isDarkMode ? "dark" : "light"} duration={3000} />
  )
}
