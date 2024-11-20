
import { CartProvider } from "./context/cartContext";
import ProductList from "./components/ProductList";

export default function Home() {
  return (
    <div>
      <CartProvider>
        <div >
          <ProductList/>
        </div>
      </CartProvider>
    </div>
  );
}
