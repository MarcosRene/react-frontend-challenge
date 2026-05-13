import { HugeiconsIcon, type HugeiconsProps } from "@hugeicons/react"
import { NavLink } from "react-router-dom"
import { cn } from "@/shared/lib/utils"

interface NavItemProps {
  to: string
  icon: HugeiconsProps["icon"]
  title: string
}

export function NavItem({ to, icon, title }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          "hover:bg-accent",
          isActive
            ? "bg-primary/10 text-primary hover:bg-primary/15"
            : "text-muted-foreground hover:text-foreground",
        )
      }
    >
      <HugeiconsIcon
        icon={icon}
        className="size-5 transition-colors group-data-[active=true]:text-primary"
      />
      <span>{title}</span>
    </NavLink>
  )
}
