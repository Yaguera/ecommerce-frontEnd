"use client";

import React from "react";
import { Product } from "../utils/types";
import Image from "next/image";
import { useCart } from "../context/CartContext"; // Importa o CartContext

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { addToCart } = useCart(); // Obtém a função addToCart do contexto

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="max-w-96 w-72 flex flex-col justify-between items-center bg-gray-800 text-white rounded-lg shadow-md p-4">
      <div className="w-full h-[300px] mb-4 relative">
        <Image
          src={product.imageUrl}
          alt={product.nome}
          fill
          sizes="full"
          className="object-cover rounded-lg"
        />
      </div>
      <h2 className="text-lg font-semibold mb-2 text-center">{product.nome}</h2>
      <p className="text-base text-gray-400 mb-4">R${product.price.toFixed(2)}</p>
      <button
        onClick={handleAddToCart}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-bold transition duration-200"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;
