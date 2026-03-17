import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { productsApi } from '../api/products';
import { ProductGrid } from '../components/products/ProductGrid';
import type { Product } from '../types';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

export const ProductsPage: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
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
    setSearchQuery(searchInput.trim().toLowerCase());
  };

  const filteredProducts = products.filter((product) => {
    if (!searchQuery) {
      return true;
    }

    const title = product.title.toLowerCase();
    const category = product.category?.toLowerCase() ?? "";
    return title.includes(searchQuery) || category.includes(searchQuery);
  });

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary-900 mb-4">Browse Tracked Products</h1>
        
        {/* Search Bar */}
        <div className="flex gap-4 mb-6">
          <Input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
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
      ) : filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} onProductClick={handleProductClick} />
      ) : (
        <Card className="frosted-surface text-center py-8">
          <p className="text-primary-600">
            {searchQuery
              ? "No products match your search."
              : "No products found in the database."}
          </p>
        </Card>
      )}
    </div>
  );
};
