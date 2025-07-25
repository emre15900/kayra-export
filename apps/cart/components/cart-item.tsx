'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { CartItem } from '../../../shared/types/products';
import { CartStorage } from '../../../shared/utils/cart-storage';
import { toast } from 'sonner';

interface CartItemProps {
  item: CartItem;
  onUpdate: () => void;
}

function CartItemComponent({ item, onUpdate }: CartItemProps) {
  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemove();
      return;
    }
    
    CartStorage.updateItemQuantity(item.id, newQuantity);
    onUpdate();
    toast.success('Cart updated');
  };

  const handleRemove = () => {
    CartStorage.removeItem(item.id);
    onUpdate();
    toast.success(`${item.name} removed from cart`);
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover rounded-md"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.category}</p>
            <p className="text-lg font-bold text-blue-600">${item.price.toFixed(2)}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleUpdateQuantity(item.quantity - 1)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <span className="w-12 text-center font-semibold">{item.quantity}</span>
            
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleUpdateQuantity(item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="text-right">
            <p className="font-bold text-gray-900">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleRemove}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CartItemComponent;