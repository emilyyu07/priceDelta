import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productsApi } from '../api/products';
import { formatCurrency } from '../utils/formatters';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts'; //took out Tooltip, maybe no need
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { alertsApi } from '../api/alerts';
import { useAuth } from '../hooks/useAuth';
import type { Product, ProductListing, PriceHistory } from '../types'; 

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [targetPrice, setTargetPrice] = useState<string>('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertError, setAlertError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        const data = await productsApi.getById(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setAlertError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSetAlert = async () => {
    if (!isAuthenticated) {
      setAlertError('Please log in to set an alert.');
      return;
    }
    if (!product) return;

    const price = parseFloat(targetPrice);
    if (isNaN(price) || price <= 0) {
      setAlertError('Please enter a valid target price.');
      return;
    }

    setAlertMessage(null);
    setAlertError(null);

    try {
      await alertsApi.create({ productId: product.id, targetPrice: price });
      setAlertMessage(`Alert set for ${product.title} at ${formatCurrency(price)}!`);
      setTargetPrice('');
    } catch (err) {
      console.error('Error setting alert:', err);
      setAlertError('Failed to set alert. Please try again.');
    }
  };

  if (loading) {
    return (
        <div className="text-center py-10 text-primary-800">Loading product details...</div>
    );
  }

  if (!product) {
    return (
        <div className="text-center py-10 text-red-500">Product not found.</div>
    );
  }
  
  // Find the lowest current price across all listings for display
  const listings = product.listings ?? [];
  const lowestPriceListing = listings.reduce((minListing: ProductListing | null, currentListing: ProductListing) => {
    const currentPriceNum = parseFloat(currentListing.currentPrice as string);
    const minPriceNum = minListing ? parseFloat(minListing.currentPrice as string) : Infinity;
    return (minPriceNum < currentPriceNum) ? minListing : currentListing;
  }, null);

  const priceData = listings.flatMap((listing: ProductListing) => 
    (listing.priceHistory ?? []).map((entry: PriceHistory) => ({
      date: new Date(entry.timestamp).toLocaleDateString(),
      [`${listing.retailer?.name ?? 'Unknown'}`]: parseFloat(entry.price as string) // Parse price for chart
    }))
  );

  return (
    <div className="container mx-auto p-4">
      <Card>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img src={product.imageUrl || 'https://via.placeholder.com/400'} alt={product.title} className="w-full h-auto rounded-lg shadow-md" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-primary-900 mb-4">{product.title}</h1>
            {product.category && <p className="text-lg text-primary-600 mb-4">{product.category}</p>}
            <p className="text-primary-700 mb-6">{product.description}</p>
            <div className="flex items-baseline mb-6">
              <span className="text-3xl font-bold text-primary-600">
                {lowestPriceListing ? formatCurrency(parseFloat(lowestPriceListing.currentPrice)) : 'N/A'}
              </span>
              {lowestPriceListing?.retailer && (
                <span className="ml-2 text-lg text-primary-600">at {lowestPriceListing.retailer.name}</span>
              )}
            </div>

            {/* Set Alert Section */}
            {isAuthenticated && (
              <div className="mt-4 p-4 bg-primary-50 rounded-lg">
                <h3 className="text-xl font-semibold text-primary-800 mb-3">Set Price Alert</h3>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Target Price"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleSetAlert}>Set Alert</Button>
                </div>
                {alertMessage && (
                  <p className="text-green-600 mt-2">{alertMessage}</p>
                )}
                {alertError && (
                  <p className="text-red-600 mt-2">{alertError}</p>
                )}
              </div>
            )}
            {!isAuthenticated && (
              <p className="mt-4 text-primary-600">Log in to set price alerts for this product.</p>
            )}
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-primary-800 mb-4">Price History</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(tick) => formatCurrency(tick)} />
              {/*<Tooltip formatter={(value: Decimal) => formatCurrency(value)} /> */}
              <Legend />
              {listings.map((listing: ProductListing) => (
                <Line key={listing.id} type="monotone" dataKey={listing.retailer?.name ?? 'Unknown'} stroke="#00BCD4" />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetailPage;