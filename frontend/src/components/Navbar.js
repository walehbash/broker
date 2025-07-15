import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  TrendingUp, 
  User, 
  LogOut, 
  Menu, 
  X, 
  BarChart3,
  Home,
  UserCircle,
  Settings,
  HelpCircle
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <nav className="professional-header sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-12">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to={user ? "/dashboard" : "/"} className="flex items-center space-x-2">
              <div className="p-1 bg-blue-600 rounded">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-900">
                BrokerPro
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {user ? (
              // Authenticated navigation
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded text-xs font-medium transition-colors duration-200 ${
                    isActive('/dashboard') 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <BarChart3 className="h-3 w-3" />
                  <span>Dashboard</span>
                </Link>
                
                {/* Account Balance Display */}
                <div className="px-3 py-1 bg-gray-100 rounded text-xs font-medium text-gray-700">
                  ${(user.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                
                {/* User menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-1 px-2 py-1.5 rounded hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-xs font-medium text-gray-700 max-w-20 truncate">
                      {user.name}
                    </span>
                  </button>

                  {/* User dropdown menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-1 w-48 bg-white rounded border border-gray-200 shadow-lg py-1 z-50">
                      <div className="px-3 py-2 border-b border-gray-100">
                        <div className="text-xs font-medium text-gray-900">{user.name}</div>
                        <div className="text-2xs text-gray-500">{user.email}</div>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"
                      >
                        <UserCircle className="h-3 w-3 mr-2" />
                        Account Settings
                      </Link>
                      <Link
                        to="/help"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"
                      >
                        <HelpCircle className="h-3 w-3 mr-2" />
                        Help & Support
                      </Link>
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-3 py-2 text-xs text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="h-3 w-3 mr-2" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              // Guest navigation
              <>
                <Link
                  to="/"
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors duration-200 ${
                    isActive('/') 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/login"
                  className="btn-secondary text-xs"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-xs"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1 rounded text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user ? (
              // Authenticated mobile menu
              <>
                <div className="px-3 py-2 border-b border-gray-100 mb-2">
                  <div className="text-xs font-medium text-gray-900">{user.name}</div>
                  <div className="text-2xs text-gray-500">Balance: ${(user.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
                <Link
                  to="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded text-xs font-medium ${
                    isActive('/dashboard') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded text-xs font-medium ${
                    isActive('/profile') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <UserCircle className="h-4 w-4" />
                  <span>Account Settings</span>
                </Link>
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full text-left px-3 py-2 rounded text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            ) : (
              // Guest mobile menu
              <>
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded text-xs font-medium ${
                    isActive('/') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-xs font-medium"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;