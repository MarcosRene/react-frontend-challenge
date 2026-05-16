/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { Book02Icon, Search01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useNavigate } from "@tanstack/react-router"
import { ITEMS_PER_PAGE } from "@/entities/book/model/bookshelf-store"
import { bookshelfColumns } from "@/features/bookshelf/ui/bookshelf-columns"
import { useBookshelf } from "@/pages/bookshelf/model/use-bookshelf"
import { Button } from "@/shared/ui/button"
import { DataTable } from "@/shared/ui/data-table"
import { EmptyState } from "@/shared/ui/empty-state"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/ui/input-group"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/pagination"

export function Bookshelf() {
  const {
    search,
    debouncedSearch,
    bookshelfData,
    bookshelfCount,
    currentPage,
    totalPages,
    pageNumbers,
    handleSearchChange,
    setPage,
    handleNextPage,
    handlePreviousPage,
  } = useBookshelf()

  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col items-start gap-1">
          <h1 className="text-3xl font-bold">Minha Estante</h1>
          <p className="text-muted-foreground">
            Gerencie suas leituras e acompanhe seu progresso
          </p>
        </div>

        <InputGroup className="w-full lg:w-80">
          <InputGroupAddon align="inline-start">
            <HugeiconsIcon icon={Search01Icon} className="size-4" />
          </InputGroupAddon>
          <InputGroupInput
            value={search}
            onChange={handleSearchChange}
            placeholder="Buscar na estante..."
            className="text-sm"
          />
        </InputGroup>
      </div>

      <DataTable
        columns={bookshelfColumns}
        data={bookshelfData}
        emptyState={
          <div className="py-12">
            <EmptyState
              icon={<HugeiconsIcon icon={Book02Icon} className="size-8" />}
              title={
                debouncedSearch
                  ? "Nenhum livro encontrado"
                  : "Sua estante está vazia"
              }
              description={
                debouncedSearch
                  ? `Nenhum livro corresponde a "${debouncedSearch}".`
                  : "Você ainda não adicionou nenhum livro à sua estante pessoal. Explore nossa biblioteca para encontrar sua próxima leitura."
              }
              action={
                !debouncedSearch && (
                  <Button
                    onClick={() => navigate({ to: "/explore" })}
                    className="gap-2"
                  >
                    <HugeiconsIcon icon={Search01Icon} className="size-4" />
                    Explorar livros
                  </Button>
                )
              }
            />
          </div>
        }
      />

      {bookshelfCount > ITEMS_PER_PAGE && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              />
            </PaginationItem>

            {pageNumbers.map((page, index) =>
              page === "ellipsis" ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={page === currentPage}
                    onClick={() => setPage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}

            <PaginationItem>
              <PaginationNext
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
