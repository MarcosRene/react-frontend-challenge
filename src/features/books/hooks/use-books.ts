import { useSuspenseInfiniteQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { mapGoogleBookToBook } from "@/entities/book"
import { api } from "@/shared/api/axios"
import type { GoogleBooksResponse, SearchBooksParams } from "../model/types"

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
      const pageSize = 20
      const totalItems = Math.max(lastPage.totalItems, pageSize)

      return lastPage.items &&
        lastPage.items.length > 0 &&
        currentCount < totalItems
        ? currentCount
        : undefined
    },
  })
}
