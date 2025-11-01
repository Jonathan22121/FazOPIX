// src/components/menu/ProductCard.tsx
import type { Product } from "@/types/product";

const FALLBACK_IMG = "/img/fallback.jpg"; // coloque uma imagem local no public/img

export default function ProductCard(p: Product) {
  return (
    <div
      className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 md:p-5
             transition-all duration-300 ease-out
             hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1
             hover:border-emerald-300 hover:shadow-emerald-100"
    >
      <div className="aspect-[16/9] overflow-hidden rounded-t-2xl bg-slate-50">
        {p.imgUrl && (
          <img
            src={p.imgUrl}
            alt={p.name}
            loading="lazy"
            className="w-full h-48 object-contain rounded-md bg-white/50 p-2"
            onError={(e) => {
              e.currentTarget.src = FALLBACK_IMG;
            }}
          />
        )}
      </div>

      <div className="p-4 space-y-2">
       <h3 className="font-semibold text-lg text-slate-900 mt-3">{p.name}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
          {p.description}
        </p>

        <div className="flex items-center justify-between pt-3">
          <span className="font-bold text-emerald-600">
            {typeof p.price === "number" ? `R$ ${p.price.toFixed(2)}` : p.price}
          </span>

          <a
            href={`https://wa.me/5599999999999?text=${encodeURIComponent(
              `Olá! Quero ${p.name} por ${p.price}`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm px-3 py-1.5 rounded-md bg-emerald-600 text-white hover:bg-emerald-500 transition"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
