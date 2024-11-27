"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Product } from "../utils/types";

interface CartItem extends Product {
  quantity: number; // Adiciona a quantidade de cada item no carrinho
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, newQuantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

    // Carrega o carrinho do Local Storage ao montar o componente
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Adiciona um produto ao carrinho, verificando duplicação
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
  
      console.log("Adicionando produto ao carrinho:");
      console.log("Produto recebido:", product);
      console.log("Carrinho atual:", prevCart);
      console.log(cart)
  
      if (existingItem) {
        console.log("Produto já existe no carrinho, aumentando quantidade.");
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
  
      console.log("Produto não existe no carrinho, adicionando como novo item.");
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };
  

  // Remove um item do carrinho
  const removeFromCart = (id: string) =>
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));

  // Atualiza a quantidade de um item específico
  const updateQuantity = (id: string, newQuantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Limpa todo o carrinho
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
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
