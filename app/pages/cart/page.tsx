"use client";

import { useCart } from "../../context/CartContext"; // CartContext
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart(); // Funções do contexto
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const router = useRouter();

  console.log(cart)

  // Recalcular o preço total sempre que o carrinho mudar
  useEffect(() => {
    const calculateTotal = () => {
      const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotalPrice(total);
    };
    calculateTotal();
  }, [cart]);

  const handleConfirmOrder = () => {
    // Exemplo: Lógica para confirmar o pedido
    clearCart(); // Limpa o carrinho após confirmar o pedido
    alert("Pedido confirmado com sucesso!");
    router.push("/"); // Redireciona para a página principal
  };

  if (cart.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-xl">Seu carrinho está vazio.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Carrinho</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded-lg shadow-sm bg-white flex flex-col"
          >
            <Image
              src={item.imageUrl}
              alt={item.nome}
              width={150}
              height={150}
              className="object-contain"
            />
            <h2 className="text-lg font-bold">{item.nome}</h2>
            <p className="text-gray-600">R$ {item.price.toFixed(2)}</p>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <button
                  className="bg-gray-200 px-3 py-1 rounded-lg"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="bg-gray-200 px-3 py-1 rounded-lg"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <button
                className="text-red-500 font-semibold"
                onClick={() => removeFromCart(item.id)}
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 border-t pt-4 flex flex-col items-end">
        <p className="text-xl font-bold">
          Total: R$ {totalPrice.toFixed(2)}
        </p>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-green-600"
          onClick={handleConfirmOrder}
        >
          Confirmar Pedido
        </button>
      </div>
    </div>
  );
};

export default CartPage;
