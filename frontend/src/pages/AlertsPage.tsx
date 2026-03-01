import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { AlertCircle, Trash2 } from 'lucide-react';
import { alertsApi } from '../api/alerts';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import type { PriceAlert } from '../types';
import { useAuth } from '../hooks/useAuth';

export const AlertsPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate(); 
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const fetchedAlerts: PriceAlert[] = await alertsApi.getAlerts();
      setAlerts(fetchedAlerts);
    } catch (err) {
      console.error('Error fetching alerts:', err);
      setError('Failed to load alerts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) { // Only fetch alerts if authenticated
        fetchAlerts();
    }
  }, [isAuthenticated]);

  const handleDeleteAlert = async (alertId: string) => {
    if (window.confirm('Are you sure you want to delete this alert?')) {
      try {
        await alertsApi.delete(alertId);
        setAlerts(alerts.filter(alert => alert.id !== alertId));
      } catch (err) {
        console.error('Error deleting alert:', err);
        setError('Failed to delete alert. Please try again.');
      }
    }
  };

  const handleCreateAlert = () => {
    navigate('/products'); // Use navigate to go to products page
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary-900">Price Alerts</h1>
        <Button onClick={handleCreateAlert} variant="primary">
          Create New Alert
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-primary-800">Loading your alerts...</div>
      ) : error ? (
        <div className="text-red-500 text-center py-10">{error}</div>
      ) : alerts.length === 0 ? (
        <Card className="text-center py-8">
          <AlertCircle className="h-12 w-12 text-primary-400 mx-auto mb-4" />
          <p className="text-primary-600 mb-4">
            Your watchlist is empty. Let's give it something to do.
          </p>
          <p className="text-sm text-primary-500">
            Tell us what you want. We'll tell you when it's acutally worth buying.
          </p>
          <Button onClick={() => navigate('/dashboard')} className="mt-4">
            Browse New Items
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <Card key={alert.id} className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-primary-800">
                  {/* Assuming product is eagerly loaded with the alert */}
                  {alert.product?.title || 'Unknown Product'}
                </h3>
                <p className="text-primary-600">
                  Target Price: ${alert.targetPrice ? parseFloat(alert.targetPrice).toFixed(2) : 'N/A'}
                </p>
                <p className="text-sm text-primary-500">
                  Created: {alert.lastNotifiedAt ? new Date(alert.lastNotifiedAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <Button variant="danger" size="sm" onClick={() => handleDeleteAlert(alert.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};