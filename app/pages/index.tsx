"use client"
import { useEffect, useState } from 'react';
import api from '../services/api';
import ProductItem from '../components/product-item';
import { useCart } from '../utils/cartContext';

interface Product {
  id: string;
  nome: string;
  quantidade: number;
  imageUrl: string;
}

export default function Homepage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get('/produto/all'); // Rota da API para listar produtos
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  return (

        <div>
            <h1>Produtos</h1>
            <div>
                {products.map((product) => (
                <ProductItem key={product.id} product={product} onAddToCart={addToCart} />
                ))}
            </div>
        </div>

  );
}
