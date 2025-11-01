// src/hooks/useProducts.ts
import { useCallback, useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { fetchProducts } from "@/services/products";

/**
 * Hook para carregar e gerenciar a lista de produtos.
 * - Evita setState após unmount usando AbortController.
 * - Trata AbortError silenciosamente.
 * - Expõe `refresh()` para recarregar manualmente.
 */
export function useProducts() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts(signal);
      setItems(data);
    } catch (err: unknown) {
      // Ignora cancelamentos
      if (err instanceof DOMException && err.name === "AbortError") return;
      const message =
        err instanceof Error ? err.message : "Erro ao carregar produtos";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const ctrl = new AbortController();
    load(ctrl.signal);
    return () => ctrl.abort();
  }, [load]);

  // Recarrega sem precisar passar signal (uso pontual)
  const refresh = useCallback(() => load(), [load]);

  return { items, loading, error, setItems, refresh };
}
