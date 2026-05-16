/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { BookCardSkeleton } from "@/entities/book/ui/book-card-skeleton"

export function BookListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {Array.from({ length: 12 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <BookCardSkeleton key={i} />
      ))}
    </div>
  )
}
