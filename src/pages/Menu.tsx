// src/pages/Menu.tsx
import { useMemo, useState } from "react"
import { useProducts } from "@/hooks/useProducts"
import SearchBar from "@/components/menu/SearchBar"
import CategoryTabs, { type CategoryFilter } from "@/components/menu/CategoryTabs"
import ProductGrid from "@/components/menu/ProductGrid"

export default function Menu() {
  const { items, loading, error } = useProducts()
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<CategoryFilter>("all")

  const norm = (s: string) =>
    s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")

  const filtered = useMemo(() => {
    const q = norm(query)
    return items.filter((p) => {
      const inCategory = category === "all" || p.category === category
      const inSearch = norm(p.name).includes(q) || norm(p.description).includes(q)
      return inCategory && inSearch
    })
  }, [items, query, category])

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-dark">
          Nosso Cardápio 🍕
        </h1>

        <div className="w-full md:w-96">
          <SearchBar
            value={query}
            placeholder="Buscar por nome ou descrição…"
            onChange={setQuery}
          />
        </div>
      </div>

      <CategoryTabs value={category} onChange={setCategory} />

      <div className="mt-8">
        {loading && (
          <div className="text-gray-500">Carregando produtos…</div>
        )}

        {!loading && error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
            {error}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center text-gray-500 italic mt-8">
            Nenhum produto encontrado 😔
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <ProductGrid products={filtered} />
        )}
      </div>
    </section>
  )
}
