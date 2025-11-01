// src/services/products.ts
import type { Product } from "@/types/product"

/* ============================================================================
   Config
   ============================================================================ */
const BASE = import.meta.env.VITE_API_URL || "https://productapi.shardweb.app"

/**
 * Se TRUE, envia só o conteúdo Base64 (sem "data:image/...;base64,").
 * Se FALSE, envia o DataURL completo.
 */
const SEND_RAW_BASE64 = true

/* ============================================================================
   Util: normaliza Base64
   ============================================================================ */
/**
 * Garante prefixo "data:image/...;base64," quando necessário e aplica a política
 * de envio (apenas conteúdo ou DataURL completo) conforme SEND_RAW_BASE64.
 */
function normalizeBase64(b64: string): string {
  if (!b64) return ""
  const withPrefix = b64.startsWith("data:image")
    ? b64
    : `data:image/png;base64,${b64}`
  return SEND_RAW_BASE64 ? withPrefix.split(",")[1] : withPrefix
}

/* ============================================================================
   GET /getproducts
   ============================================================================ */
export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  const res = await fetch(`${BASE}/getproducts`, { signal })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)

  const raw = await res.json()

  // Normaliza para sempre expor .description
  const data = (Array.isArray(raw) ? raw : []).map((p: unknown) => {
    const obj = p as Record<string, unknown>
    return {
      ...obj,
      description:
        (obj.description as string | undefined) ??
        (obj.desc as string | undefined) ??
        "",
    } as Product
  })

  return data
}


/* ============================================================================
   POST /postproducts
   - A API pode responder com JSON, texto simples ou vazio.
   - Esta função aceita todas as variantes sem quebrar o fluxo.
   ============================================================================ */
export async function createProduct(p: {
  name: string
  description: string
  price: string | number
  imgBase64: string
}): Promise<Product | { ok: true; raw?: string }> {
  const name = p.name?.trim()
  const description = p.description?.trim()
  const price = String(p.price ?? "").trim()

  if (!name) throw new Error("Nome é obrigatório.")
  if (!description) throw new Error("Descrição é obrigatória.")
  if (!price) throw new Error("Preço é obrigatório.")

  const imgUrl = normalizeBase64(p.imgBase64)

  // Envia tanto "description" quanto "desc" (compat com o backend)
  const body = { name, description, desc: description, price, imgUrl }

  const res = await fetch(`${BASE}/postproducts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  const contentType = res.headers.get("content-type") ?? ""
  const text = await res.text()

  if (!res.ok) {
    throw new Error(`Erro HTTP ${res.status}: ${text || "sem mensagem"}`)
  }

  // Se o backend enviou JSON válido, retorne como Product
  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(text) as Product
    } catch {
      // segue para tratar como sucesso com texto cru
    }
  }

  // Texto simples ou resposta vazia → considere sucesso
  return { ok: true, raw: text || undefined }
}

/* ============================================================================
   DELETE /deleteproducts
   ============================================================================ */
export async function deleteProduct(id: number | string): Promise<boolean> {
  const res = await fetch(`${BASE}/deleteproducts?id=${id}`, { method: "DELETE" })
  const text = await res.text()

  if (!res.ok) {
    throw new Error(`Erro HTTP ${res.status}: ${text || "sem mensagem"}`)
  }

  return true
}

/* ============================================================================
   PUT /updatepartsofproducts — atualização parcial
   - Envie apenas os campos que mudaram.
   - Backend aceita 'description' e/ou 'desc'.
   - Suporta resposta vazia ou texto simples.
   ============================================================================ */
export async function updateProductPartial(p: {
  id: number | string
  name?: string
  description?: string
  price?: string | number
  imgBase64?: string // aceita DataURL completo ou conteúdo cru
}): Promise<Record<string, unknown> | { ok: true; raw?: string }> {
  if (!p.id) {
    throw new Error("O campo 'id' é obrigatório para atualização parcial.")
  }

  const body: Record<string, unknown> = { id: String(p.id) }

  if (p.name !== undefined) body.name = p.name.trim()

  if (p.description !== undefined) {
    const descTrim = p.description.trim()
    body.description = descTrim   // para APIs que usam 'description'
    body.desc = descTrim          // compat com APIs que usam 'desc'
  }

  if (p.price !== undefined) body.price = String(p.price).trim()

  if (p.imgBase64 !== undefined) {
    body.imgUrl = normalizeBase64(p.imgBase64) // respeita SEND_RAW_BASE64
  }

  const res = await fetch(`${BASE}/updatepartsofproducts`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  const text = await res.text()

  if (!res.ok) {
    throw new Error(`Erro HTTP ${res.status}: ${text || "sem mensagem"}`)
  }

  if (!text) return { ok: true } // sucesso silencioso

  // Tenta JSON; se não for, retorna texto cru como sucesso
  try {
    return JSON.parse(text) as Record<string, unknown>
  } catch {
    return { ok: true, raw: text }
  }
}

/* ============================================================================
   (Opcional) PATCH /updateproducts — atualização completa
   Deixe comentado se não for usar.
   ============================================================================ */
// export async function updateProduct(p: {
//   id: number | string
//   name: string
//   description: string
//   price: string | number
//   imgBase64: string
// }): Promise<Product> {
//   const name = p.name?.trim()
//   const description = p.description?.trim()
//   const price = String(p.price ?? "").trim()
//   const imgUrl = normalizeBase64(p.imgBase64)
//
//   if (!name || !description || !price || !imgUrl) {
//     throw new Error("Todos os campos são obrigatórios para atualização completa.")
//   }
//
//   const body = { id: String(p.id), name, description, desc: description, price, imgUrl }
//
//   const res = await fetch(`${BASE}/updateproducts`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//   })
//
//   const text = await res.text()
//   if (!res.ok) throw new Error(`Erro HTTP ${res.status}: ${text || "sem mensagem"}`)
//
//   try {
//     return JSON.parse(text) as Product
//   } catch {
//     throw new Error(`Resposta inválida da API: ${text}`)
//   }
// }
