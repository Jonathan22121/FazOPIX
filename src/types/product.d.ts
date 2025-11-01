// src/types/product.ts
export type Product = {
  id?: number | string
  name: string
  description: string
  price: string | number
  imgUrl?: string
  createdAt?: string
  category?: "pizza" | "burger" | "drink" | "snack" |"all"
}
