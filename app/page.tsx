
import ProductList from "./components/ProductList";

// import {register} from "swiper/element/bundle";

// register();
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
import Hero from "./components/Hero";


export default function Home() {
  return (
    <div>
 
          <Hero/>
          <ProductList/>

    </div>
  );
}