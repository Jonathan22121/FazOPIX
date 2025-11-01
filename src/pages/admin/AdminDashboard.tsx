// src/pages/admin/AdminDashboard.tsx
import { Link } from "react-router-dom"

export default function AdminDashboard() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Bem-vindo!</h2>
      <p className="text-slate-800">
        Use os atalhos abaixo para gerenciar os produtos do seu cardápio.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <Card
          title="Adicionar produto"
          desc="Cadastre um novo item no cardápio."
          to="/admin/novo"
          cta="Adicionar"
        />
        <Card
          title="Buscar / Deletar produtos"
          desc="Veja todos os produtos, busque por nome/descrição e exclua itens."
          to="/admin/produtos"
          cta="Abrir lista"
        />
      </div>
    </section>
  )
}

function Card({
  title,
  desc,
  to,
  cta,
}: {
  title: string
  desc: string
  to: string
  cta: string
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-slate-600 mt-1">{desc}</p>
      <div className="mt-4">
        <Link
          to={to}
          className="inline-flex items-center rounded-md bg-slate-900 text-white px-4 py-2 text-sm hover:bg-slate-800"
        >
          {cta}
        </Link>
      </div>
    </div>
  )
}
