import HomePage from "./pages/index";
import { CartProvider } from "./utils/cartContext";

export default function Home() {
  return (
    <div>
      <CartProvider>
        <HomePage/>
      </CartProvider>
    </div>
  );
}
