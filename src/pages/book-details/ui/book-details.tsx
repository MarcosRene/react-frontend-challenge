import {
  Add01Icon,
  ArrowRight01Icon,
  BookOpen01Icon,
  Building01Icon,
  Calendar03Icon,
  Cancel01Icon,
  GlobalIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Link, useParams } from "@tanstack/react-router"
import { toast } from "sonner"
import { useBookshelfStore } from "@/entities/book"
import { useGetBook } from "@/features/books"
import { BookDetailsSkeleton } from "@/features/books/ui/book-details-skeleton"
import { Button } from "@/shared/ui/button"

export function BookDetails() {
  const { id } = useParams({ from: "/_auth/_layout/book/$id" })
  const { data: book, isLoading } = useGetBook(id)

  const handleCreateBookshelfBook = useBookshelfStore(
    (state) => state.handleCreateBookshelfBook,
  )
  const handleDeleteBookshelfBook = useBookshelfStore(
    (state) => state.handleDeleteBookshelfBook,
  )
  const inBookshelf = useBookshelfStore(
    (state) => !!(book && state.books[book.id]),
  )

  if (isLoading) return <BookDetailsSkeleton />

  if (!book) {
    return (
      <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4">
        <p className="text-xl font-medium text-muted-foreground">
          Livro não encontrado
        </p>
        <Link to="/explore">
          <Button variant="outline">Voltar para Descoberta</Button>
        </Link>
      </div>
    )
  }

  function handleToggleBookshelf() {
    if (!book) return

    if (inBookshelf) {
      handleDeleteBookshelfBook(book.id)
      toast.success("Livro removido da sua estante")
      return
    }

    handleCreateBookshelfBook(book)
    toast.success("Livro adicionado à sua estante")
  }

  return (
    <div className="flex w-full flex-col gap-6 p-4 md:p-8">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/explore" className="hover:text-foreground transition-colors">
          Descoberta
        </Link>
        <HugeiconsIcon icon={ArrowRight01Icon} className="size-3" />
        <span className="font-medium text-foreground line-clamp-1">
          {book.title}
        </span>
      </nav>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="w-full shrink-0 lg:w-96">
          <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-muted shadow-2xl ring-1 ring-border">
            {book.thumbnailUrl ? (
              <img
                src={book.thumbnailUrl}
                alt={book.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-zinc-200 dark:bg-zinc-800">
                <span className="text-muted-foreground italic">Sem capa</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-8 py-2">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
              {book.title}
            </h1>
            <p className="text-2xl font-medium text-muted-foreground">
              {book.authors.join(", ") || "Autor desconhecido"}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button
              variant={inBookshelf ? "destructive" : "default"}
              size="lg"
              className="h-12 gap-2 px-8 text-base shadow-sm"
              onClick={handleToggleBookshelf}
            >
              <HugeiconsIcon
                icon={inBookshelf ? Cancel01Icon : Add01Icon}
                className="size-5"
              />
              {inBookshelf ? "Remover da estante" : "Adicionar à estante"}
            </Button>

            {book.previewLink && (
              <Button
                variant="outline"
                size="lg"
                className="h-12 gap-2 px-8 text-base"
                render={
                  <a
                    href={book.previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <HugeiconsIcon icon={BookOpen01Icon} className="size-5" />
                    Ler amostra
                  </a>
                }
              />
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 border-y border-border py-8 sm:grid-cols-2 xl:grid-cols-3">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                <HugeiconsIcon
                  icon={Building01Icon}
                  className="size-6 text-primary"
                />
              </div>
              <div>
                <p className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">
                  Editora
                </p>
                <p className="text-lg font-medium">
                  {book.publisher || "Não informada"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                <HugeiconsIcon
                  icon={Calendar03Icon}
                  className="size-6 text-primary"
                />
              </div>
              <div>
                <p className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">
                  Publicação
                </p>
                <p className="text-lg font-medium">
                  {book.publishedDate || "Data desconhecida"}
                </p>
              </div>
            </div>
            {book.pageCount && (
              <div className="flex items-center gap-4 text-sm">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                  <HugeiconsIcon
                    icon={GlobalIcon}
                    className="size-6 text-primary"
                  />
                </div>
                <div>
                  <p className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">
                    Páginas
                  </p>
                  <p className="text-lg font-medium">
                    {book.pageCount} páginas
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Sinopse</h2>
            <div
              className="prose prose-xl dark:prose-invert max-w-none text-muted-foreground leading-relaxed"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
              dangerouslySetInnerHTML={{
                __html: book.description || "Nenhuma sinopse disponível.",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
