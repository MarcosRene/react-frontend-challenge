import { Home01Icon, Search01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useNavigate } from "@tanstack/react-router"
import { Button } from "@/shared/ui/button"

export function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-8 text-center">
      <div className="relative mb-8">
        <div className="animate-bounce">
          <HugeiconsIcon
            icon={Search01Icon}
            className="size-24 text-primary opacity-20"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-8xl font-black tracking-tighter text-primary">
            404
          </span>
        </div>
      </div>

      <h1 className="mb-2 text-3xl font-bold">Página não encontrada</h1>
      <p className="mb-8 max-w-md text-muted-foreground">
        Parece que o livro que você está procurando foi movido para uma estante
        que não existe ou nunca foi escrito.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button
          size="lg"
          className="gap-2"
          onClick={() => navigate({ to: "/explore" })}
        >
          <HugeiconsIcon icon={Home01Icon} className="size-4" />
          Voltar para Descoberta
        </Button>
      </div>
    </div>
  )
}
