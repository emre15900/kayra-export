'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { setProducts } from '../store/productSlice'
import ProductCard from '../components/ProductCard'
import Header from '../components/Header'
import { Product } from '../types/product'

// Mock data
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Premium Kahve Çekirdekleri',
    price: 299.99,
    image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Özenle seçilmiş premium kahve çekirdekleri. Türkiye\'nin en kaliteli kahve deneyimi.',
    category: 'Gıda',
    stock: 50
  },
  {
    id: 2,
    name: 'El Yapımı Seramik Vazo',
    price: 149.99,
    image: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Geleneksel yöntemlerle üretilmiş, benzersiz tasarımlı seramik vazo.',
    category: 'Dekorasyon',
    stock: 25
  },
  {
    id: 3,
    name: 'Organik Zeytinyağı',
    price: 89.99,
    image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=400',
    description: 'Soğuk sıkım organik zeytinyağı. Doğal ve sağlıklı.',
    category: 'Gıda',
    stock: 100
  },
  {
    id: 4,
    name: 'Doğal Bal',
    price: 79.99,
    image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Arılarımızdan doğal olarak elde edilen çiçek balı.',
    category: 'Gıda',
    stock: 75
  },
  {
    id: 5,
    name: 'El Dokuma Kilim',
    price: 899.99,
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Geleneksel motiflerle süslenmiş el dokuma kilim.',
    category: 'Tekstil',
    stock: 15
  },
  {
    id: 6,
    name: 'Antik Bakır İbrik',
    price: 199.99,
    image: 'https://images.pexels.com/photos/4226881/pexels-photo-4226881.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'El işçiliği ile üretilmiş antik bakır ibrik.',
    category: 'Dekorasyon',
    stock: 30
  }
]

export default function HomePage() {
  const dispatch = useDispatch()
  const products = useSelector((state: RootState) => state.products.items)

  useEffect(() => {
    dispatch(setProducts(mockProducts))
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-balance">
            Premium Ürünlerimizi Keşfedin
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Kayra Export olarak, en kaliteli ürünleri sizlerle buluşturuyoruz. 
            Her ürünümüz özenle seçilmiş ve kalite garantisi altındadır.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  )
}