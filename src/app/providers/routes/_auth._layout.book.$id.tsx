import { createFileRoute } from "@tanstack/react-router"
import { BookDetails } from "@/pages/book-details/ui/book-details"

export const Route = createFileRoute("/_auth/_layout/book/$id")({
  component: BookDetails,
})
