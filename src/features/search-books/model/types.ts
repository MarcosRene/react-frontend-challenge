export interface GoogleBookItem {
  id: string
  volumeInfo?: {
    title?: string
    authors?: string[]
    description?: string
    imageLinks?: {
      thumbnail?: string
    }
    publishedDate?: string
    publisher?: string
  }
}

export interface GoogleBooksResponse {
  items?: GoogleBookItem[]
  totalItems: number
}

export interface SearchBooksParams {
  query: string
  printType: string
  orderBy: string
}
