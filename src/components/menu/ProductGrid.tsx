// src/components/menu/ProductGrid.tsx
import type { Product } from "@/types/product"
import ProductCard from "./ProductCard"

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id ?? p.name} {...p} />
      ))}
    </div>
  )
}
