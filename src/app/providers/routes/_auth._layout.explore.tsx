import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"
import { Explore } from "@/pages/explore/ui/explore"

export const Route = createFileRoute("/_auth/_layout/explore")({
  component: Explore,
  validateSearch: z.object({
    q: z.string().optional(),
    printType: z.string().optional(),
    orderBy: z.string().optional(),
  }),
})
