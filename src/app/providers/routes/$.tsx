import { createFileRoute } from "@tanstack/react-router"
import { NotFound } from "@/pages/not-found/ui/not-found"

export const Route = createFileRoute("/$")({
  component: NotFound,
})
