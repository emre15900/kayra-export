'use client'

import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { CreditCard, Truck, Shield } from 'lucide-react'

export default function CartSummary() {
  const { items, total } = useSelector((state: RootState) => state.cart)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  
  const shipping = total > 500 ? 0 : 29.99
  const tax = total * 0.18
  const finalTotal = total + shipping + tax

  return (
    <div className="card p-6 sticky top-4">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Sipariş Özeti
      </h3>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Ürünler ({itemCount} adet)</span>
          <span>₺{total.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>Kargo</span>
          <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
            {shipping === 0 ? 'Ücretsiz' : `₺${shipping.toFixed(2)}`}
          </span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>KDV (%18)</span>
          <span>₺{tax.toFixed(2)}</span>
        </div>
        
        <hr className="border-gray-200" />
        
        <div className="flex justify-between text-lg font-semibold text-gray-900">
          <span>Toplam</span>
          <span>₺{finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {total < 500 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>₺{(500 - total).toFixed(2)}</strong> daha alışveriş yapın, 
            kargo ücretsiz olsun! 🚚
          </p>
        </div>
      )}

      <button className="w-full btn-primary mb-6 py-3 text-lg">
        <CreditCard className="w-5 h-5 mr-2" />
        Ödemeye Geç
      </button>

      <div className="space-y-3 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Truck className="w-4 h-4 text-green-500" />
          <span>Ücretsiz kargo (500₺ üzeri)</span>
        </div>
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-green-500" />
          <span>Güvenli ödeme</span>
        </div>
        <div className="flex items-center space-x-2">
          <CreditCard className="w-4 h-4 text-green-500" />
          <span>Tüm kartlar kabul edilir</span>
        </div>
      </div>
    </div>
  )
}