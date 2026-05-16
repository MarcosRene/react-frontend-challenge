import { ArrowLeft01Icon, ArrowRight01Icon, MoreHorizontalIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "@/shared/lib/utils"
import { Button, buttonVariants } from "@/shared/ui/button"
import type { ComponentProps } from "react"

function Pagination({ className, ...props }: ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }: ComponentProps<"ul">) {
  return (
    <ul
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
}

function PaginationItem({ className, ...props }: ComponentProps<"li">) {
  return <li className={cn("", className)} {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & ComponentProps<typeof Button>

function PaginationLink({ className, isActive, ...props }: PaginationLinkProps) {
  return (
    <Button
      aria-current={isActive ? "page" : undefined}
      variant={isActive ? "outline" : "ghost"}
      size="icon"
      className={cn(className)}
      {...props}
    />
  )
}

function PaginationPrevious({ className, ...props }: ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Ir para a página anterior"
      className={cn("gap-1", className)}
      {...props}
    >
      <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
    </PaginationLink>
  )
}

function PaginationNext({ className, ...props }: ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Ir para a próxima página"
      className={cn("gap-1", className)}
      {...props}
    >
      <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
    </PaginationLink>
  )
}

function PaginationEllipsis({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      className={cn("flex h-8 w-8 items-center justify-center", className)}
      {...props}
    >
      <HugeiconsIcon icon={MoreHorizontalIcon} className="size-4" />
      <span className="sr-only">Mais páginas</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
