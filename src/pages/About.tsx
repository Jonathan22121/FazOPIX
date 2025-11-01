// src/pages/About.tsx
export default function About() {
  return (
    <section className=" p-10 glass-soft">
      <h1 className="text-3xl font-bold text-slate-900 mb-4">Sobre</h1>

      <p className="leading-relaxed">
        FazOPIX nasceu para encantar seu paladar com produtos preparados com carinho.
        Nosso time é apaixonado por qualidade, atendimento e inovação.
      </p>

      <ul className="mt-6 space-y-2 list-disc pl-6">
        <li className="marker:text-green-600">Ingredientes selecionados</li>
        <li className="marker:text-green-600">Entrega rápida</li>
        <li className="marker:text-green-600">Ofertas mágicas toda semana</li>
      </ul>
    </section>
  );
}
