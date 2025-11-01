// src/components/menu/CategoryTabs.tsx
export type CategoryFilter = "all" | "pizza" | "burger" | "drink" |"snack"

type Props = {
  value: CategoryFilter
  onChange: (v: CategoryFilter) => void
}

const tabs: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "pizza", label: "Pizza" },
  { id: "burger", label: "Burger" },
  { id: "drink", label: "Bebidas" },
  { id: "snack", label: "Batata" },
]

export default function CategoryTabs({ value, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {tabs.map((t) => {
        const active = value === t.id
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`px-3 py-1.5 rounded-full border text-sm transition
              ${active
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-white/60 dark:bg-slate-900/60 border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
              }`}
          >
            {t.label}
          </button>
        )
      })}
    </div>
  )
}
