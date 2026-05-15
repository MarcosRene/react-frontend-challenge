import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Book } from "@/entities/book"

export type BookStatus = "want-to-read" | "reading" | "completed"

export interface BookshelfBook extends Book {
  status: BookStatus
  addedAt: string
}

interface BookshelfState {
  books: Record<string, BookshelfBook>
  bookIds: string[]
  handleCreateBookshelfBook: (book: Book) => void
  handleDeleteBookshelfBook: (bookId: string) => void
  handleUpdateStatus: (bookId: string, status: BookStatus) => void
  isBookInBookshelf: (bookId: string) => boolean
}

export const useBookshelfStore = create<BookshelfState>()(
  persist(
    (set, get) => ({
      books: {},
      bookIds: [],
      handleCreateBookshelfBook: (book) => {
        const currentBook = !!get().books[book.id]
        if (currentBook) return

        const newBook: BookshelfBook = {
          ...book,
          status: "want-to-read",
          addedAt: new Date().toISOString(),
        }

        set((state) => ({
          books: { ...state.books, [book.id]: newBook },
          bookIds: [book.id, ...state.bookIds],
        }))
      },
      handleDeleteBookshelfBook: (bookId) => {
        set((state) => {
          const { [bookId]: _, ...books } = state.books
          return {
            books,
            bookIds: state.bookIds.filter((id) => id !== bookId),
          }
        })
      },
      handleUpdateStatus: (bookId, status) => {
        set((state) => {
          const book = state.books[bookId]
          if (!book) return state

          return {
            books: {
              ...state.books,
              [bookId]: { ...book, status },
            },
          }
        })
      },
      isBookInBookshelf: (bookId) => {
        return !!get().books[bookId]
      },
    }),
    {
      name: "bookshelf-storage",
    },
  ),
)
