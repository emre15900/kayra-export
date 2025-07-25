'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CartHeader } from '@/components/cart-header';
import CartItemComponent from '@/components/cart-item';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CartStorage } from '../../../shared/utils/cart-storage';
import type { CartState } from '../../../shared/types/products';
import { ShoppingBag, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

export default function CartPage() {
  const [cart, setCart] = useState<CartState>({ items: [], total: 0, itemCount: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const loadCart = () => {
    const currentCart = CartStorage.getCart();
    setCart(currentCart);
    setIsLoading(false);
  };

  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;

  useEffect(() => {
    // Eğer URL'de cart parametresi varsa, onu localStorage'a kaydet
    if (searchParams && searchParams.has('cart')) {
      try {
        const cartBase64 = searchParams.get('cart') || '';
        const cartString = decodeURIComponent(atob(cartBase64));
        const cartObj = JSON.parse(cartString);
        CartStorage.setCart(cartObj);
      } catch (e) {
        // Hatalı veri gelirse sepeti temizle
        CartStorage.clearCart();
      }
    }
    loadCart();
    
    // Listen for cart updates from other micro-frontends
    const handleCartUpdate = (event: CustomEvent) => {
      setCart(event.detail);
    };

    window.addEventListener('cartUpdated', handleCartUpdate as EventListener);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate as EventListener);
    };
  }, []);

  const handleCheckout = () => {
    if (cart.items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    toast.success('Checkout initiated!', {
      description: 'Redirecting to payment...',
    });
    
    // Simulate checkout process
    setTimeout(() => {
      CartStorage.clearCart();
      loadCart();
      toast.success('Order placed successfully!');
    }, 2000);
  };

  const handleClearCart = () => {
    CartStorage.clearCart();
    loadCart();
    toast.success('Cart cleared');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CartHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CartHeader />
      
      <main className="container mx-auto px-4 py-8">
        {cart.items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <a href="http://localhost:3000/">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Continue Shopping
              </Button>
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Cart Items ({cart.itemCount})
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearCart}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Clear Cart
                </Button>
              </div>
              
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <CartItemComponent
                    key={item.id}
                    item={item}
                    onUpdate={loadCart}
                  />
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({cart.itemCount} items)</span>
                    <span>${cart.total.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(cart.total * 0.08).toFixed(2)}</span>
                  </div>
                  
                  <hr className="my-4" />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${(cart.total * 1.08).toFixed(2)}</span>
                  </div>
                  
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 gap-2" 
                    size="lg"
                    onClick={handleCheckout}
                  >
                    <CreditCard className="h-4 w-4" />
                    Proceed to Checkout
                  </Button>
                  
                  <div className="text-center">
                    <a 
                      href="http://localhost:3000/"
                      className="text-blue-600 hover:text-blue-700 text-sm"
                    >
                      Continue Shopping
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}