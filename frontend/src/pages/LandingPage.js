import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Shield, 
  Wallet, 
  BarChart3, 
  Zap, 
  DollarSign,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Award,
  Lock,
  Smartphone,
  Clock,
  Globe
} from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Enterprise-grade encryption with multi-layer security protocols and regulatory compliance.'
    },
    {
      icon: TrendingUp,
      title: 'Competitive Returns',
      description: 'Earn up to 5.2% APY with real-time compounding and transparent fee structure.'
    },
    {
      icon: Zap,
      title: 'Real-Time Updates',
      description: 'Live portfolio tracking with instant notifications and real-time market data feeds.'
    },
    {
      icon: Wallet,
      title: 'Digital Wallet',
      description: 'Secure digital wallet with unique addresses and instant transaction processing.'
    }
  ];

  const benefits = [
    'No minimum balance required',
    'Real-time portfolio tracking',
    'Institutional-grade security',
    'Mobile-optimized platform',
    'Transparent pricing',
    '24/7 customer support'
  ];

  const stats = [
    { number: '25K+', label: 'Active Clients', change: '+12% this quarter' },
    { number: '$180M+', label: 'Assets Under Management', change: '+8% this month' },
    { number: '5.2%', label: 'Current APY', change: 'Market leading' },
    { number: '99.9%', label: 'Platform Uptime', change: 'SLA guaranteed' }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Portfolio Manager',
      content: 'The real-time tracking and professional tools have transformed how I manage investments.',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      role: 'Financial Advisor', 
      content: 'Best-in-class security and competitive returns. My clients love the transparency.',
      rating: 5
    },
    {
      name: 'Emily Foster',
      role: 'Investment Analyst',
      content: 'Institutional features with retail accessibility. The perfect platform for serious investors.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <Award className="h-3 w-3 mr-1" />
                  Award-winning platform
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Professional Investment Platform for
                <span className="block text-blue-300">Modern Portfolios</span>
              </h1>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-xl">
                Join institutional and retail investors earning competitive returns with our secure, 
                regulated platform. Advanced tools, real-time data, transparent pricing.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
                <Link
                  to="/register"
                  className="btn-primary btn-large px-6 py-3 bg-white text-blue-900 hover:bg-gray-100 font-semibold"
                >
                  Open Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  to="/login"
                  className="btn-secondary btn-large px-6 py-3 border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold"
                >
                  Client Login
                </Link>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-6 text-xs text-blue-200">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-1" />
                  FDIC Insured
                </div>
                <div className="flex items-center">
                  <Lock className="h-4 w-4 mr-1" />
                  SEC Regulated
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-1" />
                  Global Access
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-lg shadow-2xl p-6 text-gray-900">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Live Portfolio Demo
                  </h3>
                  <p className="text-xs text-gray-600">Real-time market data</p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-4 text-white mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs opacity-90">Portfolio Value</span>
                    <div className="flex items-center text-xs opacity-75">
                      <Zap className="h-3 w-3 mr-1" />
                      Live
                    </div>
                  </div>
                  <div className="text-2xl font-bold mb-2">$247,856.32</div>
                  <div className="flex items-center justify-between text-xs opacity-90">
                    <span className="flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +$1,247.32 today
                    </span>
                    <span>+0.51%</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-lg font-bold text-green-600">5.2%</div>
                    <div className="text-xs text-gray-600">Current APY</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-lg font-bold text-blue-600">$12.4K</div>
                    <div className="text-xs text-gray-600">This Year</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-lg font-bold text-gray-900">247</div>
                    <div className="text-xs text-gray-600">Days Active</div>
                  </div>
                </div>
                
                <div className="text-center border-t pt-4">
                  <div className="text-xs text-gray-500 mb-2">Trusted by 25,000+ investors</div>
                  <div className="flex justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                    ))}
                    <span className="text-xs text-gray-600 ml-2">4.9/5 rating</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.number}
                </div>
                <div className="text-xs font-medium text-gray-700 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-green-600">
                  {stat.change}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Why Professional Investors Choose BrokerPro
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Built for institutional standards with retail accessibility. Advanced features, 
              transparent pricing, and regulatory compliance you can trust.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow duration-300"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Everything You Need for Professional Investing
              </h2>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Our platform combines institutional-grade tools with user-friendly design, 
                making sophisticated investing accessible to everyone.
              </p>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-xs font-medium text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex space-x-3">
                <Link
                  to="/register"
                  className="btn-primary btn-large px-4 py-2"
                >
                  Get Started
                </Link>
                <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                  Schedule Demo →
                </button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-lg shadow-lg border p-6">
                <div className="flex items-center mb-4">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                  <h3 className="text-sm font-semibold text-gray-900">Portfolio Analytics</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-600">Asset Allocation</span>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="text-lg font-bold text-gray-900">$180,247.89</div>
                    <div className="text-xs text-green-600">+2.4% this week</div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-600">Performance</span>
                      <DollarSign className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="text-lg font-bold text-gray-900">+12.4%</div>
                    <div className="text-xs text-blue-600">YTD returns</div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="text-sm font-semibold text-gray-900">5.2%</div>
                      <div className="text-xs text-gray-600">APY</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="text-sm font-semibold text-gray-900">0.15%</div>
                      <div className="text-xs text-gray-600">Fees</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="text-sm font-semibold text-gray-900">1.2</div>
                      <div className="text-xs text-gray-600">Sharpe</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Trusted by Investment Professionals
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              See what portfolio managers, financial advisors, and analysts say about our platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border rounded-lg p-6 bg-gray-50"
              >
                <div className="flex space-x-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                  ))}
                </div>
                <p className="text-xs text-gray-700 mb-4 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="text-xs font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-xs text-gray-600">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Elevate Your Investment Strategy?
            </h2>
            <p className="text-sm text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of professional investors who trust BrokerPro with their portfolios. 
              Open your account in minutes and start earning competitive returns today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/register"
                className="btn-primary btn-large px-6 py-3 bg-white text-blue-900 hover:bg-gray-100 font-semibold"
              >
                Open Account Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/login"
                className="btn-secondary btn-large px-6 py-3 border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold"
              >
                Client Login
              </Link>
            </div>
            <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-blue-200">
              <span>No account minimums</span>
              <span>•</span>
              <span>FDIC insured</span>
              <span>•</span>
              <span>SEC regulated</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <div className="p-1 bg-blue-600 rounded">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-semibold">BrokerPro</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Professional investment platform trusted by thousands of investors worldwide.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold mb-3 uppercase tracking-wide">Platform</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold mb-3 uppercase tracking-wide">Support</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold mb-3 uppercase tracking-wide">Legal</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Disclosures</a></li>
                <li><a href="#" className="hover:text-white">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center">
            <p className="text-xs text-gray-400">
              © 2024 BrokerPro. All rights reserved. Securities offered through BrokerPro Securities LLC, member FINRA/SIPC.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;