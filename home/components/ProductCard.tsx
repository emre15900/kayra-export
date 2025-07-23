'use client'

import Image from 'next/image'
import { ShoppingCart, Star } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'
import { Product } from '../types/product'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    }))
    
    toast.success(`${product.name} sepete eklendi!`, {
      icon: '🛒',
    })

    // Send to cart app via postMessage
    if (typeof window !== 'undefined') {
      const cartWindow = window.open('', 'cart-app')
      if (cartWindow) {
        cartWindow.postMessage({
          type: 'ADD_TO_CART',
          payload: {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
          }
        }, 'http://localhost:3001')
      }
    }
  }

  return (
    <div className="card p-6 animate-fade-in group">
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={300}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-sm text-gray-500 ml-2">(4.0)</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-primary-600">
              ₺{product.price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">
              Stok: {product.stock} adet
            </p>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Sepete Ekle</span>
          </button>
        </div>
      </div>
    </div>
  )
}