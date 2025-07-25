import { CartItem, CartState } from '../types/products';

const CART_STORAGE_KEY = 'micro-frontend-cart';

export class CartStorage {
  static getCart(): CartState {
    if (typeof window === 'undefined') {
      return { items: [], total: 0, itemCount: 0 };
    }

    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error reading cart from storage:', error);
    }

    return { items: [], total: 0, itemCount: 0 };
  }

  static setCart(cart: CartState): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      // Dispatch custom event for cross-app communication
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }));
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  }

  static addItem(item: CartItem): CartState {
    const currentCart = this.getCart();
    const existingItemIndex = currentCart.items.findIndex(i => i.id === item.id);

    if (existingItemIndex >= 0) {
      currentCart.items[existingItemIndex].quantity += item.quantity;
    } else {
      currentCart.items.push(item);
    }

    currentCart.total = currentCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    currentCart.itemCount = currentCart.items.reduce((sum, item) => sum + item.quantity, 0);

    this.setCart(currentCart);
    return currentCart;
  }

  static removeItem(itemId: string): CartState {
    const currentCart = this.getCart();
    currentCart.items = currentCart.items.filter(item => item.id !== itemId);
    
    currentCart.total = currentCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    currentCart.itemCount = currentCart.items.reduce((sum, item) => sum + item.quantity, 0);

    this.setCart(currentCart);
    return currentCart;
  }

  static updateItemQuantity(itemId: string, quantity: number): CartState {
    const currentCart = this.getCart();
    const itemIndex = currentCart.items.findIndex(item => item.id === itemId);

    if (itemIndex >= 0) {
      if (quantity <= 0) {
        currentCart.items.splice(itemIndex, 1);
      } else {
        currentCart.items[itemIndex].quantity = quantity;
      }
    }

    currentCart.total = currentCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    currentCart.itemCount = currentCart.items.reduce((sum, item) => sum + item.quantity, 0);

    this.setCart(currentCart);
    return currentCart;
  }

  static clearCart(): CartState {
    const emptyCart = { items: [], total: 0, itemCount: 0 };
    this.setCart(emptyCart);
    return emptyCart;
  }
}