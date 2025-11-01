/// <reference types="vite/client" />

// Permite usar "import.meta.env" para variáveis de ambiente (como URLs de API)
interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
