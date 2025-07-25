'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartStorage } from '../../../shared/utils/cart-storage';

export function Header() {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Initial cart count
    const cart = CartStorage.getCart();
    setCartItemCount(cart.itemCount);

    // Listen for cart updates
    const handleCartUpdate = (event: CustomEvent) => {
      setCartItemCount(event.detail.itemCount);
    };

    window.addEventListener('cartUpdated', handleCartUpdate as EventListener);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate as EventListener);
    };
  }, []);

  const handleGoToCart = () => {
    const cart = CartStorage.getCart();
    const cartString = JSON.stringify(cart);
    const cartBase64 = btoa(encodeURIComponent(cartString));
    router.push(`http://localhost:3001/cart?cart=${cartBase64}`);
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              MicroStore
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-blue-600 transition-colors">
                Products
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <Button variant="outline" className="relative" onClick={handleGoToCart}>
              <ShoppingCart className="h-4 w-4" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
              <span className="hidden sm:inline ml-2">Cart</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t">
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                className="py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/about"
                className="py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}