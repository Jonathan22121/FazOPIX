import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa"


export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Coluna 1 - Logo e descrição */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">🍕 FazOPIX</h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Sabor, qualidade e entrega rápida direto pra você.  
            Peça online e receba sua comida quentinha em minutos.
          </p>
        </div>

        {/* Coluna 2 - Links rápidos */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Links Rápidos</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-red-400 transition">Home</a></li>
            <li><a href="/menu" className="hover:text-red-400 transition">Cardápio</a></li>
            <li><a href="/about" className="hover:text-red-400 transition">Sobre</a></li>
            <li><a href="/contact" className="hover:text-red-400 transition">Contato</a></li>
          </ul>
        </div>

        {/* Coluna 3 - Contato */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contato</h3>
          <ul className="space-y-2">
            <li>📍 Rua do Frontend, 123 - BH</li>
            <li>📞 (31) 99999-9999</li>
            <li>✉️ contato@fazopix.com</li>
          </ul>

          {/* Redes sociais */}
          <div className="flex gap-4 mt-4">
            <a href="https://instagram.com" target="_blank" className="hover:text-red-400 transition"><FaInstagram className="text-xl hover:text-pink-500" /></a>
            <a href="https://facebook.com" target="_blank" className="hover:text-red-400 transition"><FaFacebook className="text-xl hover:text-blue-500" /></a>
            <a href="https://wa.me/5531999999999" target="_blank" className="hover:text-green-400 transition"><FaWhatsapp className="text-xl hover:text-green-500" /></a>
          </div>
        </div>
      </div>

      {/* Linha inferior */}
      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} FazOPIX — Todos os direitos reservados 🍕
      </div>
    </footer>
  )
}
