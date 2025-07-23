'use client'

import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import CartItem from './CartItem'

export default function CartList() {
  const cartItems = useSelector((state: RootState) => state.cart.items)

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Sepetinizdeki Ürünler
      </h2>
      
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  )
}