export interface GoogleBookItem {
  id: string
  volumeInfo?: {
    title?: string
    authors?: string[]
    description?: string
    imageLinks?: {
      thumbnail?: string
      smallThumbnail?: string
      small?: string
      medium?: string
      large?: string
    }
    publishedDate?: string
    publisher?: string
    previewLink?: string
    pageCount?: number
    categories?: string[]
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
