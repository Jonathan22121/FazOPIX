// src/utils/fileToBase64.ts

// converte um arquivo local em Base64
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// converte uma URL remota em Base64
export async function urlToBase64(url: string): Promise<string> {
  try {
    // se já é um dataURL (começa com data:image/...), não faz fetch
    if (url.startsWith("data:image")) return url;

    // se for URL de imagem válida, faz fetch normalmente
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const blob = await res.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.error("❌ Erro ao converter URL para Base64:", err);
    // retorna string vazia em vez de quebrar o app
    return "";
  }
}
