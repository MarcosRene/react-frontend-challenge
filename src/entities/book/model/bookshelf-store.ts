import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Book } from "@/entities/book"

export const ITEMS_PER_PAGE = 10

export type BookStatus = "want-to-read" | "reading" | "completed"

export interface BookshelfBook extends Book {
  status: BookStatus
  addedAt: string
}

interface BookshelfState {
  books: Record<string, BookshelfBook>
  bookIds: string[]
  currentPage: number
  handleCreateBookshelfBook: (book: Book) => void
  handleDeleteBookshelfBook: (bookId: string) => void
  handleUpdateStatus: (bookId: string, status: BookStatus) => void
  isBookInBookshelf: (bookId: string) => boolean
  setPage: (page: number) => void
  handleNextPage: () => void
  handlePreviousPage: () => void
}

export const useBookshelfStore = create<BookshelfState>()(
  persist(
    (set, get) => ({
      books: {},
      bookIds: [],
      currentPage: 1,

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
          currentPage: 1,
        }))
      },

      handleDeleteBookshelfBook: (bookId) => {
        set((state) => {
          const { [bookId]: _, ...books } = state.books
          const bookIds = state.bookIds.filter((id) => id !== bookId)
          const totalPages = Math.max(
            1,
            Math.ceil(bookIds.length / ITEMS_PER_PAGE),
          )

          return {
            books,
            bookIds,
            currentPage: Math.min(state.currentPage, totalPages),
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

      setPage: (page) => {
        const totalPages = Math.max(
          1,
          Math.ceil(get().bookIds.length / ITEMS_PER_PAGE),
        )
        set({ currentPage: Math.min(Math.max(1, page), totalPages) })
      },

      handleNextPage: () => {
        get().setPage(get().currentPage + 1)
      },

      handlePreviousPage: () => {
        get().setPage(get().currentPage - 1)
      },
    }),
    {
      name: "bookshelf-storage",
    },
  ),
)
