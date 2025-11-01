// src/components/menu/SearchBar.tsx
type Props = {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}

export default function SearchBar({ value, onChange, placeholder }: Props) {
  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur px-4 py-2 outline-none focus:ring-2 ring-emerald-500"
      />
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
        ⌕
      </span>
    </div>
  )
}
