// src/pages/admin/AdminEditProduct.tsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { updateProductPartial } from "@/services/products";
import { fileToBase64 } from "@/utils/fileToBase64"; // <- mantenha só esta

export default function AdminEditProduct() {
  const { id: paramId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { items, loading, error } = useProducts();

  // produto atual
  const current = useMemo(
    () => items.find((p) => String(p.id) === String(paramId)),
    [items, paramId]
  );

  // estados do formulário
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(""); // string para não brigar com vírgula/ponto
  const [pickedBase64, setPickedBase64] = useState<string | undefined>(); // nova imagem escolhida

  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // carrega valores iniciais quando o produto chega
  useEffect(() => {
    if (!current) return;
    setName(current.name ?? "");
    setDescription(current.description ?? "");
    setPrice(String(current.price ?? ""));
    // IMPORTANTE: não tentar converter current.imgUrl para base64
  }, [current]);

  // escolhe nova imagem
  async function onPickFile(file: File | null) {
    if (!file) {
      setPickedBase64(undefined);
      return;
    }
    const b64 = await fileToBase64(file); // dataURL
    setPickedBase64(b64);
  }

  // envia APENAS o que mudou (PUT /updatepartsofproducts)
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!current || !paramId) return;

    try {
      setSaving(true);
      setMsg(null);

      const nameTrim = name.trim();
      const descTrim = description.trim();
      const priceTrim = String(price).trim();

      const payload: {
        id: number | string;
        name?: string;
        description?: string;
        price?: string;
        imgBase64?: string;
      } = { id: current.id! };

      if (nameTrim !== (current.name ?? "")) payload.name = nameTrim;
      if (descTrim !== (current.description ?? "")) payload.description = descTrim;
      if (priceTrim !== String(current.price ?? "")) payload.price = priceTrim;

      // Só envia imagem se o usuário escolheu uma nova
      if (pickedBase64) {
        payload.imgBase64 = pickedBase64;
      }

      if (
        payload.name === undefined &&
        payload.description === undefined &&
        payload.price === undefined &&
        payload.imgBase64 === undefined
      ) {
        setMsg("Nada para atualizar.");
        return;
      }

      await updateProductPartial(payload);
      setMsg("✅ Produto atualizado com sucesso!");
      // opcional: navigate("/admin/produtos");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao atualizar.";
      setMsg(`❌ ${message}`);
    } finally {
      setSaving(false);
    }
  }

  /* ========================= GUARDS ========================= */

  if (!paramId) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="rounded-2xl bg-white/90 p-6 shadow">
          <p className="text-red-700">ID inválido.</p>
          <button
            onClick={() => navigate("/admin/produtos")}
            className="mt-4 px-4 py-2 rounded-md bg-slate-900 text-white"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  if (loading && !current) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="rounded-2xl bg-white/90 p-6 shadow">Carregando…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="rounded-2xl bg-white/90 p-6 shadow">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="rounded-2xl bg-white/90 p-6 shadow">
          <p className="text-red-700">Produto não encontrado.</p>
          <button
            onClick={() => navigate("/admin/produtos")}
            className="mt-4 px-4 py-2 rounded-md bg-slate-900 text-white"
          >
            Voltar para Produtos
          </button>
        </div>
      </div>
    );
  }

  /* ========================= FORM ========================= */

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-white drop-shadow mb-4">
        Editar Produto
      </h1>

      <form
        onSubmit={onSubmit}
        className="space-y-6 rounded-2xl bg-white/80 backdrop-blur p-6 shadow-xl"
      >
        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Nome
          </label>
          <input
            className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex.: Pizza Napolitana"
          />
        </div>

        {/* Descrição */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Descrição
          </label>
          <textarea
            className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descreva o produto…"
          />
        </div>

        {/* Preço */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Preço (R$)
          </label>
          <input
            className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Ex.: 39.90"
            inputMode="decimal"
          />
        </div>

        {/* Imagem */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Nova imagem (opcional)
          </label>

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-black transition">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onPickFile(e.target.files?.[0] ?? null)}
              />
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14m7-7H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Escolher arquivo
            </label>

            <div className="flex items-center gap-4">
              {pickedBase64 ? (
                <img
                  src={pickedBase64}
                  className="h-20 w-20 object-cover rounded-lg ring-1 ring-slate-200"
                />
              ) : current.imgUrl ? (
                <img
                  src={current.imgUrl}
                  className="h-20 w-20 object-cover rounded-lg ring-1 ring-slate-200"
                />
              ) : (
                <span className="text-slate-500 text-sm">Sem imagem</span>
              )}
            </div>
          </div>
        </div>

        {/* Mensagens */}
        {msg && (
          <div
            className={`rounded-xl px-4 py-2 text-sm ${
              msg.startsWith("✅")
                ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                : "bg-rose-50 text-rose-700 ring-1 ring-rose-200"
            }`}
          >
            {msg}
          </div>
        )}

        {/* Ações */}
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {saving ? "Salvando…" : "Salvar alterações"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/produtos")}
            className="rounded-xl bg-slate-200 px-4 py-2 text-slate-800 hover:bg-slate-300"
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}
