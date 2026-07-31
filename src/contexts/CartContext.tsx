import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getServicePrice, Service } from '../constants/services';

export interface CartItem extends Service {
  quantity: number;
  price: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (service: Service) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
  totalDuration: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = sessionStorage.getItem('wg_cart');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    sessionStorage.setItem('wg_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (service: Service) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === service.id);
      if (existing) {
        return prev.map(item =>
          item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...service, price: getServicePrice(service), quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalDuration = items.reduce((total, item) => total + item.duration * item.quantity, 0);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, totalPrice, totalDuration, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
