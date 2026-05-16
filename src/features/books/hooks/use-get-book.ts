import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import type { Book } from "@/entities/book"
import { api } from "@/shared/api/axios"
import type { GoogleBookItem } from "../model/types"

function mapGoogleBookToBook(item: GoogleBookItem): Book {
  return {
    id: item.id,
    title: item.volumeInfo?.title ?? "Título desconhecido",
    authors: item.volumeInfo?.authors ?? [],
    description: item.volumeInfo?.description ?? "",
    thumbnailUrl:
      item.volumeInfo?.imageLinks?.thumbnail?.replace("http://", "https://") ??
      null,
    publishedDate: item.volumeInfo?.publishedDate ?? "",
    publisher: item.volumeInfo?.publisher ?? "",
    previewLink: item.accessInfo?.webReaderLink ?? "",
    pageCount: item.volumeInfo?.pageCount,
    categories: item.volumeInfo?.categories,
  }
}

export function useGetBook(id: string | undefined) {
  return useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      if (!id) return null

      try {
        const response = await api.get<GoogleBookItem>(
          `/books/v1/volumes/${id}`,
        )

        return mapGoogleBookToBook(response.data)
      } catch (error) {
        toast.error("Erro ao carregar detalhes do livro")
        throw error
      }
    },
    enabled: !!id,
  })
}
