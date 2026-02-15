import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { useAuth } from '../../hooks/useAuth';

export const Header: React.FC = () => {
  const { logout, isAuthenticated } = useAuth(); // Get isAuthenticated

  return (
    <header className="bg-primary-100 text-primary-900 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/" className="hover:text-primary-700 transition-colors">PriceDelta</Link>
        </h1>
        <nav>
          {isAuthenticated ? (
            <>
              <Link to="/home" className="mr-4 px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-200 transition-colors">Home</Link>
              <Link to="/dashboard" className="mr-4 px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-200 transition-colors">Dashboard</Link>
              <Link to="/products" className="mr-4 px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-200 transition-colors">Products</Link>
              <Link to="/alerts" className="mr-4 px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-200 transition-colors">Alerts</Link>
              <Link to="/notifications" className="mr-4 px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-200 transition-colors">Notifications</Link>
              <Link to="/profile" className="mr-4 px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-200 transition-colors">Profile</Link>
              <button onClick={logout} className="px-3 py-2 rounded-md text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4 px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-200 transition-colors">Login</Link>
              <Link to="/register" className="px-3 py-2 rounded-md text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
