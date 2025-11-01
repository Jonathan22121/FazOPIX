// src/pages/admin/AdminProducts.tsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, deleteProduct } from "@/services/products";
import type { Product } from "@/types/product";

/** 
 * Normaliza a URL de imagem para exibição:
 * - Se já for um DataURL (data:image...), retorna como está;
 * - Se parecer base64 “cru”, adiciona o prefixo padrão PNG;
 * - Caso contrário, retorna a string original (http/https/blob).
 */
function normalizeImageUrl(url?: string): string {
  if (!url) return "";
  if (url.startsWith("data:image")) return url;
  // Base64 cru (apenas A–Z a–z 0–9 + / = e quebras)
  const maybeRawBase64 = /^[A-Za-z0-9+/=\r\n]+$/.test(url);
  if (maybeRawBase64) return `data:image/png;base64,${url}`;
  return url;
}

export default function AdminProducts() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");

  const currency = useMemo(
    () =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      }),
    []
  );

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts();
      setItems(data);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erro ao carregar produtos.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onDelete(id: number | string) {
    const ok = confirm("Tem certeza que deseja excluir este produto?");
    if (!ok) return;
    try {
      await deleteProduct(id);
      setItems((prev) => prev.filter((p) => String(p.id) !== String(id)));
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erro ao excluir.";
      alert(msg);
    }
  }

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return items;
    return items.filter((p) => {
      const name = (p.name ?? "").toLowerCase();
      const desc = (p.description ?? "").toLowerCase();
      return name.includes(t) || desc.includes(t);
    });
  }, [items, q]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Produtos</h1>

        <div className="flex gap-2">
          <button
            onClick={load}
            disabled={loading}
            className="rounded-md border px-3 py-1.5 text-sm hover:bg-slate-100 disabled:opacity-50"
            aria-busy={loading}
          >
            {loading ? "Atualizando…" : "Atualizar"}
          </button>

          <Link
            to="/admin/novo"
            className="rounded-md bg-slate-900 text-white px-3 py-1.5 text-sm hover:bg-slate-800"
          >
            + Adicionar
          </Link>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm p-3">
        <label className="sr-only" htmlFor="busca-produtos">
          Buscar produtos
        </label>
        <input
          id="busca-produtos"
          name="busca-produtos"
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nome ou descrição…"
          className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          autoComplete="off"
        />
      </div>

      {error && (
        <div
          className="rounded-md border border-red-200 bg-red-50 p-3 text-red-700"
          role="alert"
        >
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
        <table className="min-w-[760px] w-full">
          <thead className="bg-slate-50">
            <tr className="text-left text-sm text-slate-600">
              <th className="px-4 py-3">Imagem</th>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Descrição</th>
              <th className="px-4 py-3">Preço</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td className="px-4 py-6 text-slate-500" colSpan={5}>
                  Carregando…
                </td>
              </tr>
            )}

            {!loading && filtered.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-slate-500" colSpan={5}>
                  Nenhum produto encontrado.
                </td>
              </tr>
            )}

            {!loading &&
              filtered.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-3">
                    <div className="h-12 w-12 overflow-hidden rounded-md border bg-slate-50">
                      {p.imgUrl ? (
                        <img
                          src={normalizeImageUrl(p.imgUrl)}
                          alt={p.name ?? "Produto"}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            // evita loop de erro
                            const img = e.currentTarget;
                            img.onerror = null;
                            img.src =
                              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjZjJmMmYyIiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHJ4PSI4Ii8+PHBhdGggZD0iTTI5LjUgMTYuNUMyOC4xIDQ0IDkuOSA0NCA4LjUgMTYuNSIgZmlsbD0iI2Q1ZDVkNSIvPjwvc3ZnPg==";
                          }}
                        />
                      ) : (
                        <div className="grid h-full w-full place-items-center text-xs text-slate-400">
                          sem img
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-3 font-medium">{p.name}</td>

                  <td className="px-4 py-3 text-slate-600 line-clamp-2">
                    {p.description}
                  </td>

                  <td className="px-4 py-3 tabular-nums">
                    {typeof p.price === "number"
                      ? currency.format(p.price)
                      : (() => {
                          const n = Number(
                            String(p.price ?? "").replace(",", ".")
                          );
                          return Number.isFinite(n) ? currency.format(n) : p.price;
                        })()}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/produtos/${p.id}/editar`}
                        className="rounded-md border px-3 py-1.5 text-sm hover:bg-slate-100"
                      >
                        Editar
                      </Link>

                      <button
                        onClick={() => onDelete(p.id!)}
                        className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
