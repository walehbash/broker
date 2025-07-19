'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, Award, Globe, TrendingUp, Target, Heart, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Head from 'next/head';

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
    <>
      <Head>
        <title>About OctaTrade - Leading Cryptocurrency Investment Platform</title>
        <meta name="description" content="Learn about OctaTrade's mission to democratize cryptocurrency investment. Meet our expert team and discover our cutting-edge technology serving 250K+ traders worldwide." />
        <meta name="keywords" content="about octatrade, cryptocurrency company, fintech team, crypto investment platform, blockchain technology, trading platform leadership" />
        <meta property="og:title" content="About OctaTrade - Leading Cryptocurrency Investment Platform" />
        <meta property="og:description" content="Learn about OctaTrade's mission to democratize cryptocurrency investment with institutional-grade security and cutting-edge technology." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://octatrade.com/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About OctaTrade - Leading Cryptocurrency Investment Platform" />
        <meta name="twitter:description" content="Meet the team behind OctaTrade's revolutionary cryptocurrency investment platform serving 250K+ traders worldwide." />
        <link rel="canonical" href="https://octatrade.com/about" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "OctaTrade",
              "description": "Professional cryptocurrency investment platform with advanced trading tools and institutional-grade security.",
              "url": "https://octatrade.com",
              "logo": "https://octatrade.com/logo.png",
              "foundingDate": "2021",
              "founders": [
                {
                  "@type": "Person",
                  "name": "David Chen",
                  "jobTitle": "CEO & Founder"
                }
              ],
              "employee": [
                {
                  "@type": "Person",
                  "name": "David Chen",
                  "jobTitle": "CEO & Founder"
                },
                {
                  "@type": "Person",
                  "name": "Sarah Williams",
                  "jobTitle": "CTO"
                },
                {
                  "@type": "Person",
                  "name": "Michael Rodriguez",
                  "jobTitle": "Head of Security"
                },
                {
                  "@type": "Person",
                  "name": "Emily Zhang",
                  "jobTitle": "Chief Investment Officer"
                }
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Financial District",
                "addressLocality": "New York",
                "addressRegion": "NY",
                "postalCode": "10005",
                "addressCountry": "US"
              }
            })
          }}
        />
      </Head>
      
      <div className="min-h-screen bg-slate-900" data-bs-theme="dark">
        <Navbar />
        
        <div className="pt-16">
          {/* Hero Section with Bootstrap */}
          <section className="py-5">
            <div className="container-fluid-custom">
              <div className="row justify-content-center">
                <div className="col-12 col-lg-10 text-center">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="display-3 fw-bold text-white mb-4"
                  >
                    Revolutionizing 
                    <span className="gradient-text d-block">Cryptocurrency Investment</span>
                  </motion.h1>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="lead text-gray-300 mb-4"
                  >
                    Founded in 2021, OctaTrade has emerged as a leading cryptocurrency investment platform, 
                    trusted by over 250,000 traders worldwide. We combine institutional-grade security 
                    with innovative technology to democratize access to digital asset markets.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="row g-4"
                  >
                    {stats.map((stat, index) => (
                      <div key={index} className="col-6 col-md-3">
                        <div className="text-center">
                          <div className="display-6 fw-bold text-warning">{stat.number}</div>
                          <div className="text-muted small">{stat.label}</div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* Mission Section with Bootstrap Grid */}
          <section className="py-5 bg-secondary bg-opacity-50">
            <div className="container-fluid-custom">
              <div className="row align-items-center g-5">
                <div className="col-12 col-lg-6">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="display-5 fw-bold text-white mb-4">Our Mission</h2>
                    <p className="text-gray-300 fs-5 mb-4">
                      At OctaTrade, we believe that everyone should have access to professional-grade 
                      cryptocurrency trading tools and investment opportunities. Our mission is to break 
                      down the barriers that traditionally separate retail and institutional investors.
                    </p>
                    <p className="text-gray-300 fs-5 mb-4">
                      We've built a platform that combines the security and sophistication of institutional 
                      trading with the accessibility and user experience that retail investors deserve. 
                      Every feature, from our advanced charting tools to our AI-powered market insights, 
                      is designed with one goal in mind: your success.
                    </p>
                    
                    <div className="d-flex align-items-center">
                      <div className="d-inline-flex align-items-center justify-content-center bg-gradient-primary rounded-3 me-3" style={{width: '48px', height: '48px'}}>
                        <Target className="text-white" size={24} />
                      </div>
                      <div>
                        <h5 className="text-white fw-semibold mb-1">Democratizing Finance</h5>
                        <p className="text-muted small mb-0">Making advanced trading accessible to everyone</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="col-12 col-lg-6">
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="row g-3"
                  >
                    {values.map((value, index) => (
                      <div key={index} className="col-12 col-sm-6">
                        <div className="card h-100 border-0 shadow-lg text-center">
                          <div className="card-body p-4">
                            <div className="d-inline-flex align-items-center justify-content-center bg-gradient-primary rounded-3 mb-3" style={{width: '48px', height: '48px'}}>
                              <value.icon className="text-white" size={24} />
                            </div>
                            <h5 className="card-title text-white mb-2">{value.title}</h5>
                            <p className="card-text text-muted small">{value.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* Team Section with Bootstrap Cards */}
          <section className="py-5">
            <div className="container-fluid-custom">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="row justify-content-center mb-5"
              >
                <div className="col-12 col-lg-8 text-center">
                  <h2 className="display-5 fw-bold text-white mb-3">
                    Meet Our Leadership Team
                  </h2>
                  <p className="lead text-muted">
                    Led by industry veterans with decades of combined experience in finance, 
                    technology, and cryptocurrency markets.
                  </p>
                </div>
              </motion.div>

              <div className="row g-4">
                {team.map((member, index) => (
                  <div key={index} className="col-12 col-sm-6 col-lg-3">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="card h-100 border-0 shadow-lg text-center"
                    >
                      <div className="card-body p-4">
                        <div className="fs-1 mb-3">{member.image}</div>
                        <h5 className="card-title text-white mb-1">{member.name}</h5>
                        <div className="text-warning fw-medium mb-3">{member.role}</div>
                        <p className="card-text text-muted small">{member.background}</p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Technology Section */}
          <section className="py-5 bg-secondary bg-opacity-50">
            <div className="container-fluid-custom">
              <div className="row align-items-center g-5">
                <div className="col-12 col-lg-6">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="display-5 fw-bold text-white mb-4">
                      Cutting-Edge Technology
                    </h2>
                    <p className="text-gray-300 fs-5 mb-4">
                      Our platform is built on state-of-the-art technology infrastructure designed 
                      for speed, security, and scalability. We leverage cloud computing, advanced 
                      algorithms, and machine learning to provide you with the best possible trading experience.
                    </p>
                    
                    <div className="vstack gap-3">
                      <div className="d-flex align-items-start">
                        <div className="bg-success rounded-circle d-flex align-items-center justify-content-center me-3 mt-1" style={{width: '24px', height: '24px'}}>
                          <Zap className="text-white" size={12} />
                        </div>
                        <div>
                          <h6 className="text-white fw-medium mb-1">Lightning-Fast Execution</h6>
                          <p className="text-muted small mb-0">Sub-millisecond order execution and real-time market data</p>
                        </div>
                      </div>
                      
                      <div className="d-flex align-items-start">
                        <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3 mt-1" style={{width: '24px', height: '24px'}}>
                          <Shield className="text-white" size={12} />
                        </div>
                        <div>
                          <h6 className="text-white fw-medium mb-1">Bank-Level Security</h6>
                          <p className="text-muted small mb-0">Multi-layer security with cold storage and insurance coverage</p>
                        </div>
                      </div>
                      
                      <div className="d-flex align-items-start">
                        <div className="bg-info rounded-circle d-flex align-items-center justify-content-center me-3 mt-1" style={{width: '24px', height: '24px'}}>
                          <Users className="text-white" size={12} />
                        </div>
                        <div>
                          <h6 className="text-white fw-medium mb-1">Scalable Infrastructure</h6>
                          <p className="text-muted small mb-0">Built to handle millions of transactions with 99.9% uptime</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="col-12 col-lg-6">
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="card border-0 shadow-lg"
                  >
                    <div className="card-body p-4">
                      <h5 className="card-title text-white mb-4">Platform Highlights</h5>
                      <div className="vstack gap-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="text-gray-300">Order Execution Speed</span>
                          <span className="text-success fw-medium">&lt;10ms</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="text-gray-300">API Response Time</span>
                          <span className="text-success fw-medium">&lt;50ms</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="text-gray-300">System Uptime</span>
                          <span className="text-success fw-medium">99.9%</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="text-gray-300">Data Centers</span>
                          <span className="text-primary fw-medium">Global</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="text-gray-300">Security Audits</span>
                          <span className="text-warning fw-medium">Quarterly</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-5">
            <div className="container-fluid-custom">
              <div className="row justify-content-center">
                <div className="col-12 col-lg-8 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="display-5 fw-bold text-white mb-4">
                      Ready to Join Our Community?
                    </h2>
                    <p className="lead text-gray-300 mb-4">
                      Experience the difference that professional-grade tools and institutional security can make in your trading journey.
                    </p>
                    <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                      <a href="/auth/register" className="btn btn-primary btn-lg shadow-glow">
                        Start Trading Today
                      </a>
                      <a href="/contact" className="btn btn-outline-warning btn-lg">
                        Talk to Our Team
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <Footer />
      </div>
    </>
  );
}