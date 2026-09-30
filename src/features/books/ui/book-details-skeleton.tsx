import { Skeleton } from "@/shared/ui/skeleton"

export function BookDetailsSkeleton() {
  return (
    <div className="flex w-full flex-col gap-6 p-4 md:p-8">
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-3 w-3" />
        <Skeleton className="h-4 w-40" />
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="w-full shrink-0 lg:w-96">
          <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
        </div>
        <div className="flex flex-1 flex-col gap-8 py-2">
          <div className="space-y-4">
            <Skeleton className="h-14 w-3/4 md:h-20" />
            <Skeleton className="h-8 w-1/3" />
          </div>

          <div className="flex flex-wrap gap-4">
            <Skeleton className="h-12 w-56" />
            <Skeleton className="h-12 w-40" />
          </div>

          <div className="grid grid-cols-1 gap-6 border-y border-border py-8 sm:grid-cols-2 xl:grid-cols-3">
            <div className="flex items-center gap-4">
              <Skeleton className="size-12 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-6 w-32" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="size-12 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-6 w-32" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="size-12 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-6 w-32" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Skeleton className="h-10 w-32" />
            <div className="space-y-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-[90%]" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-[85%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
