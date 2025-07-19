'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, TrendingUp, User, LogOut, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Features', href: '/features' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const userNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: TrendingUp },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <nav className="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-amber-400 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">OctaTrade</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User menu / Auth buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-amber-400 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden md:block text-gray-300">{user.name}</span>
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg border border-slate-700 py-1 z-50"
                    >
                      {userNavigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-slate-700 hover:text-white transition-colors duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <item.icon className="w-4 h-4 mr-3" />
                          {item.name}
                        </Link>
                      ))}
                      <hr className="my-1 border-slate-700" />
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-slate-700 hover:text-white transition-colors duration-200"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/login"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="btn-primary"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-700"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                {!user && (
                  <>
                    <Link
                      href="/auth/login"
                      className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/register"
                      className="block px-3 py-2 text-base font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}