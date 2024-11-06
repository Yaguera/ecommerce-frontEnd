"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => setCart([...cart, product]);
  const removeFromCart = (id: string) =>
    setCart(cart.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
