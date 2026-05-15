import { Book02Icon, Search01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useNavigate } from "react-router-dom"
import { useBookshelfStore } from "@/entities/book/model/bookshelf-store"
import { bookshelfColumns } from "@/features/bookshelf/ui/bookshelf-columns"
import { Button } from "@/shared/ui/button"
import { DataTable } from "@/shared/ui/data-table"
import { EmptyState } from "@/shared/ui/empty-state"

export function Bookshelf() {
  const books = useBookshelfStore((state) => state.books)
  const bookIds = useBookshelfStore((state) => state.bookIds)
  const navigate = useNavigate()

  const bookshelfData = bookIds.map((id) => books[id])

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col items-start gap-1">
        <h1 className="text-3xl font-bold">Minha Estante</h1>
        <p className="text-muted-foreground">
          Gerencie suas leituras e acompanhe seu progresso
        </p>
      </div>

      <DataTable
        columns={bookshelfColumns}
        data={bookshelfData}
        emptyState={
          <div className="py-12">
            <EmptyState
              icon={<HugeiconsIcon icon={Book02Icon} className="size-12" />}
              title="Sua estante está vazia"
              description="Você ainda não adicionou nenhum livro à sua estante pessoal. Explore nossa biblioteca para encontrar sua próxima leitura."
              action={
                <Button onClick={() => navigate("/explore")} className="gap-2">
                  <HugeiconsIcon icon={Search01Icon} className="size-4" />
                  Explorar livros
                </Button>
              }
            />
          </div>
        }
      />
    </div>
  )
}
