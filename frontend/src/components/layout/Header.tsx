import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const { logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-primary-100 text-primary-900 p-4 shadow-md relative">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/" className="hover:text-primary-700 transition-colors">PriceDelta</Link>
        </h1>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link 
                to="/dashboard" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-200 transition-colors"
                onClick={closeMenu}
              >
                Dashboard
              </Link>
              <Link 
                to="/products" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-200 transition-colors"
                onClick={closeMenu}
              >
                Products
              </Link>
              <Link 
                to="/alerts" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-200 transition-colors"
                onClick={closeMenu}
              >
                Alerts
              </Link>
              <Link 
                to="/notifications" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-200 transition-colors"
                onClick={closeMenu}
              >
                Notifications
              </Link>
              <Link 
                to="/profile" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-200 transition-colors"
                onClick={closeMenu}
              >
                Profile
              </Link>
              <button 
                onClick={logout} 
                className="px-3 py-2 rounded-md text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-200 transition-colors"
                onClick={closeMenu}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-3 py-2 rounded-md text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                onClick={closeMenu}
              >
                Register
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-md hover:bg-primary-200 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation - Fixed positioning */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-primary-100 border-t border-primary-200 shadow-lg z-50">
          <nav className="container mx-auto py-4 flex flex-col space-y-2">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-200 transition-colors"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/products" 
                  className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-200 transition-colors"
                  onClick={closeMenu}
                >
                  Products
                </Link>
                <Link 
                  to="/alerts" 
                  className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-200 transition-colors"
                  onClick={closeMenu}
                >
                  Alerts
                </Link>
                <Link 
                  to="/notifications" 
                  className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-200 transition-colors"
                  onClick={closeMenu}
                >
                  Notifications
                </Link>
                <Link 
                  to="/profile" 
                  className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-200 transition-colors"
                  onClick={closeMenu}
                >
                  Profile
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    closeMenu();
                  }} 
                  className="w-full text-left px-3 py-2 rounded-md text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-200 transition-colors"
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="block px-3 py-2 rounded-md text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
