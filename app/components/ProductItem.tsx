import React from 'react';
import { Product } from '../utils/types';

interface ProductItemProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', margin: '16px', textAlign: 'center' }}>
      <img src={product.imageUrl} alt={product.name} style={{ width: '150px', height: '150px' }} />
      <h2>{product.name}</h2>
      <p>Quantidade: {product.quantidade}</p>
      <button onClick={handleAddToCart} style={{ padding: '8px 16px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px' }}>
        Adicionar ao Carrinho
      </button>
    </div>
  );
};

export default ProductItem;
