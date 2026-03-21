import React from 'react';
import type { Product } from '../../types/index.js';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onProductClick: (productId: string) => void;
  onProductDelete?: (productId: string, event: React.MouseEvent) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductClick, onProductDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onClick={onProductClick}
          onDelete={onProductDelete}
        />
      ))}
    </div>
  );
};
