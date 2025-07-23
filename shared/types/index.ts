export interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
  category: string
  stock: number
}

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}