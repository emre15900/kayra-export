'use client'

import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { updateQuantity, removeFromCart } from '../store/cartSlice'
import { CartItem as CartItemType } from '../store/cartSlice'
import toast from 'react-hot-toast'

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useDispatch()

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return
    dispatch(updateQuantity({ id: item.id, quantity: newQuantity }))
  }

  const handleRemove = () => {
    dispatch(removeFromCart(item.id))
    toast.success(`${item.name} sepetten kaldırıldı`, {
      icon: '🗑️',
    })
  }

  return (
    <div className="card p-6 animate-slide-up">
      <div className="flex items-center space-x-4">
        <div className="relative w-20 h-20 flex-shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {item.name}
          </h3>
          <p className="text-primary-600 font-medium">
            ₺{item.price.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
              disabled={item.quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            
            <span className="w-8 text-center font-medium">
              {item.quantity}
            </span>
            
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="text-right">
            <p className="text-lg font-semibold text-gray-900">
              ₺{(item.price * item.quantity).toFixed(2)}
            </p>
          </div>

          <button
            onClick={handleRemove}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}