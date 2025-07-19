'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, Award, Globe, TrendingUp, Target, Heart, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "Your assets and data are protected by military-grade encryption and multi-factor authentication."
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "We continuously develop cutting-edge trading tools and investment strategies for our clients."
    },
    {
      icon: Heart,
      title: "Client Success",
      description: "Your financial success is our mission. We provide personalized support and guidance."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Serving traders in over 80 countries with 24/7 support in multiple languages."
    }
  ];

  const team = [
    {
      name: "David Chen",
      role: "CEO & Founder",
      background: "Former Goldman Sachs VP with 15+ years in financial technology",
      image: "👨‍💼"
    },
    {
      name: "Sarah Williams",
      role: "CTO",
      background: "Ex-Google engineer specializing in blockchain and cryptocurrency systems",
      image: "👩‍💻"
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Security",
      background: "Cybersecurity expert with experience at NSA and top financial institutions",
      image: "👨‍🔬"
    },
    {
      name: "Emily Zhang",
      role: "Chief Investment Officer",
      background: "Former hedge fund manager with proven track record in crypto markets",
      image: "👩‍💼"
    }
  ];

  const stats = [
    { number: "$2.8B+", label: "Total Trading Volume" },
    { number: "250K+", label: "Active Users" },
    { number: "80+", label: "Countries Served" },
    { number: "99.9%", label: "Uptime Record" }
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl font-bold text-white mb-6"
            >
              Revolutionizing 
              <span className="gradient-text block">Cryptocurrency Investment</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Founded in 2021, OctaTrade has emerged as a leading cryptocurrency investment platform, 
              trusted by over 250,000 traders worldwide. We combine institutional-grade security 
              with innovative technology to democratize access to digital asset markets.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-amber-400">{stat.number}</div>
                  <div className="text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 bg-slate-800/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
                <p className="text-gray-300 text-lg mb-6">
                  At OctaTrade, we believe that everyone should have access to professional-grade 
                  cryptocurrency trading tools and investment opportunities. Our mission is to break 
                  down the barriers that traditionally separate retail and institutional investors.
                </p>
                <p className="text-gray-300 text-lg mb-8">
                  We've built a platform that combines the security and sophistication of institutional 
                  trading with the accessibility and user experience that retail investors deserve. 
                  Every feature, from our advanced charting tools to our AI-powered market insights, 
                  is designed with one goal in mind: your success.
                </p>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-amber-400 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Democratizing Finance</h3>
                    <p className="text-gray-400 text-sm">Making advanced trading accessible to everyone</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-2 gap-6"
              >
                {values.map((value, index) => (
                  <div key={index} className="card text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-amber-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                    <p className="text-gray-400 text-sm">{value.description}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Meet Our Leadership Team
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Led by industry veterans with decades of combined experience in finance, 
                technology, and cryptocurrency markets.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card text-center"
                >
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                  <div className="text-amber-400 font-medium mb-3">{member.role}</div>
                  <p className="text-gray-400 text-sm">{member.background}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 bg-slate-800/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-white mb-6">
                  Cutting-Edge Technology
                </h2>
                <p className="text-gray-300 text-lg mb-6">
                  Our platform is built on state-of-the-art technology infrastructure designed 
                  for speed, security, and scalability. We leverage cloud computing, advanced 
                  algorithms, and machine learning to provide you with the best possible trading experience.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Lightning-Fast Execution</h4>
                      <p className="text-gray-400 text-sm">Sub-millisecond order execution and real-time market data</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                      <Shield className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Bank-Level Security</h4>
                      <p className="text-gray-400 text-sm">Multi-layer security with cold storage and insurance coverage</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mt-1">
                      <Users className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Scalable Infrastructure</h4>
                      <p className="text-gray-400 text-sm">Built to handle millions of transactions with 99.9% uptime</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="card"
              >
                <h3 className="text-xl font-semibold text-white mb-4">Platform Highlights</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Order Execution Speed</span>
                    <span className="text-green-400 font-medium">&lt;10ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">API Response Time</span>
                    <span className="text-green-400 font-medium">&lt;50ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">System Uptime</span>
                    <span className="text-green-400 font-medium">99.9%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Data Centers</span>
                    <span className="text-blue-400 font-medium">Global</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Security Audits</span>
                    <span className="text-amber-400 font-medium">Quarterly</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                Ready to Join Our Community?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Experience the difference that professional-grade tools and institutional security can make in your trading journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/auth/register" className="btn-primary">
                  Start Trading Today
                </a>
                <a href="/contact" className="btn-secondary">
                  Talk to Our Team
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}