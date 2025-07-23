'use client'

import Link from 'next/link'
import { ArrowLeft, ShoppingCart } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

export default function Header() {
  const cartItemsCount = useSelector((state: RootState) => 
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  )

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <a
              href="http://localhost:3000"
              className="flex items-center space-x-2 text-gray-600 hover:text-primary-500 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Ürünlere Dön</span>
            </a>
          </div>
          
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-6 h-6 text-primary-500" />
            <h1 className="text-xl font-bold text-gray-900">Sepet</h1>
            {cartItemsCount > 0 && (
              <span className="bg-primary-500 text-white text-sm px-2 py-1 rounded-full">
                {cartItemsCount}
              </span>
            )}
          </div>

          <div className="w-24"></div> {/* Spacer for balance */}
        </div>
      </div>
    </header>
  )
}