import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { productsApi } from '../api/products';
import { ProductGrid } from '../components/products/ProductGrid';
import type { Product } from '../types';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

export const ProductsPage: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Fetch products from backend on mount
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const data: Product[] = await productsApi.getAll();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`); // Use navigate for programmatic navigation
  };

  const handleSearch = () => {
    // Implement search logic later
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary-900 mb-4">Browse Tracked Products</h1>
        
        {/* Search Bar */}
        <div className="flex gap-4 mb-6">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search products..."
            className="flex-1"
          />
          <Button onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>

      {/* Product Grid Integration */}
      {loading ? (
        <div className="text-center py-10 text-primary-800">Loading products...</div>
      ) : error ? (
        <div className="text-red-500 text-center py-10">{error}</div>
      ) : products.length > 0 ? (
        <ProductGrid products={products} onProductClick={handleProductClick} />
      ) : (
        <div className="bg-primary-50 p-8 rounded-lg border border-primary-200 text-center">
          <p className="text-primary-600">No products found in the database.</p>
        </div>
      )}
    </div>
  );
};