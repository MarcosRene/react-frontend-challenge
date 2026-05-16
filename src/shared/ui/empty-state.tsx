import type * as React from "react"
import { cn } from "@/shared/lib/utils"

interface EmptyStateProps extends React.ComponentProps<"div"> {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({
  className,
  icon,
  title,
  description,
  action,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center animate-in fade-in zoom-in duration-300 dark:bg-muted/10",
        className,
      )}
      {...props}
    >
      {icon && (
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
      )}
      <h3 className="mb-2 text-xl font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mb-6 max-w-[350px] text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  )
}
