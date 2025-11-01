export default function Navbar() {
  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-red-600">🍔 PiXtore</h1>
        <nav className="space-x-6 hidden md:flex">
          <a href="/" className="hover:text-red-600">Home</a>
          <a href="/menu" className="hover:text-red-600">Menu</a>
          <a href="/about" className="hover:text-red-600">About</a>
          <a href="/contact" className="hover:text-red-600">Contact</a>
        </nav>
        <a href="https://wa.me/5531999999999" target="_blank" 
           className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
          Order via WhatsApp
        </a>
      </div>
    </header>
  )
}
