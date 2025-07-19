'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Shield, 
  TrendingUp, 
  Wallet, 
  Headphones, 
  Users, 
  Star,
  ArrowRight,
  CheckCircle,
  Bitcoin,
  DollarSign,
  BarChart3
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomePage() {
  const features = [
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Advanced encryption and multi-layer security protocols protect your investments with institutional-grade protection."
    },
    {
      icon: Wallet,
      title: "Integrated Crypto Wallet",
      description: "Seamlessly manage your cryptocurrency portfolio with our built-in wallet system and real-time balance updates."
    },
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      description: "Professional trading tools and comprehensive market analysis to maximize your investment potential."
    },
    {
      icon: Headphones,
      title: "24/7 Expert Support",
      description: "Round-the-clock customer support from our team of cryptocurrency and investment specialists."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Portfolio Manager",
      content: "OctaTrade's platform has revolutionized how I manage crypto investments. The security features and analytics are unmatched.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Day Trader",
      content: "Finally, a platform that combines institutional-grade tools with user-friendly design. My returns have increased significantly.",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Investment Advisor",
      content: "The real-time wallet integration and PayPal support make it incredibly convenient for my clients to start investing.",
      rating: 5
    }
  ];

  const stats = [
    { label: "Active Traders", value: "250K+" },
    { label: "Total Volume", value: "$2.8B+" },
    { label: "Supported Coins", value: "150+" },
    { label: "Countries", value: "80+" }
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-900 to-amber-900/20"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-6xl font-bold text-white mb-6"
            >
              Professional Cryptocurrency
              <span className="gradient-text block">Investment Platform</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Join the future of digital finance with OctaTrade's cutting-edge platform. 
              Secure, intelligent, and designed for serious investors.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/auth/register" className="btn-primary flex items-center">
                Start Trading Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/features" className="btn-secondary">
                Explore Features
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-amber-400">{stat.value}</div>
                  <div className="text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Choose OctaTrade?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experience the perfect blend of security, performance, and user experience 
              in cryptocurrency investment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-amber-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Options */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Multiple Ways to Fund Your Account
            </h2>
            <p className="text-gray-400 text-lg">
              Choose from various funding methods to start your investment journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="card"
            >
              <Bitcoin className="w-12 h-12 text-amber-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Cryptocurrency Deposits</h3>
              <p className="text-gray-400 mb-4">
                Direct crypto transfers to your unique wallet address with real-time balance updates.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Bitcoin, Ethereum, and 150+ coins
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Instant confirmations
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card"
            >
              <DollarSign className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">PayPal Integration</h3>
              <p className="text-gray-400 mb-4">
                Quick and secure funding through PayPal for immediate trading access.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Instant deposits
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Secure payments
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card"
            >
              <BarChart3 className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Advanced Trading</h3>
              <p className="text-gray-400 mb-4">
                Professional tools and analytics for sophisticated investment strategies.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Real-time charts
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Portfolio analytics
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Trusted by Professional Traders
            </h2>
            <p className="text-gray-400 text-lg">
              See what our clients say about their OctaTrade experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900/20 to-amber-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of successful traders who trust OctaTrade with their cryptocurrency investments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register" className="btn-primary flex items-center justify-center">
                Create Free Account
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Contact Our Experts
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}