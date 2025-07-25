export interface Product {
  id: string
  name: string
  price: number
  description: string
  image: string
  category: string
  rating: number
  reviews: number
}

export interface CartItem extends Product {
  quantity: number
}

export interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}
