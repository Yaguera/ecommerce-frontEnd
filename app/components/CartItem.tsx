"Use Client";

import React from "react";
import Image from "next/image";

interface CartItemProps {
  id: string;
  nome: string;
  price: number;
  quantity: number;
  imageUrl: string;
  updateQuantity: (id: string, newQuantity: number) => void;
  removeFromCart: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  nome,
  price,
  quantity,
  imageUrl,
  updateQuantity,
  removeFromCart,
}) => {
  return (
    <div className="max-w-96 w-72 flex flex-col justify-between items-center bg-gray-800 text-white rounded-lg shadow-md p-4">
      <div className="w-full h-[300px] mb-4 relative">
        <Image
          src={imageUrl}
          alt={nome}
          fill
          sizes="full"
          className="object-cover rounded-lg"
        />
      </div>
      <h2 className="text-lg font-semibold mb-2 text-center">{nome}</h2>
      <p className="text-base text-gray-400 mb-2">
        Preço: R$ {price.toFixed(2)}
      </p>
      <div className="flex items-center justify-between w-full mb-4">
        <button
          className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded-lg"
          onClick={() => updateQuantity(id, quantity - 1)}
          disabled={quantity === 1}
        >
          -
        </button>
        <span className="text-lg">{quantity}</span>
        <button
          className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded-lg"
          onClick={() => updateQuantity(id, quantity + 1)}
        >
          +
        </button>
      </div>
      <button
        onClick={() => removeFromCart(id)}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-bold transition duration-200"
      >
        Remover
      </button>
    </div>
  );
};

export default CartItem;
