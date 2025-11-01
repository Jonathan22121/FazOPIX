// src/pages/admin/AdminAddProduct.tsx
import { useState } from "react";
import { createProduct } from "@/services/products";

// (opcional) use sua versão em src/utils/fileToBase64.ts se já existir
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AdminAddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(""); // string, evita conflito vírgula/ponto
  const [preview, setPreview] = useState<string | null>(null);
  const [imgBase64, setImgBase64] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function onPriceChange(v: string) {
    // aceita dígitos, vírgula e ponto; normaliza para ponto
    setPrice(v.replace(",", "."));
  }

  async function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const dataUrl = await fileToBase64(f); // "data:image/...;base64,xxxx"
    setPreview(dataUrl);
    setImgBase64(dataUrl);
  }

  function resetForm() {
    setName("");
    setDescription("");
    setPrice("");
    setPreview(null);
    setImgBase64(null);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name.trim()) return setError("O nome é obrigatório.");
    if (!description.trim()) return setError("A descrição é obrigatória.");
    if (!price.trim() || Number.isNaN(Number(price))) {
      return setError("Informe um preço válido (ex.: 25.99).");
    }
    if (!imgBase64) return setError("Selecione uma imagem.");

    try {
      setLoading(true);

      await createProduct({
        name: name.trim(),
        description: description.trim(),
        price: price.trim(), // o service já lida com string/number
        imgBase64,           // dataURL; o service cuida do prefixo/RAW
      });

      setSuccess("Produto criado com sucesso! 🎉");
      resetForm();

      // opcional: limpar mensagem depois de um tempo
      setTimeout(() => setSuccess(null), 2500);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "Erro ao criar produto.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-3xl">
      <header className="mb-6">
        <h2 className="text-2xl font-bold">Adicionar Produto</h2>
        <p className="text-slate-800 mt-1">
          Preencha os campos abaixo para cadastrar um novo item no cardápio.
        </p>
      </header>

      <form onSubmit={onSubmit} className="space-y-5">
        {/* Nome */}
        <div>
          <label className="block text-sm font-medium mb-1">Nome</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Hambúrguer Clássico"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>

        {/* Descrição */}
        <div>
          <label className="block text-sm font-medium mb-1">Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Pão brioche, carne grelhada e queijo cheddar derretido."
            rows={3}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>

        {/* Preço */}
        <div>
          <label className="block text-sm font-medium mb-1">Preço (R$)</label>
          <input
            value={price}
            onChange={(e) => onPriceChange(e.target.value)}
            placeholder="25.90"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
            inputMode="decimal"
          />
        </div>

        {/* Imagem */}
        <div>
          <label className="block text-sm font-medium mb-1">Imagem</label>
          <input
            type="file"
            accept="image/*"
            onChange={onSelectFile}
            className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-white file:hover:bg-slate-800"
          />

          {preview && (
            <div className="mt-3 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
              <img
                src={preview}
                alt="Pré-visualização"
                className="w-full max-h-[320px] object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Estados */}
        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-700">
            {success}
          </div>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 disabled:opacity-60"
          >
            {loading ? "Salvando…" : "Salvar Produto"}
          </button>
        </div>
      </form>
    </section>
  );
}
