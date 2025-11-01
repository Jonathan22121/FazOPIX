import { useEffect, useRef, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import Logo from "./Logo"


const NAV = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Cardápio" },
  { to: "/about", label: "Sobre" },
  { to: "/contact", label: "Contato" },
  { to: "/admin", label: "Gerenciar Produtos"},
]

const phone = import.meta.env.VITE_WHATSAPP_PHONE ?? "5599999999999"
const waUrl = `https://wa.me/${phone}`

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null)
  const location = useLocation()


 
  // Fecha com ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // Fecha ao trocar de rota
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Focus e trava scroll
  useEffect(() => {
    if (open) {
      firstLinkRef.current?.focus()
      document.documentElement.classList.add("overflow-hidden", "touch-none")
    } else {
      document.documentElement.classList.remove("overflow-hidden", "touch-none")
    }
  }, [open])

  // Fecha se for redimensionado para desktop
  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) setOpen(false)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-2">
          <Logo color="black" />
        </Link>

        {/* LINKS (DESKTOP) */}
        <ul className="hidden md:flex items-center gap-4 text-slate-700">
          {NAV.map((it) => (
            <li key={it.to}>
              <NavLink
                to={it.to}
                className={({ isActive }) =>
                  `
                    relative px-3 py-2 font-medium transition-all duration-300 ease-out rounded-md
                    ${
                      isActive
                        ? "text-green-600 border-b-2 border-green-400 shadow-[0_0_10px_2px_rgba(34,197,94,0.4)] scale-[1.05]"
                        : "text-slate-700 hover:text-green-500 hover:border-b-4 hover:border-green-400 hover:shadow-[0_0_10px_2px_rgba(34,197,94,0.4)] hover:scale-[1.05]"
                    }
                  `
                }
              >
                {it.label}
              </NavLink>
            </li>
          ))}

          <li>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-green-500 px-4 py-1.5 text-white shadow hover:bg-green-600 transition"
            >
              WhatsApp
            </a>
          </li>
        </ul>

        {/* BOTÃO HAMBÚRGUER */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 bg-white text-slate-800 shadow hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 transition"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            // Ícone X
            <svg width="24" height="24" viewBox="0 0 24 24" className="stroke-current">
              <path d="M6 6l12 12M18 6L6 18" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            // Ícone 🍔
            <svg width="24" height="24" viewBox="0 0 24 24" className="stroke-current">
              <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {/* OVERLAY (MOBILE) */}
      <button
        type="button"
        aria-hidden={!open}
        tabIndex={-1}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* MENU MOBILE (slide-down) */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        className={`fixed inset-x-0 top-0 z-50 md:hidden
                    bg-white border-b border-slate-200 shadow-lg
                    transform transition-transform duration-300
                    ${open ? "translate-y-0" : "-translate-y-full"}`}
      >
        {/* Topo do painel: logo + fechar */}
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <Link to="/" onClick={() => setOpen(false)} className="inline-flex items-center gap-2">
            <Logo color="black" />
          </Link>

          <button
            onClick={() => setOpen(false)}
            className="rounded-md p-2 text-slate-700 hover:bg-slate-100"
            aria-label="Fechar menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" className="stroke-current">
              <path d="M6 6l12 12M18 6L6 18" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Conteúdo do painel */}
        <div className="flex max-h-[calc(100vh-64px)] flex-col gap-2 overflow-auto px-6 pb-6">
          {NAV.map((it, idx) => (
            <Link
              key={it.to}
              ref={idx === 0 ? firstLinkRef : undefined}
              to={it.to}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-slate-700 font-medium
                         transition-all duration-300 ease-out
                         hover:text-green-600 hover:border hover:border-green-400
                         hover:shadow-[0_0_10px_2px_rgba(34,197,94,0.4)] hover:scale-[1.05]"
            >
              {it.label}
            </Link>
          ))}


          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-md bg-green-600 px-4 py-3 text-center font-medium text-white hover:bg-green-700"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  )
}
