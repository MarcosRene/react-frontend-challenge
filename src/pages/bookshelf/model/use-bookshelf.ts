import { useNavigate, useSearch } from "@tanstack/react-router"
import { type ChangeEvent, useEffect, useMemo, useState } from "react"
import {
  ITEMS_PER_PAGE,
  useBookshelfStore,
} from "@/entities/book/model/bookshelf-store"
import { useDebounce } from "@/shared/lib/hooks/use-debounce"
import { getPageNumbers } from "@/shared/lib/pagination/get-page-numbers"

export function useBookshelf() {
  const books = useBookshelfStore((state) => state.books)
  const bookIds = useBookshelfStore((state) => state.bookIds)
  const currentPage = useBookshelfStore((state) => state.currentPage)
  const setPage = useBookshelfStore((state) => state.setPage)
  const handleNextPage = useBookshelfStore((state) => state.handleNextPage)
  const handlePreviousPage = useBookshelfStore(
    (state) => state.handlePreviousPage,
  )

  const searchParams = useSearch({ from: "/_auth/_layout/bookshelf" })
  const navigate = useNavigate({ from: "/bookshelf" })

  const [search, setSearch] = useState(searchParams.q ?? "")
  const debouncedSearch = useDebounce(search, 500)

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  useEffect(() => {
    setPage(1)

    if (debouncedSearch) {
      navigate({
        search: (prevSearchParams) => ({
          ...prevSearchParams,
          q: debouncedSearch,
        }),
        replace: true,
      })
      return
    }

    navigate({
      search: (prevSearchParams) => {
        const { q: _, ...rest } = prevSearchParams
        return rest
      },
      replace: true,
    })
  }, [debouncedSearch, navigate, setPage])

  const bookshelfs = useMemo<string[]>(() => {
    return debouncedSearch
      ? bookIds.filter((id) => {
          const book = books[id]
          const q = debouncedSearch.toLowerCase()
          return (
            book.title.toLowerCase().includes(q) ||
            book.authors.some((author) => author.toLowerCase().includes(q))
          )
        })
      : bookIds
  }, [debouncedSearch, books, bookIds])

  const totalPages = Math.max(1, Math.ceil(bookshelfs.length / ITEMS_PER_PAGE))
  const start = (currentPage - 1) * ITEMS_PER_PAGE

  const bookshelfData = bookshelfs
    .slice(start, start + ITEMS_PER_PAGE)
    .map((id) => books[id])

  const pageNumbers = getPageNumbers(currentPage, totalPages)

  return {
    search,
    debouncedSearch,
    bookshelfData,
    bookshelfCount: bookshelfs.length,
    currentPage,
    totalPages,
    pageNumbers,
    setPage,
    handleSearchChange,
    handleNextPage,
    handlePreviousPage,
  }
}
