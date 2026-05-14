import { screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import type { GoogleBooksResponse } from "@/features/search-books/model/types"
import { Explore } from "@/pages/explore/ui/explore"
import { api } from "@/shared/api/axios"
import { renderWithProviders } from "@/shared/test/render"

vi.mock("@/shared/api/axios", () => ({
  api: {
    get: vi.fn(),
  },
  API_KEY: "test-key",
}))

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null
  readonly rootMargin: string = ""
  readonly scrollMargin: string = ""
  readonly thresholds: readonly number[] = []

  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()

  static lastInstance: MockIntersectionObserver
  callback: IntersectionObserverCallback

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
    MockIntersectionObserver.lastInstance = this
  }

  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}

window.IntersectionObserver =
  MockIntersectionObserver as typeof IntersectionObserver

describe("Explore Page", () => {
  const mockBooks: GoogleBooksResponse = {
    totalItems: 2,
    items: [
      {
        id: "1",
        volumeInfo: {
          title: "Clean Code: A Handbook of Agile Software Craftsmanship",
          authors: ["Robert C. Martin"],
          imageLinks: {
            thumbnail: "http://books.google.com/books/content?id=1",
          },
          description: "Even bad code can function.",
          publishedDate: "2008",
        },
      },
      {
        id: "2",
        volumeInfo: {
          title: "The Pragmatic Programmer: Your Journey To Mastery",
          authors: ["Andrew Hunt", "David Thomas"],
          imageLinks: {
            thumbnail: "http://books.google.com/books/content?id=2",
          },
          description: "One of the most significant books.",
          publishedDate: "1999",
        },
      },
    ],
  }

  it("deve verificar se existe um item", async () => {
    const user = userEvent.setup()
    vi.mocked(api.get).mockResolvedValueOnce({ data: mockBooks })

    renderWithProviders(<Explore />)

    const input = screen.getByPlaceholderText(/buscar livro/i)
    await user.type(input, "Clean Code")

    expect(
      await screen.findByText(
        "Clean Code: A Handbook of Agile Software Craftsmanship",
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText("The Pragmatic Programmer: Your Journey To Mastery"),
    ).toBeInTheDocument()
  })

  it("deve verificar se não existe nenhum item", async () => {
    const user = userEvent.setup()
    vi.mocked(api.get).mockResolvedValueOnce({
      data: { totalItems: 0, items: [] } as GoogleBooksResponse,
    })

    renderWithProviders(<Explore />)

    const input = screen.getByPlaceholderText(/buscar livro/i)
    await user.type(input, "LivroInexistente")

    expect(
      await screen.findByText(/nenhum livro encontrado/i),
    ).toBeInTheDocument()
  })

  it("deve verificar a busca por um item", async () => {
    const user = userEvent.setup()
    vi.mocked(api.get).mockResolvedValue({ data: mockBooks })

    renderWithProviders(<Explore />)

    const input = screen.getByPlaceholderText(/buscar livro/i)
    await user.type(input, "Refactoring")

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(
        expect.stringContaining("/books/v1/volumes"),
        expect.objectContaining({
          params: expect.objectContaining({ q: "Refactoring" }),
        }),
      )
    })
  })

  it("deve filtrar por printType", async () => {
    const user = userEvent.setup()
    vi.mocked(api.get).mockResolvedValue({ data: mockBooks })

    renderWithProviders(<Explore />)

    const input = screen.getByPlaceholderText(/buscar livro/i)
    await user.type(input, "Typescript")

    const [printTypeSelect] = await screen.findAllByRole("combobox")

    await user.click(printTypeSelect)
    const option = await screen.findByRole("option", { name: /livros/i })
    await user.click(option)

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          params: expect.objectContaining({
            printType: "books",
          }),
        }),
      )
    })

    expect(
      screen.getByText(
        "Clean Code: A Handbook of Agile Software Craftsmanship",
      ),
    ).toBeInTheDocument()
  })

  it("deve filtrar por orderBy", async () => {
    const user = userEvent.setup()
    vi.mocked(api.get).mockResolvedValue({ data: mockBooks })

    renderWithProviders(<Explore />)

    const input = screen.getByPlaceholderText(/buscar livro/i)
    await user.type(input, "Typescript")

    const [, orderBySelect] = await screen.findAllByRole("combobox")

    await user.click(orderBySelect)
    const option = await screen.findByRole("option", { name: /mais recentes/i })
    await user.click(option)

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          params: expect.objectContaining({
            orderBy: "newest",
          }),
        }),
      )
    })

    expect(
      screen.getByText("The Pragmatic Programmer: Your Journey To Mastery"),
    ).toBeInTheDocument()
  })

  it("deve realizar paginação (carregando mais livros)", async () => {
    const user = userEvent.setup()

    vi.mocked(api.get).mockResolvedValueOnce({ data: mockBooks })

    const secondPageBooks: GoogleBooksResponse = {
      totalItems: 4,
      items: [
        {
          id: "3",
          volumeInfo: {
            title:
              "Design Patterns: Elements of Reusable Object-Oriented Software",
            authors: ["Erich Gamma"],
          },
        },
      ],
    }
    vi.mocked(api.get).mockResolvedValueOnce({ data: secondPageBooks })

    renderWithProviders(<Explore />)

    const input = screen.getByPlaceholderText(/buscar livro/i)
    await user.type(input, "Design Patterns")

    expect(
      await screen.findByText(
        "Clean Code: A Handbook of Agile Software Craftsmanship",
      ),
    ).toBeInTheDocument()

    const observerInstance = MockIntersectionObserver.lastInstance
    const observerCallback = observerInstance.callback

    const mockEntry = { isIntersecting: true } as IntersectionObserverEntry

    await waitFor(() => {
      observerCallback([mockEntry], observerInstance)
    })

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          params: expect.objectContaining({ startIndex: 2 }),
        }),
      )
    })
  })
})
