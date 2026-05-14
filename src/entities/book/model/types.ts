export interface Book {
  id: string
  title: string
  authors: string[]
  description: string
  thumbnailUrl: string | null
  publishedDate: string
  publisher: string
}
