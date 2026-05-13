import {
  Cancel01Icon,
  DashboardSquare01Icon,
  Logout01Icon,
  Menu01Icon,
  Store01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import * as Collapsible from "@radix-ui/react-collapsible"
import { useEffect, useState } from "react"
import moonIcon from "@/assets/icons/moon.png"
import sunIcon from "@/assets/icons/sun.png"
import { useAuthStore } from "@/features/auth/model/auth.store"
import { useThemeStore } from "@/shared/model/theme.store"
import { Avatar, AvatarFallback } from "@/shared/ui/avatar"
import { Button } from "@/shared/ui/button"
import { NavItem } from "./nav-item"

export function Sidebar() {
  const [mounted, setMounted] = useState(false)
  const email = useAuthStore((state) => state.email)
  const logout = useAuthStore((state) => state.logout)
  const { isDarkMode, toggleTheme } = useThemeStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const initials = email?.substring(0, 2).toUpperCase() || "US"

  return (
    <Collapsible.Root className="fixed left-0 right-0 top-0 z-20 flex flex-col gap-6 border-b border-border bg-background p-4 data-[state=open]:bottom-0 lg:right-auto lg:w-80 lg:border-r lg:px-5 lg:py-8 lg:data-[state=closed]:bottom-0">
      <div className="flex items-start justify-between">
        <div className="flex items-start justify-center flex-col">
          <h1 className="text-2xl font-bold font-sans animate-text-shine">
            Libris
          </h1>
          <p className="text-sm font-sans animate-text-shine shine-zinc">
            Gerenciador de bibliotecas
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-500 hover:bg-accent"
            onClick={toggleTheme}
            aria-label="Alternar tema"
          >
            <img
              src={isDarkMode ? sunIcon : moonIcon}
              alt={isDarkMode ? "Sun Icon" : "Moon Icon"}
              className="size-5"
            />
          </Button>

          <Collapsible.Trigger asChild className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="group text-zinc-500"
              aria-label="Abrir menu"
            >
              <HugeiconsIcon
                icon={Menu01Icon}
                className="size-5 group-data-[state=open]:hidden"
              />
              <HugeiconsIcon
                icon={Cancel01Icon}
                className="size-5 group-data-[state=closed]:hidden"
              />
            </Button>
          </Collapsible.Trigger>
        </div>
      </div>

      <Collapsible.Content
        forceMount
        className="flex flex-1 flex-col gap-6 overflow-hidden data-[state=closed]:hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down lg:data-[state=closed]:flex lg:data-[state=closed]:animate-none lg:data-[state=open]:animate-none"
      >
        <nav className="flex flex-col gap-1">
          <NavItem
            to="/explore"
            icon={DashboardSquare01Icon}
            title="Explorar"
          />
          <NavItem to="/bookshelf" icon={Store01Icon} title="Estande" />
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          <div className="h-px bg-border" />

          <div className="flex items-center gap-3 px-1 overflow-hidden">
            <Avatar size="lg">
              <AvatarFallback className="bg-primary/10 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col overflow-hidden">
              <span className="truncate text-sm font-medium text-foreground">
                {email}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-400 hover:text-destructive"
              onClick={logout}
              title="Sair"
            >
              <HugeiconsIcon icon={Logout01Icon} className="size-5" />
            </Button>
          </div>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
