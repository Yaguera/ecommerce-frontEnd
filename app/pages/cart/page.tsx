"use client"
import CartList from "../../components/CartList";
import { useCart } from "../../context/CartContext"; // Contexto do carrinho
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const router = useRouter();

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
    clearCart();
    alert("Pedido confirmado com sucesso!");
    router.push("/");
  };

  if (cart.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-xl">Seu carrinho está vazio.</p>
      </div>
    );
  }

  return (
    <div className="p-6 mt-16">
      <h1 className="text-3xl font-bold mb-4">Carrinho</h1>
      <CartList
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />
      <div className="mt-8 border-t pt-4 flex flex-col items-end">
        <p className="text-xl font-bold">Total: R$ {totalPrice.toFixed(2)}</p>
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
