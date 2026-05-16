import { BookOpen01Icon, Search01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useEffect, useRef } from "react"
import { BookCard } from "@/entities/book"
import { Button } from "@/shared/ui/button"
import { EmptyState } from "@/shared/ui/empty-state"
import { Spinner } from "@/shared/ui/spinner"
import { useBooks } from "../hooks/use-books"

interface BookListProps {
  query: string
  printType: string
  orderBy: string
  onFocusSearch: () => void
}

export function BookList({
  query,
  printType,
  orderBy,
  onFocusSearch,
}: BookListProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useBooks({
    query,
    printType,
    orderBy,
  })

  const books = data.pages.flatMap((page) => page.items || [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 },
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  if (books.length === 0) {
    return (
      <EmptyState
        icon={<HugeiconsIcon icon={BookOpen01Icon} className="size-8" />}
        title="Nenhum livro encontrado"
        description={`Não encontramos resultados para "${query}". Tente buscar por outros termos ou ajustar os filtros.`}
        action={
          <Button onClick={onFocusSearch} className="gap-2">
            <HugeiconsIcon icon={Search01Icon} className="size-4" />
            Tentar novamente
          </Button>
        }
      />
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {hasNextPage && (
        <div ref={loadMoreRef} className="flex justify-center py-8">
          {isFetchingNextPage && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Spinner /> Carregando mais livros...
            </div>
          )}
        </div>
      )}
    </div>
  )
}
