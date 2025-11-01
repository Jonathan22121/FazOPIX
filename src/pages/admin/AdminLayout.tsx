// src/pages/admin/AdminLayout.tsx
import { NavLink, Outlet } from "react-router-dom"
import { useState } from "react"
import Footer from "@/components/layout/Footer"

export default function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="admin-bg min-h-screen flex flex-col">
      {/* Cabeçalho */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold">Painel de Configuração</h1>

          {/* Botão hamburguer visível apenas em telas pequenas */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-slate-100 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {/* Ícone (3 linhas) */}
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-slate-700"></span>
              <span className="block w-6 h-0.5 bg-slate-700"></span>
              <span className="block w-6 h-0.5 bg-slate-700"></span>
            </div>
          </button>

          {/* Navegação (desktop) */}
          <nav className="hidden lg:flex items-center gap-2">
            <Tab to="/admin">Início</Tab>
            <Tab to="/admin/produtos">Produtos</Tab>
            <Tab to="/admin/novo">Adicionar</Tab>           
            <Tab to="/">Página Inicial</Tab>
          </nav>
        </div>

        {/* Menu mobile (abre com o hambúrguer) */}
        {menuOpen && (
          <nav className="lg:hidden bg-white border-t border-slate-200 flex flex-col p-3 space-y-2">
            <Tab to="/admin">Início</Tab>
            <Tab to="/admin/produtos">Produtos</Tab>
            <Tab to="/admin/novo">Adicionar</Tab>
            <Tab to="/">Página Inicial</Tab>
          </nav>
        )}
      </header>

      {/* Faixa gradiente superior */}
      <div className="admin-hero h-24 w-full" />

      {/* Conteúdo */}
      <main className="mx-auto max-w-6xl px-4 py-8 flex-grow">
        <Outlet />
      </main>

      {/* Faixa gradiente inferior + rodapé */}
      <div className="admin-footer h-28 w-full mt-8" />
      <Footer />
    </div>
  )
}

function Tab({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-1.5 rounded-md text-sm font-medium transition block text-center
         ${isActive ? "bg-slate-900 text-white" : "bg-slate-100 hover:bg-slate-200"}`
      }
      end
    >
      {children}
    </NavLink>
  )
}
