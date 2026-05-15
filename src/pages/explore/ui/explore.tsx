import { BookOpen01Icon, Search01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Suspense, useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import {
  BookList,
  BookListSkeleton,
  orderOptions,
  printTypes,
} from "@/features/books"
import { useDebounce } from "@/shared/lib/hooks/use-debounce"
import { Button } from "@/shared/ui/button"
import { EmptyState } from "@/shared/ui/empty-state"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"

export function Explore() {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get("q") || ""

  const [search, setSearch] = useState(q)
  const [printType, setPrintType] = useState("all")
  const [orderBy, setOrderBy] = useState("relevance")

  const debouncedSearch = useDebounce(search, 500)
  const searchInputRef = useRef<HTMLInputElement>(null)

  function handleFocusSearch() {
    searchInputRef.current?.focus()
  }

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  function handlePrintTypeChange(value: string) {
    setPrintType(value)
  }

  function handleOrderByChange(value: string) {
    setOrderBy(value)
  }

  useEffect(() => {
    if (debouncedSearch) {
      setSearchParams({ q: debouncedSearch })
      return
    }
    setSearchParams({})
  }, [debouncedSearch, setSearchParams])

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col items-start gap-1">
          <h1 className="text-3xl font-bold">Descoberta</h1>
          <p className="text-muted-foreground">
            Encontre sua próxima leitura favorita
          </p>
        </div>

        <InputGroup className="w-full lg:w-80">
          <InputGroupAddon align="inline-start">
            <HugeiconsIcon icon={Search01Icon} className="size-4" />
          </InputGroupAddon>
          <InputGroupInput
            ref={searchInputRef}
            value={search}
            onChange={handleSearchChange}
            placeholder="Buscar livro..."
            className="text-sm"
          />
        </InputGroup>
      </div>

      <div className="flex-1">
        {!debouncedSearch ? (
          <EmptyState
            icon={<HugeiconsIcon icon={BookOpen01Icon} className="size-8" />}
            title="Sua jornada literária começa aqui"
            description="Pesquise por livros incríveis para adicioná-los à sua estante pessoal e acompanhar seu progresso de leitura."
            action={
              <Button onClick={handleFocusSearch} className="gap-2">
                <HugeiconsIcon icon={Search01Icon} className="size-4" />
                Começar busca
              </Button>
            }
          />
        ) : (
          <div className="w-full space-y-3">
            <div className="flex justify-end items-center gap-3">
              <Select
                items={printTypes}
                value={printType}
                onValueChange={handlePrintTypeChange}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {printTypes.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                items={orderOptions}
                value={orderBy}
                onValueChange={handleOrderByChange}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {orderOptions.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Suspense fallback={<BookListSkeleton />}>
              <BookList
                query={debouncedSearch}
                printType={printType}
                orderBy={orderBy}
                onFocusSearch={handleFocusSearch}
              />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  )
}
