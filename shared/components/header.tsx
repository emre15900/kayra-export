'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { CartStorage } from '../utils/cart-storage';
import { toast } from 'sonner';
import type { CartItem } from '../types/products';

interface HeaderProps {
  baseUrl?: string;
  cartUrl?: string;
}

export function Header({ baseUrl = 'http://localhost:3000', cartUrl = 'http://localhost:3001/cart' }: HeaderProps) {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const cartButtonRef = useRef<HTMLButtonElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Initial cart count
    const cart = CartStorage.getCart();
    setCartItemCount(cart.itemCount);
    setCartItems(cart.items);

    // Listen for cart updates
    const handleCartUpdate = (event: CustomEvent) => {
      setCartItemCount(event.detail.itemCount);
      setCartItems(event.detail.items);
    };

    window.addEventListener('cartUpdated', handleCartUpdate as EventListener);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate as EventListener);
    };
  }, []);

  useEffect(() => {
    if (!showCartDropdown) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        cartButtonRef.current &&
        !cartButtonRef.current.contains(event.target as Node)
      ) {
        setShowCartDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCartDropdown]);

  const handleGoToCart = () => {
    const cart = CartStorage.getCart();
    const cartString = JSON.stringify(cart);
    const cartBase64 = btoa(encodeURIComponent(cartString));
    router.push(`${cartUrl}?cart=${cartBase64}`);
  };

  const handleRemoveItem = (id: string) => {
    CartStorage.removeItem(id);
    toast.success('Product removed from cart');
    // setCartItems ve setCartItemCount otomatik güncelleniyor (cartUpdated event)
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href={baseUrl} className="text-2xl font-bold text-blue-600">
              MicroStore
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href={baseUrl} className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href={`${baseUrl}/products`} className="text-gray-700 hover:text-blue-600 transition-colors">
                Products
              </Link>
              <Link href={`${baseUrl}/about`} className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <Button
              variant="outline"
              className="relative"
              onClick={handleGoToCart}
              onMouseEnter={() => setShowCartDropdown(true)}
              onMouseLeave={() => setShowCartDropdown(false)}
              ref={cartButtonRef}
            >
              <ShoppingCart className="h-4 w-4" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
              <span className="hidden sm:inline ml-2">Cart</span>
              {/* Dropdown */}
              {showCartDropdown && (
                <div
                  className="absolute top-10 right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                  onMouseEnter={() => setShowCartDropdown(true)}
                  onMouseLeave={() => setShowCartDropdown(false)}
                >
                  <div className="p-4 max-h-96 overflow-y-auto">
                    {cartItems.length === 0 ? (
                      <div className="text-center text-gray-500">Your cart is empty</div>
                    ) : (
                      cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between mb-3 last:mb-0">
                          <div className="flex items-center gap-2">
                            <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
                            <div>
                              <div className="font-medium text-gray-900 text-sm line-clamp-1">{item.name}</div>
                              <div className="text-xs text-gray-500">{item.quantity} x ${item.price}</div>
                            </div>
                          </div>
                          <button
                            className="cursor-pointer text-red-500 hover:text-red-700 text-xs font-bold px-2 py-1"
                            onClick={e => { e.stopPropagation(); handleRemoveItem(item.id); }}
                          >
                            Remove
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
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
                href={baseUrl}
                className="py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href={`${baseUrl}/products`}
                className="py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href={`${baseUrl}/about`}
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