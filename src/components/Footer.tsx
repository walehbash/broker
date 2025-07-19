'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, Mail, Phone, MapPin, Shield, Lock, CheckCircle } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Features', href: '/features' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Risk Disclosure', href: '/risk-disclosure' },
    { name: 'Compliance', href: '/compliance' },
  ];

  const supportLinks = [
    { name: 'Help Center', href: '/help' },
    { name: 'Live Chat', href: '/chat' },
    { name: 'API Documentation', href: '/api-docs' },
    { name: 'Trading Guides', href: '/guides' },
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-amber-400 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">OctaTrade</span>
            </div>
            <p className="text-gray-400 mb-6">
              Professional cryptocurrency investment platform trusted by traders worldwide. 
              Secure, intelligent, and designed for serious investors.
            </p>
            
            {/* Security Badges */}
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-300">
                <Shield className="w-4 h-4 text-green-400 mr-2" />
                Bank-Level Security
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Lock className="w-4 h-4 text-green-400 mr-2" />
                256-bit SSL Encryption
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                KYC/AML Compliant
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-sm text-gray-400">
                <Mail className="w-4 h-4 mr-2" />
                support@octatrade.com
              </li>
              <li className="flex items-center text-sm text-gray-400">
                <Phone className="w-4 h-4 mr-2" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-start text-sm text-gray-400">
                <MapPin className="w-4 h-4 mr-2 mt-0.5" />
                <span>
                  123 Financial District<br />
                  New York, NY 10005
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-slate-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <p className="text-sm text-gray-400">
              © 2024 OctaTrade. All rights reserved.
            </p>
          </div>
        </div>

        {/* Risk Warning */}
        <div className="border-t border-slate-700 mt-6 pt-6">
          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong className="text-gray-300">Risk Warning:</strong> Trading cryptocurrencies involves substantial risk of loss and is not suitable for all investors. 
              Past performance does not guarantee future results. You should carefully consider whether trading is suitable for you in light of your circumstances, 
              knowledge, and financial resources. OctaTrade is a technology platform and does not provide investment advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}