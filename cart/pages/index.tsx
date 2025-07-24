'use client'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import CartList from '../components/CartList'
import Header from '../components/Header'
import EmptyCart from '../components/EmptyCart'
import CartSummary from '../components/CartSummary'

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const total = useSelector((state: RootState) => state.cart.total)

  useEffect(() => {
    // Listen for messages from home app
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'http://localhost:3000') return
      
      if (event.data.type === 'ADD_TO_CART') {
        // Handle add to cart from home app
        console.log('Received add to cart:', event.data.payload)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Alışveriş Sepetiniz
          </h1>
          <p className="text-lg text-gray-600">
            {cartItems.length > 0 
              ? `Sepetinizde ${cartItems.length} ürün bulunuyor`
              : 'Sepetiniz şu anda boş'
            }
          </p>
        </div>

        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CartList />
            </div>
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </main>
    </div>
  )
} 