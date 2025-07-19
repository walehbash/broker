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
    <div className="min-h-screen bg-slate-900" data-bs-theme="dark">
      <Navbar />
      
      {/* Hero Section with Bootstrap Container */}
      <section className="position-relative px-4 py-5 overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-br from-blue-900/20 via-slate-900 to-amber-900/20"></div>
        <div className="container-fluid-custom position-relative">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 text-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="display-3 fw-bold text-white mb-4"
              >
                Professional Cryptocurrency
                <span className="gradient-text d-block">Investment Platform</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lead text-gray-300 mb-4"
              >
                Join the future of digital finance with OctaTrade's cutting-edge platform. 
                Secure, intelligent, and designed for serious investors.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-5"
              >
                <Link href="/auth/register" className="btn btn-primary btn-lg shadow-glow">
                  <span className="d-flex align-items-center justify-content-center">
                    Start Trading Now
                    <ArrowRight className="ms-2" size={20} />
                  </span>
                </Link>
                <Link href="/features" className="btn btn-outline-warning btn-lg">
                  Explore Features
                </Link>
              </motion.div>

              {/* Stats with Bootstrap Grid */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="row g-4 mt-4"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="col-6 col-md-3">
                    <div className="text-center">
                      <div className="display-6 fw-bold text-warning">{stat.value}</div>
                      <div className="text-muted small">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Bootstrap Cards */}
      <section className="py-5">
        <div className="container-fluid-custom">
          <div className="row justify-content-center mb-5">
            <div className="col-12 col-lg-8 text-center">
              <h2 className="display-5 fw-bold text-white mb-3">
                Why Choose OctaTrade?
              </h2>
              <p className="lead text-muted">
                Experience the perfect blend of security, performance, and user experience 
                in cryptocurrency investment.
              </p>
            </div>
          </div>

          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-3">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card h-100 border-0 shadow-lg hover-card"
                >
                  <div className="card-body text-center p-4">
                    <div className="d-inline-flex align-items-center justify-content-center bg-gradient-primary rounded-3 mb-3" style={{width: '48px', height: '48px'}}>
                      <feature.icon className="text-white" size={24} />
                    </div>
                    <h5 className="card-title text-white mb-3">{feature.title}</h5>
                    <p className="card-text text-muted">{feature.description}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Options with Bootstrap Utility Classes */}
      <section className="py-5 bg-secondary bg-opacity-50">
        <div className="container-fluid-custom">
          <div className="row justify-content-center mb-5">
            <div className="col-12 col-lg-8 text-center">
              <h2 className="display-5 fw-bold text-white mb-3">
                Multiple Ways to Fund Your Account
              </h2>
              <p className="lead text-muted">
                Choose from various funding methods to start your investment journey
              </p>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-4">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="card h-100 border-0 shadow-lg"
              >
                <div className="card-body p-4">
                  <Bitcoin className="text-warning mb-3" size={48} />
                  <h5 className="card-title text-white mb-3">Cryptocurrency Deposits</h5>
                  <p className="card-text text-muted mb-4">
                    Direct crypto transfers to your unique wallet address with real-time balance updates.
                  </p>
                  <ul className="list-unstyled">
                    <li className="d-flex align-items-center text-light mb-2">
                      <CheckCircle className="text-success me-2" size={16} />
                      <small>Bitcoin, Ethereum, and 150+ coins</small>
                    </li>
                    <li className="d-flex align-items-center text-light mb-2">
                      <CheckCircle className="text-success me-2" size={16} />
                      <small>Instant confirmations</small>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="card h-100 border-0 shadow-lg"
              >
                <div className="card-body p-4">
                  <DollarSign className="text-info mb-3" size={48} />
                  <h5 className="card-title text-white mb-3">PayPal Integration</h5>
                  <p className="card-text text-muted mb-4">
                    Quick and secure funding through PayPal for immediate trading access.
                  </p>
                  <ul className="list-unstyled">
                    <li className="d-flex align-items-center text-light mb-2">
                      <CheckCircle className="text-success me-2" size={16} />
                      <small>Instant deposits</small>
                    </li>
                    <li className="d-flex align-items-center text-light mb-2">
                      <CheckCircle className="text-success me-2" size={16} />
                      <small>Secure payments</small>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="card h-100 border-0 shadow-lg"
              >
                <div className="card-body p-4">
                  <BarChart3 className="text-success mb-3" size={48} />
                  <h5 className="card-title text-white mb-3">Advanced Trading</h5>
                  <p className="card-text text-muted mb-4">
                    Professional tools and analytics for sophisticated investment strategies.
                  </p>
                  <ul className="list-unstyled">
                    <li className="d-flex align-items-center text-light mb-2">
                      <CheckCircle className="text-success me-2" size={16} />
                      <small>Real-time charts</small>
                    </li>
                    <li className="d-flex align-items-center text-light mb-2">
                      <CheckCircle className="text-success me-2" size={16} />
                      <small>Portfolio analytics</small>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials with Bootstrap Carousel */}
      <section className="py-5">
        <div className="container-fluid-custom">
          <div className="row justify-content-center mb-5">
            <div className="col-12 col-lg-8 text-center">
              <h2 className="display-5 fw-bold text-white mb-3">
                Trusted by Professional Traders
              </h2>
              <p className="lead text-muted">
                See what our clients say about their OctaTrade experience
              </p>
            </div>
          </div>

          <div className="row g-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card h-100 border-0 shadow-lg"
                >
                  <div className="card-body p-4">
                    <div className="d-flex mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="text-warning" size={16} fill="currentColor" />
                      ))}
                    </div>
                    <blockquote className="blockquote">
                      <p className="text-light fst-italic mb-3">"{testimonial.content}"</p>
                    </blockquote>
                    <div className="d-flex align-items-center">
                      <div>
                        <div className="fw-semibold text-white">{testimonial.name}</div>
                        <small className="text-muted">{testimonial.role}</small>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Bootstrap Alerts */}
      <section className="py-5 bg-gradient-to-r from-blue-900/20 to-amber-900/20">
        <div className="container-fluid-custom">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <h2 className="display-5 fw-bold text-white mb-4">
                  Ready to Start Your Investment Journey?
                </h2>
                <p className="lead text-muted mb-4">
                  Join thousands of successful traders who trust OctaTrade with their cryptocurrency investments.
                </p>
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  <Link href="/auth/register" className="btn btn-primary btn-lg shadow-glow">
                    <span className="d-flex align-items-center justify-content-center">
                      Create Free Account
                      <ArrowRight className="ms-2" size={20} />
                    </span>
                  </Link>
                  <Link href="/contact" className="btn btn-outline-warning btn-lg">
                    Contact Our Experts
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}