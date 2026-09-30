import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"
import { Bookshelf } from "@/pages/bookshelf/ui/bookshelf"

export const Route = createFileRoute("/_auth/_layout/bookshelf")({
  component: Bookshelf,
  validateSearch: z.object({
    q: z.string().optional(),
  }),
})
