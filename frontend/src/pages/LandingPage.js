import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Shield, 
  Wallet, 
  BarChart3, 
  Zap, 
  Lock,
  DollarSign,
  Users,
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Your funds and data are protected with enterprise-grade encryption and security protocols.'
    },
    {
      icon: TrendingUp,
      title: 'Competitive Returns',
      description: 'Earn attractive interest rates on your deposits with real-time balance growth tracking.'
    },
    {
      icon: Zap,
      title: 'Instant Updates',
      description: 'Watch your balance grow in real-time with live interest calculations and notifications.'
    },
    {
      icon: Wallet,
      title: 'Easy Funding',
      description: 'Get your unique wallet address and start investing within minutes of signing up.'
    }
  ];

  const benefits = [
    'No minimum deposit required',
    'Real-time balance tracking',
    'Transparent fee structure',
    'Secure digital wallet',
    'Mobile-optimized platform',
    '24/7 customer support'
  ];

  const stats = [
    { number: '10K+', label: 'Active Investors' },
    { number: '$50M+', label: 'Assets Under Management' },
    { number: '5.2%', label: 'Average Annual Return' },
    { number: '99.9%', label: 'Platform Uptime' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Grow Your Wealth with
                <span className="block text-blue-200">Smart Investing</span>
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed">
                Join thousands of investors earning competitive returns with our secure, 
                user-friendly platform. Watch your balance grow in real-time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/register"
                  className="btn bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-4 font-semibold shadow-lg"
                >
                  Start Investing Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/login"
                  className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4 font-semibold"
                >
                  Sign In
                </Link>
              </div>
              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-1">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                  ))}
                </div>
                <span className="text-blue-100 ml-2">4.9/5 from 1,200+ reviews</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 text-gray-900">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Live Demo
                  </h3>
                  <p className="text-gray-600">See your potential earnings</p>
                </div>
                
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 text-white mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-blue-100">Current Balance</span>
                    <Wallet className="h-5 w-5 text-blue-200" />
                  </div>
                  <div className="text-3xl font-bold mb-2">$12,847.32</div>
                  <div className="text-sm text-blue-200">
                    +$47.32 earned today
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-success-600">5.2%</div>
                    <div className="text-sm text-gray-600">Annual Return</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary-600">$1,247</div>
                    <div className="text-sm text-gray-600">Total Earned</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-2">Join 10,000+ investors</div>
                  <div className="flex -space-x-2 justify-center">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="w-8 h-8 bg-primary-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-semibold">
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose BrokerPro?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for modern investors who demand security, transparency, and real-time insights into their portfolio performance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Everything You Need to Start Investing
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our platform is designed to make investing accessible and profitable for everyone, 
                from beginners to experienced investors.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <CheckCircle className="h-6 w-6 text-success-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-8 text-white">
                <div className="flex items-center mb-6">
                  <BarChart3 className="h-8 w-8 mr-3" />
                  <h3 className="text-2xl font-bold">Real-Time Dashboard</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-100">Portfolio Value</span>
                      <TrendingUp className="h-5 w-5 text-green-300" />
                    </div>
                    <div className="text-2xl font-bold">$24,567.89</div>
                    <div className="text-sm text-green-300">+12.5% this month</div>
                  </div>
                  
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-100">Interest Earned</span>
                      <DollarSign className="h-5 w-5 text-yellow-300" />
                    </div>
                    <div className="text-2xl font-bold">$1,247.32</div>
                    <div className="text-sm text-yellow-300">+$47.32 today</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Growing Your Wealth?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of investors who trust BrokerPro with their financial future. 
              Get started in less than 5 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="btn bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-4 font-semibold shadow-lg"
              >
                Create Free Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/login"
                className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4 font-semibold"
              >
                Sign In
              </Link>
            </div>
            <p className="text-blue-200 text-sm mt-6">
              No hidden fees • FDIC insured • Start with any amount
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;