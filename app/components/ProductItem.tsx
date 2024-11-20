import React from 'react';
import { Product } from '../utils/types';
import Image from 'next/image';

interface ProductItemProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <div className="max-w-60 flex flex-col justify-center items-center bg-gray-800 text-white rounded-lg shadow-md p-4">
      <div className="mb-4">
        <Image 
          src={product.imageUrl} 
          alt={product.nome} 
          width={250} 
          height={300} 
          className="rounded-lg"
        />
      </div>
      <h2 className="text-lg font-semibold mb-2">{product.nome}</h2>
      {/* <p className="text-sm text-gray-400 mb-4">{product.descricao}</p> */}
      <button 
        onClick={handleAddToCart} 
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-bold transition duration-200"
      >
        Comprar
      </button>
    </div>
  );
};

export default ProductItem;
