import { Toaster } from "@/shared/ui/sonner"
import { useThemeStore } from "@/shared/model/theme.store"

export function ToastProvider() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode)

  return (
    <Toaster 
      richColors 
      theme={isDarkMode ? "dark" : "light"} 
      duration={3000} 
    />
  )
}
