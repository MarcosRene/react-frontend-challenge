import { Add01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/shared/ui/button"
import { Skeleton } from "@/shared/ui/skeleton"
import type { Book } from "../model/types"

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  const { title, authors, thumbnailUrl } = book

  return (
    <div className="group flex flex-col gap-3 rounded-xl border border-border bg-muted/30 p-3 transition-all hover:shadow-md dark:bg-muted/10">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-200 dark:bg-zinc-800">
            <span className="text-xs text-muted-foreground italic">
              Sem capa
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <h3
          className="line-clamp-1 text-sm font-semibold text-foreground"
          title={title}
        >
          {title}
        </h3>
        <p className="line-clamp-1 text-xs text-muted-foreground">
          {authors?.join(", ") || "Autor desconhecido"}
        </p>
      </div>

      <Button variant="outline" size="sm" className="w-full gap-2">
        <HugeiconsIcon icon={Add01Icon} className="size-4" />
        Adicionar
      </Button>
    </div>
  )
}

export function BookCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-muted/30 p-3 dark:bg-muted/10">
      <Skeleton className="aspect-[3/4] w-full rounded-lg" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-9 w-full" />
    </div>
  )
}
