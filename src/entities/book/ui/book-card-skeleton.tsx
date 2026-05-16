import { Skeleton } from "@/shared/ui/skeleton"

export function BookCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-muted/30 p-3 dark:bg-muted/10">
      <Skeleton className="aspect-[3/4] w-full rounded-lg" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-9 w-full" />
    </div>
  )
}
