import HomePage from "./pages/home/page";
import { CartProvider } from "./context/cartContext";

export default function Home() {
  return (
    <div>
      <CartProvider>
        <HomePage/>
      </CartProvider>
    </div>
  );
}
