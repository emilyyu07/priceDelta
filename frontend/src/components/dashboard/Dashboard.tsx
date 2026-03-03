import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../../hooks/useAuth";
import { ProductGrid } from "../products/ProductGrid";
import { productsApi } from "../../api/products.js";
import { alertsApi } from "../../api/alerts.js";
import { notificationsApi } from "../../api/notifications.js";
import {ProductTracker} from "./ProductTracker";
import { AlertCircle, Tag, TrendingDown } from "lucide-react";
import type { Product } from "../../types/index.js";

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate(); // Initialize useNavigate
    const [products, setProducts] = useState<Product[]>([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // Stats from HomePage
    const [activeAlertsCount, setActiveAlertsCount] = useState<number>(0);
    const [priceDropsCount, setPriceDropsCount] = useState<number>(0);
    const [dealsNotifiedCount, setDealsNotifiedCount] = useState<number>(0);
    const [statsLoading, setStatsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoadingProducts(true);
                const fetchedProducts = await productsApi.getAll();
                setProducts(fetchedProducts.slice(0, 4)); // Displaying maximum 4 products
            } catch (err) {
                console.error("Failed to fetch products:", err);
                setError("Failed to load products. Please try again later.");
            } finally {
                setLoadingProducts(false);
            }
        };
        
        const fetchStats = async () => {
            try {
                setStatsLoading(true);
                const [alerts, notifications] = await Promise.all([
                    alertsApi.getAlerts(),
                    notificationsApi.getNotifications(),
                ]);
                const activeAlerts = Array.isArray(alerts) ? alerts.filter((a: { isActive?: boolean }) => a.isActive !== false) : [];
                const priceDrops = Array.isArray(notifications) ? notifications.filter((n: { type: string }) => n.type === 'PRICE_DROP') : [];
                const dealsNotified = Array.isArray(notifications) ? notifications.filter((n: { type: string }) => n.type === 'PRICE_DROP' || n.type === 'TARGET_REACHED') : [];
                setActiveAlertsCount(activeAlerts.length);
                setPriceDropsCount(priceDrops.length);
                setDealsNotifiedCount(dealsNotified.length);
            } catch {
                setActiveAlertsCount(0);
                setPriceDropsCount(0);
                setDealsNotifiedCount(0);
            } finally {
                setStatsLoading(false);
            }
        };
        
        fetchProducts();
        fetchStats();
    }, []);

    const handleProductClick = (productId: string) => {
      navigate(`/products/${productId}`); 
    };

    return (
        <div className="p-4">
            {/* Merged Banner Section */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-8 text-white mb-8">
                <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name || user?.email || 'there'}!</h1>
                <p className="text-xl mb-4">Your prices — on a leash. Set your price. We'll do the stalking.</p>
                <p className="text-primary-100 mb-6">We look down so your savings go up. Check out your next big save!</p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-primary-50 p-6 rounded-lg border border-primary-200 hover:shadow-lg transition">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Active Alerts</h3>
                        <AlertCircle className="h-6 w-6 text-primary-600" />
                    </div>
                    <p className="text-3xl font-bold text-primary-900">
                        {statsLoading ? '…' : activeAlertsCount}
                    </p>
                    <p className="text-sm text-primary-600 mt-2">Watching for price drops</p>
                </div>

                <div className="bg-primary-50 p-6 rounded-lg border border-primary-200 hover:shadow-lg transition">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Price Drops</h3>
                        <TrendingDown className="h-6 w-6 text-primary-600" />
                    </div>
                    <p className="text-3xl font-bold text-primary-900">
                        {statsLoading ? '…' : priceDropsCount}
                    </p>
                    <p className="text-sm text-primary-600 mt-2">Price drop notifications</p>
                </div>

                <div className="bg-primary-50 p-6 rounded-lg border border-primary-200 hover:shadow-lg transition">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Deals Notified</h3>
                        <Tag className="h-6 w-6 text-primary-600" />
                    </div>
                    <p className="text-3xl font-bold text-primary-900">
                        {statsLoading ? '…' : dealsNotifiedCount}
                    </p>
                    <p className="text-sm text-primary-600 mt-2">Price drops & target reached</p>
                </div>
            </div>

            {/* Product Tracker */}
            <ProductTracker />

            {/* Previously Searched Items */}
            <h2 className="text-xl font-semibold text-primary-700 mb-4">Previously Searched Items</h2>
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
  