import { Add01Icon, CheckmarkCircle01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Link } from "@tanstack/react-router"
import { toast } from "sonner"
import { Button } from "@/shared/ui/button"
import { useBookshelfStore } from "../model/bookshelf-store"
import type { Book } from "../model/types"

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  const { id, title, authors, thumbnailUrl } = book
  const handleCreateBookshelfBook = useBookshelfStore(
    (state) => state.handleCreateBookshelfBook,
  )
  const inBookshelf = useBookshelfStore((state) => !!state.books[book.id])

  function handleAddToBookshelf() {
    handleCreateBookshelfBook(book)
    toast.success("Livro adicionado à sua estante")
  }

  return (
    <div className="group flex flex-col gap-3 rounded-xl border border-border bg-muted/30 p-3 transition-all hover:shadow-md dark:bg-muted/10">
      <Link to="/book/$id" params={{ id }} className="flex flex-col gap-3">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none">
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
      </Link>

      <Button
        variant={inBookshelf ? "secondary" : "outline"}
        size="sm"
        className="w-full gap-2"
        disabled={inBookshelf}
        onClick={handleAddToBookshelf}
      >
        <HugeiconsIcon
          data-bookself={inBookshelf}
          icon={inBookshelf ? CheckmarkCircle01Icon : Add01Icon}
          className="size-4 data-[bookself=true]:text-green-500"
        />
        {inBookshelf ? "Na minha estante" : "Adicionar à estante"}
      </Button>
    </div>
  )
}
