"use client";
import { useEffect, useState } from "react";
import api from "./../services/api";
import ProductItem from "./../components/ProductItem";
import { useCart } from "./../context/cartContext";
import { Product } from "./../utils/types";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]); // Estado inicial como array vazio
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/produto/all");
        console.log("API response:", response.data); // Log para verificar a resposta
        setProducts(response.data.produtos || []); // Acessa a chave `produtos`
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        setProducts([]); // Define como array vazio em caso de erro
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 place-items-center">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} onAddToCart={addToCart} />
      ))}
    </div>
  );
}
