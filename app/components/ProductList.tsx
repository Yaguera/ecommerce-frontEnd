"use client";
import { useEffect, useState } from "react";
import api from "./../services/api";
import ProductItem from "./../components/ProductItem";
import { Product } from "./../utils/types";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]); // Estado inicial como array vazio

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
    <div className="mt-10 max-w-[90%] m-auto">
        <h1 className="text-3xl text-center uppercase font-bold">Todos os Jogos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 place-items-center">
        {products.map((product) => (
            <ProductItem key={product.id} product={product} />
        ))}
        </div>
    </div>
  );
}
