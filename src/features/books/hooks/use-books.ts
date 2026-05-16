import { useSuspenseInfiniteQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import type { Book } from "@/entities/book"
import { api } from "@/shared/api/axios"
import type {
  GoogleBookItem,
  GoogleBooksResponse,
  SearchBooksParams,
} from "../model/types"

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

export function useBooks({ query, printType, orderBy }: SearchBooksParams) {
  return useSuspenseInfiniteQuery({
    queryKey: ["books", query, printType, orderBy],
    queryFn: async ({ pageParam = 0 }) => {
      if (!query) return { items: [], totalItems: 0 }

      try {
        const response = await api.get<GoogleBooksResponse>(
          "/books/v1/volumes",
          {
            params: {
              q: query,
              startIndex: pageParam,
              maxResults: 20,
              printType,
              orderBy,
            },
          },
        )

        const data = response.data

        return {
          totalItems: data.totalItems,
          items: (data.items || []).map(mapGoogleBookToBook),
        }
      } catch (error) {
        toast.error("Erro ao buscar livros")
        throw error
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const currentCount = allPages.reduce(
        (acc, page) => acc + (page.items?.length || 0),
        0,
      )
      return lastPage.items && lastPage.items.length > 0
        ? currentCount
        : undefined
    },
  })
}
