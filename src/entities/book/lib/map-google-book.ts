import type { GoogleBookItem } from "@/features/books/model/types"
import type { Book } from "../model/types"

export function mapGoogleBookToBook(item: GoogleBookItem): Book {
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
