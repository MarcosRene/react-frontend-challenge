import { BookCardSkeleton } from "@/entities/book"

export function BookListSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: 12 }).map((_, i) => (
        <BookCardSkeleton key={i} />
      ))}
    </div>
  )
}
