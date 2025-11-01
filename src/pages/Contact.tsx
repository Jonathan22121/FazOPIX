// src/pages/Contact.tsx
import { useState } from "react"

export default function Contact() {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  const onWhatsApp = () => {
    const text = `Olá, sou ${name}. ${message}`
    window.open(`https://wa.me/5500000000000?text=${encodeURIComponent(text)}`, "_blank")
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-200 dark:text-black">Contato</h1>

      <div className="mt-6 space-y-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
          className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-200/60 px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Sua mensagem"
          rows={5}
          className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-200/60 px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
        />
        <div className="flex gap-3">
          <button
            onClick={onWhatsApp}
            className="px-5 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700">
            Enviar no WhatsApp
          </button>
          <a
            className="px-5 py-2 rounded-lg bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
            href="mailto:contato@incantare.com?subject=Contato%20Incantare">
            Enviar por E-mail
          </a>
        </div>
      </div>
    </section>
  )
}
