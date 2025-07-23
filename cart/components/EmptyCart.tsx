'use client'

import { ShoppingCart, ArrowLeft } from 'lucide-react'

export default function EmptyCart() {
  return (
    <div className="text-center py-16">
      <div className="animate-bounce-in">
        <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Sepetiniz Boş
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Henüz sepetinize ürün eklemediniz. Kaliteli ürünlerimizi keşfetmek için 
          ürünler sayfasına göz atın.
        </p>
        
        <a
          href="http://localhost:3000"
          className="inline-flex items-center space-x-2 btn-primary"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Alışverişe Başla</span>
        </a>
      </div>
    </div>
  )
}