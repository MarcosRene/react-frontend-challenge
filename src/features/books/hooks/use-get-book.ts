import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { mapGoogleBookToBook } from "@/entities/book"
import { api } from "@/shared/api/axios"
import type { GoogleBookItem } from "../model/types"

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
