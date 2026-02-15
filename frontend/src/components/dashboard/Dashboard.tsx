import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../../hooks/useAuth";
import { ProductGrid } from "../products/ProductGrid";
import { productsApi } from "../../api/products.js";
import type { Product } from "../../types/index.js";

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate(); // Initialize useNavigate
    const [products, setProducts] = useState<Product[]>([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoadingProducts(true);
                const fetchedProducts = await productsApi.getAll();
                setProducts(fetchedProducts.slice(0, 8)); // Displaying a limited number of products
            } catch (err) {
                console.error("Failed to fetch products:", err);
                setError("Failed to load products. Please try again later.");
            } finally {
                setLoadingProducts(false);
            }
        };
        fetchProducts();
    }, []);

    const handleProductClick = (productId: string) => {
      navigate(`/products/${productId}`); // Use navigate for programmatic navigation
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-primary-800 mb-4">Welcome back, {user?.name || user?.email || 'there'}!</h1>
            <p className="text-primary-600 mb-6">We look down so your savings go up. Check out your next big save!</p>

            <h2 className="text-xl font-semibold text-primary-700 mb-4">Featured Products</h2>
            {loadingProducts ? (
                <p className="text-primary-600">Loading products...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <ProductGrid products={products} onProductClick={handleProductClick} />
            )}
        </div>
    );
};

export default Dashboard;
  