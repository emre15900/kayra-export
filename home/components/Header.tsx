'use client'

import Link from 'next/link'
import { ShoppingCart, Package } from 'lucide-react'
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
          <div className="flex items-center space-x-2">
            <Package className="w-8 h-8 text-primary-500" />
            <h1 className="text-xl font-bold text-gray-900">Kayra Export</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-500 transition-colors">
              Ürünler
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-500 transition-colors">
              Hakkımızda
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-500 transition-colors">
              İletişim
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <a
              href="http://localhost:3001"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Sepet</span>
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}