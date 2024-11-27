
import CartItem from "./CartItem";

interface CartListProps {
  cart: {
    id: string;
    nome: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }[];
  updateQuantity: (id: string, newQuantity: number) => void;
  removeFromCart: (id: string) => void;
}

const CartList: React.FC<CartListProps> = ({
  cart,
  updateQuantity,
  removeFromCart,
}) => {
  return (
    <div className="flex justify-center items-center gap-3">
      {cart.map((item) => (
        <CartItem
          key={item.id}
          {...item}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
        />
      ))}
    </div>
  );
};

export default CartList;
