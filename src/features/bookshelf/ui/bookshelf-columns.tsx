import {
  ArrowUpDownIcon,
  Cancel01Icon,
  Delete01Icon,
  MoreVerticalIcon,
  ViewIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useNavigate } from "react-router-dom"
import type { ColumnDef } from "@tanstack/react-table"
import {
  type BookStatus,
  type BookshelfBook,
  useBookshelfStore,
} from "@/entities/book/model/bookshelf-store"
import { formatToBrazillianDate } from "@/shared/lib/date/format-to-brazillian-date"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/ui/alert-dialog"
import { Button } from "@/shared/ui/button"
import { Menu, MenuContent, MenuItem, MenuTrigger } from "@/shared/ui/menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import { useState } from "react"

const STATUS_LABELS: Record<BookStatus, string> = {
  "want-to-read": "Quero Ler",
  reading: "Lendo",
  completed: "Concluído",
}

export const bookshelfColumns: ColumnDef<BookshelfBook>[] = [
  // ... (capa, título, autores, publicação, status mantidos)
  {
    accessorKey: "thumbnailUrl",
    header: "Capa",
    cell: ({ row }) => {
      const title = row.getValue("title") as string
      const url = row.getValue("thumbnailUrl") as string | null

      return (
        <div className="size-12 overflow-hidden rounded bg-muted">
          {url ? (
            <img src={url} alt={title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-zinc-200 dark:bg-zinc-800">
              <span className="text-[10px] text-muted-foreground italic">
                N/A
              </span>
            </div>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      const isSorted = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(isSorted === "asc")}
          className="-ml-4 gap-2 border border-border px-3"
        >
          Título
          <HugeiconsIcon icon={ArrowUpDownIcon} className="size-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const title = row.getValue("title") as string
      return (
        <div
          className="min-w-[150px] sm:min-w-[200px] line-clamp-2 font-medium"
          title={title}
        >
          {title}
        </div>
      )
    },
  },
  {
    accessorKey: "authors",
    header: "Autor",
    cell: ({ row }) => {
      const authors =
        (row.getValue("authors") as string[]).join(", ") || "Autor desconhecido"
      return (
        <div
          className="min-w-40 sm:min-w-52 line-clamp-2 text-muted-foreground"
          title={authors}
        >
          {authors}
        </div>
      )
    },
  },
  {
    accessorKey: "publishedDate",
    header: "Publicação",
    cell: ({ row }) => {
      const date = row.getValue("publishedDate") as string
      return formatToBrazillianDate(date)
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      const isSorted = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(isSorted === "asc")}
          className="-ml-4 gap-2 border border-border px-3"
        >
          Status
          <HugeiconsIcon icon={ArrowUpDownIcon} className="size-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const bookId = row.original.id
      const status = row.getValue("status") as BookStatus
      const handleUpdateStatus = useBookshelfStore(
        (state) => state.handleUpdateStatus,
      )

      return (
        <Select
          value={status}
          onValueChange={(value) =>
            handleUpdateStatus(bookId, value as BookStatus)
          }
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue>{STATUS_LABELS[status]}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="want-to-read">Quero Ler</SelectItem>
            <SelectItem value="reading">Lendo</SelectItem>
            <SelectItem value="completed">Concluído</SelectItem>
          </SelectContent>
        </Select>
      )
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const bookId = row.original.id
      const title = row.original.title
      const navigate = useNavigate()
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
      const handleDeleteBookshelfBook = useBookshelfStore(
        (state) => state.handleDeleteBookshelfBook,
      )

      return (
        <>
          <Menu>
            <MenuTrigger>
              <Button variant="ghost" size="icon">
                <HugeiconsIcon icon={MoreVerticalIcon} className="size-4" />
              </Button>
            </MenuTrigger>
            <MenuContent align="end">
              <MenuItem onClick={() => navigate(`/book/${bookId}`)}>
                <HugeiconsIcon icon={ViewIcon} />
                Ver detalhes
              </MenuItem>
              <MenuItem
                variant="destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <HugeiconsIcon icon={Delete01Icon} />
                Remover
              </MenuItem>
            </MenuContent>
          </Menu>

          <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <AlertDialogContent className="max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle>Remover da estante?</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja remover o livro{" "}
                  <span className="font-semibold">{title}</span> da sua estante?
                  Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="gap-2">
                  <HugeiconsIcon icon={Cancel01Icon} className="size-4" />
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDeleteBookshelfBook(bookId)}
                  className="gap-2 bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  <HugeiconsIcon icon={Delete01Icon} className="size-4" />
                  Remover
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )
    },
  },
]
