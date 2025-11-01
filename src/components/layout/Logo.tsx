export default function Logo({ color = "black" }: { color?: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-black tracking-tight">
      <span className="text-2xl" role="img" aria-label="pizza">🍕</span>
      <span>
        <span className="text-red-600">Faz</span>
        <span className={color === "white" ? "text-white" : "text-black"}>OPIX</span>
      </span>
    </span>
  )
}
