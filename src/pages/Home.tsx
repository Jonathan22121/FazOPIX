import HeroSection from "@/components/hero/HeroSection"
import ProductGrid from "@/components/menu/ProductGrid"
import { useProducts } from "@/hooks/useProducts"


export default function Home() {
  const { items, loading, error } = useProducts()

  return (
    <>
      <HeroSection />
      

      <section className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
          <h2 className="text-3xl font-bold text-slate-900 text-center">
            Nosso Menu
          </h2>

          {/* Espaço entre o título e os cards */}
          <div className="mt-6">
            
            {loading && <p className="text-center py-8">Carregando produtos...</p>}
            {error && (
              <p className="text-center text-red-500 py-8">
                Erro ao carregar produtos 😢
              </p>
            )}

            {!loading && !error && <ProductGrid products={items} />}
          </div>
        </div>
      </section>


      
    </>
  )
}









