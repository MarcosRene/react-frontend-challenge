import { act, renderHook } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"
import type { Book } from "@/entities/book"
import { useBookshelfStore } from "./bookshelf-store"

const mockBook: Book = {
  id: "1",
  title: "Clean Code: A Handbook of Agile Software Craftsmanship",
  authors: ["Robert C. Martin"],
  description: "Even bad code can function.",
  thumbnailUrl: "http://books.google.com/books/content?id=1",
  publishedDate: "2008",
  publisher: "Prentice Hall",
}

beforeEach(() => {
  act(() => {
    useBookshelfStore.setState({
      books: {},
      bookIds: [],
    })
  })
})

describe("useBookshelfStore", () => {
  it("deve iniciar com uma lista vazia", () => {
    const { result } = renderHook(() => useBookshelfStore())
    expect(result.current.books).toEqual({})
    expect(result.current.bookIds).toEqual([])
  })

  it("deve adicionar um livro à estante", () => {
    const { result } = renderHook(() => useBookshelfStore())

    act(() => {
      result.current.handleCreateBookshelfBook(mockBook)
    })

    expect(result.current.isBookInBookshelf(mockBook.id)).toBe(true)
    expect(result.current.bookIds).toContain(mockBook.id)
    expect(result.current.books[mockBook.id]).toMatchObject({
      ...mockBook,
      status: "want-to-read",
    })
    expect(result.current.books[mockBook.id].addedAt).toBeDefined()
  })

  it("não deve adicionar um livro se ele já estiver na estante", () => {
    const { result } = renderHook(() => useBookshelfStore())

    act(() => {
      result.current.handleCreateBookshelfBook(mockBook)
    })

    const addedAtBefore = result.current.books[mockBook.id].addedAt

    act(() => {
      result.current.handleCreateBookshelfBook(mockBook)
    })

    expect(result.current.bookIds.length).toBe(1)
    expect(result.current.books[mockBook.id].addedAt).toBe(addedAtBefore)
  })

  it("deve remover um livro da estante", () => {
    const { result } = renderHook(() => useBookshelfStore())

    act(() => {
      result.current.handleCreateBookshelfBook(mockBook)
    })

    expect(result.current.isBookInBookshelf(mockBook.id)).toBe(true)

    act(() => {
      result.current.handleDeleteBookshelfBook(mockBook.id)
    })

    expect(result.current.isBookInBookshelf(mockBook.id)).toBe(false)
    expect(result.current.bookIds).not.toContain(mockBook.id)
    expect(result.current.books[mockBook.id]).toBeUndefined()
  })

  it("deve atualizar o status de um livro", () => {
    const { result } = renderHook(() => useBookshelfStore())

    act(() => {
      result.current.handleCreateBookshelfBook(mockBook)
    })

    expect(result.current.books[mockBook.id].status).toBe("want-to-read")

    act(() => {
      result.current.handleUpdateStatus(mockBook.id, "reading")
    })

    expect(result.current.books[mockBook.id].status).toBe("reading")

    act(() => {
      result.current.handleUpdateStatus(mockBook.id, "completed")
    })

    expect(result.current.books[mockBook.id].status).toBe("completed")
  })

  it("não deve atualizar o status se o livro não existir", () => {
    const { result } = renderHook(() => useBookshelfStore())

    act(() => {
      result.current.handleUpdateStatus("non-existent-id", "reading")
    })

    expect(result.current.books).toEqual({})
  })

  it("deve retornar true se o livro estiver na estante e false caso contrário", () => {
    const { result } = renderHook(() => useBookshelfStore())

    expect(result.current.isBookInBookshelf(mockBook.id)).toBe(false)

    act(() => {
      result.current.handleCreateBookshelfBook(mockBook)
    })

    expect(result.current.isBookInBookshelf(mockBook.id)).toBe(true)
  })

  it("deve listar os livros na ordem inversa de adição (mais recentes primeiro)", () => {
    const { result } = renderHook(() => useBookshelfStore())

    const book2: Book = { ...mockBook, id: "2", title: "Book 2" }

    act(() => {
      result.current.handleCreateBookshelfBook(mockBook)
      result.current.handleCreateBookshelfBook(book2)
    })

    expect(result.current.bookIds).toEqual(["2", "1"])
  })
})
