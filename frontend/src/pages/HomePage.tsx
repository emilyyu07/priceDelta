import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Tag, TrendingDown } from 'lucide-react';
import { alertsApi } from '../api/alerts';
import { notificationsApi } from '../api/notifications';
import { useAuth } from '../hooks/useAuth';

export const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [activeAlertsCount, setActiveAlertsCount] = useState<number>(0);
  const [priceDropsCount, setPriceDropsCount] = useState<number>(0);
  const [dealsNotifiedCount, setDealsNotifiedCount] = useState<number>(0);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setStatsLoading(false);
      return;
    }
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
    fetchStats();
  }, [isAuthenticated]);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-8 text-white mb-8">
        <h1 className="text-4xl font-bold mb-4">Smart tracking, smarter spending.</h1>
        <p className="text-xl mb-6">Get notified when prices drop on your favorite products! It's that easy.</p>
        <Link
          to="/products"
          className="inline-block bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Start Browsing
        </Link>
      </div>

      {/* Stats Grid - real data when logged in */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-primary-50 p-6 rounded-lg border border-primary-200 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Active Alerts</h3>
            <AlertCircle className="h-6 w-6 text-primary-600" />
          </div>
          <p className="text-3xl font-bold text-primary-900">
            {statsLoading ? '…' : !isAuthenticated ? '—' : activeAlertsCount}
          </p>
          <p className="text-sm text-primary-600 mt-2">Watching for price drops</p>
        </div>

        <div className="bg-primary-50 p-6 rounded-lg border border-primary-200 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Price Drops</h3>
            <TrendingDown className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-primary-900">
            {statsLoading ? '…' : !isAuthenticated ? '—' : priceDropsCount}
          </p>
          <p className="text-sm text-primary-600 mt-2">Price drop notifications</p>
        </div>

        <div className="bg-primary-50 p-6 rounded-lg border border-primary-200 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Deals Notified</h3>
            <Tag className="h-6 w-6 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-primary-900">
            {statsLoading ? '…' : !isAuthenticated ? '—' : dealsNotifiedCount}
          </p>
          <p className="text-sm text-primary-600 mt-2">Price drops & target reached</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-primary-50 p-6 rounded-lg border border-primary-200">
        <h2 className="text-xl font-bold text-primary-800 mb-4">Recent Price Drops</h2>
        <div className="text-primary-600">
          No recent price drops. Start tracking products to see deals here!
        </div>
      </div>
    </div>
  );
};