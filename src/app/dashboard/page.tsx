'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Bitcoin,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Copy,
  RefreshCw,
  Eye,
  EyeOff,
  PieChart,
  BarChart3,
  Activity,
  Settings
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import PortfolioChart from '@/components/PortfolioChart';
import PayPalDepositModal from '@/components/PayPalDepositModal';
import CryptoDepositModal from '@/components/CryptoDepositModal';
import LiveChat from '@/components/LiveChat';

interface CryptoPrice {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  icon: string;
}

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'trade';
  amount: number;
  currency: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
}

export default function DashboardPage() {
  const { user, updateBalance, getPendingDeposits } = useAuth();
  const router = useRouter();
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [showPayPalModal, setShowPayPalModal] = useState(false);
  const [showCryptoModal, setShowCryptoModal] = useState(false);
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [portfolioData, setPortfolioData] = useState({
    total: 0,
    change24h: 0,
    breakdown: [
      { name: 'Bitcoin', value: 45, amount: 0 },
      { name: 'Ethereum', value: 30, amount: 0 },
      { name: 'Cardano', value: 15, amount: 0 },
      { name: 'Solana', value: 10, amount: 0 },
    ]
  });

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    // Simulate crypto price data
    const mockPrices: CryptoPrice[] = [
      { symbol: 'BTC', name: 'Bitcoin', price: 45234.67, change24h: 2.34, icon: '₿' },
      { symbol: 'ETH', name: 'Ethereum', price: 3456.89, change24h: -1.23, icon: 'Ξ' },
      { symbol: 'ADA', name: 'Cardano', price: 0.89, change24h: 5.67, icon: '₳' },
      { symbol: 'SOL', name: 'Solana', price: 156.78, change24h: 3.45, icon: '◎' },
    ];
    setCryptoPrices(mockPrices);

    // Get pending deposits and add to transactions
    const pendingDeposits = getPendingDeposits();
    const mockTransactions: Transaction[] = [
      ...pendingDeposits.map(deposit => ({
        id: deposit.id,
        type: 'deposit' as const,
        amount: deposit.amount,
        currency: 'USD',
        timestamp: deposit.timestamp,
        status: deposit.status === 'confirmed' ? 'completed' as const : 
                deposit.status === 'rejected' ? 'failed' as const : 'pending' as const
      })),
      {
        id: 'mock-1',
        type: 'trade',
        amount: 0.02,
        currency: 'BTC',
        timestamp: new Date(Date.now() - 172800000),
        status: 'completed'
      },
    ];
    setTransactions(mockTransactions);

    // Update portfolio based on user balance
    if (user.balance > 0) {
      setPortfolioData(prev => ({
        ...prev,
        total: user.balance,
        change24h: Math.random() * 10 - 5, // Random change for demo
        breakdown: prev.breakdown.map(item => ({
          ...item,
          amount: (user.balance * item.value) / 100
        }))
      }));
    }
  }, [user, router, getPendingDeposits]);

  const copyWalletAddress = async () => {
    if (user?.walletAddress) {
      await navigator.clipboard.writeText(user.walletAddress);
      // You could add a toast notification here
    }
  };

  const handleDepositSuccess = () => {
    // Refresh data after successful deposit
    window.location.reload();
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const stats = [
    {
      title: 'Total Balance',
      value: balanceVisible ? `$${user.balance.toLocaleString()}` : '****',
      icon: Wallet,
      change: portfolioData.change24h,
      changeText: `${portfolioData.change24h > 0 ? '+' : ''}${portfolioData.change24h.toFixed(2)}%`
    },
    {
      title: 'Total Profit/Loss',
      value: balanceVisible ? `$${(portfolioData.change24h * user.balance / 100).toFixed(2)}` : '****',
      icon: portfolioData.change24h > 0 ? TrendingUp : TrendingDown,
      change: portfolioData.change24h,
      changeText: '24h'
    },
    {
      title: 'Active Positions',
      value: '4',
      icon: PieChart,
      change: 0,
      changeText: 'Diversified'
    },
    {
      title: 'Monthly Return',
      value: balanceVisible ? '+12.34%' : '****',
      icon: BarChart3,
      change: 12.34,
      changeText: 'This month'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900" data-bs-theme="dark">
      <Navbar />
      
      <div className="container-fluid-custom py-4">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="row align-items-center mb-4"
        >
          <div className="col-12 col-md-8">
            <h1 className="display-6 fw-bold text-white mb-2">Welcome back, {user.name}!</h1>
            <p className="text-muted mb-0">Here's your investment portfolio overview</p>
          </div>
          <div className="col-12 col-md-4 text-md-end">
            <div className="d-flex align-items-center justify-content-md-end">
              <button
                onClick={() => setBalanceVisible(!balanceVisible)}
                className="btn btn-outline-secondary btn-sm d-flex align-items-center"
              >
                {balanceVisible ? <Eye size={16} className="me-2" /> : <EyeOff size={16} className="me-2" />}
                {balanceVisible ? 'Hide' : 'Show'} Balance
              </button>
              {user.isAdmin && (
                <a href="/admin" className="btn btn-outline-warning btn-sm ms-2 d-flex align-items-center">
                  <Settings size={16} className="me-2" />
                  Admin Panel
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="row g-4 mb-4"
        >
          {stats.map((stat, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-3">
              <div className="card border-0 shadow-lg h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="card-title text-muted mb-1">{stat.title}</h6>
                      <h4 className="text-white fw-bold mb-2">{stat.value}</h4>
                      <div className="d-flex align-items-center">
                        {stat.change !== 0 && (
                          <span className={`small ${stat.change > 0 ? 'text-success' : 'text-danger'}`}>
                            {stat.changeText}
                          </span>
                        )}
                        {stat.change === 0 && (
                          <span className="small text-muted">{stat.changeText}</span>
                        )}
                      </div>
                    </div>
                    <div className={`rounded-circle p-3 ${
                      stat.change > 0 ? 'bg-success bg-opacity-20' : 
                      stat.change < 0 ? 'bg-danger bg-opacity-20' : 
                      'bg-primary bg-opacity-20'
                    }`}>
                      <stat.icon className={`${
                        stat.change > 0 ? 'text-success' : 
                        stat.change < 0 ? 'text-danger' : 
                        'text-primary'
                      }`} size={24} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="row g-4">
          {/* Portfolio Chart */}
          <div className="col-12 col-lg-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card border-0 shadow-lg"
            >
              <div className="card-header bg-transparent border-bottom">
                <div className="d-flex align-items-center justify-content-between">
                  <h5 className="card-title text-white mb-0">Portfolio Performance</h5>
                  <button className="btn btn-sm btn-outline-secondary">
                    <RefreshCw size={16} />
                  </button>
                </div>
              </div>
              <div className="card-body">
                <PortfolioChart data={portfolioData} />
              </div>
            </motion.div>
          </div>

          {/* Wallet Info */}
          <div className="col-12 col-lg-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="vstack gap-4"
            >
              {/* Wallet Address */}
              <div className="card border-0 shadow-lg">
                <div className="card-header bg-transparent border-bottom">
                  <h5 className="card-title text-white mb-0">Your Wallet</h5>
                </div>
                <div className="card-body">
                  <div className="mb-4">
                    <label className="form-label text-muted small">Wallet Address</label>
                    <div className="d-flex align-items-center p-3 bg-dark rounded">
                      <code className="text-success flex-grow-1 small">{user.walletAddress}</code>
                      <button
                        onClick={copyWalletAddress}
                        className="btn btn-sm btn-outline-secondary ms-2"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="row g-2">
                    <div className="col-6">
                      <button 
                        onClick={() => setShowCryptoModal(true)}
                        className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                      >
                        <Bitcoin size={16} className="me-2" />
                        Crypto
                      </button>
                    </div>
                    <div className="col-6">
                      <button 
                        onClick={() => setShowPayPalModal(true)}
                        className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center"
                      >
                        <DollarSign size={16} className="me-2" />
                        PayPal
                      </button>
                    </div>
                  </div>
                  <button className="btn btn-outline-warning w-100 mt-2">
                    Withdraw
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card border-0 shadow-lg">
                <div className="card-header bg-transparent border-bottom">
                  <h5 className="card-title text-white mb-0">Quick Actions</h5>
                </div>
                <div className="card-body">
                  <div className="vstack gap-3">
                    <button className="btn btn-outline-light d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <Bitcoin className="text-warning me-3" size={20} />
                        <span>Buy Bitcoin</span>
                      </div>
                      <ArrowUpRight size={16} className="text-muted" />
                    </button>
                    <button className="btn btn-outline-light d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <Activity className="text-primary me-3" size={20} />
                        <span>View Analytics</span>
                      </div>
                      <ArrowUpRight size={16} className="text-muted" />
                    </button>
                    <button className="btn btn-outline-light d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <DollarSign className="text-success me-3" size={20} />
                        <span>Set Price Alerts</span>
                      </div>
                      <ArrowUpRight size={16} className="text-muted" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Market Overview and Recent Transactions */}
        <div className="row g-4 mt-1">
          {/* Market Overview */}
          <div className="col-12 col-lg-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card border-0 shadow-lg"
            >
              <div className="card-header bg-transparent border-bottom">
                <h5 className="card-title text-white mb-0">Market Overview</h5>
              </div>
              <div className="card-body">
                <div className="vstack gap-3">
                  {cryptoPrices.map((crypto) => (
                    <div key={crypto.symbol} className="d-flex align-items-center justify-content-between p-3 bg-dark rounded">
                      <div className="d-flex align-items-center">
                        <div className="rounded-circle bg-gradient-primary d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                          <span className="text-white fw-bold">{crypto.icon}</span>
                        </div>
                        <div>
                          <div className="text-white fw-medium">{crypto.name}</div>
                          <small className="text-muted">{crypto.symbol}</small>
                        </div>
                      </div>
                      <div className="text-end">
                        <div className="text-white fw-medium crypto-price">
                          ${crypto.price.toLocaleString()}
                        </div>
                        <small className={`${crypto.change24h > 0 ? 'text-success' : 'text-danger'}`}>
                          {crypto.change24h > 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Recent Transactions */}
          <div className="col-12 col-lg-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="card border-0 shadow-lg"
            >
              <div className="card-header bg-transparent border-bottom">
                <h5 className="card-title text-white mb-0">Recent Transactions</h5>
              </div>
              <div className="card-body">
                {transactions.length > 0 ? (
                  <div className="vstack gap-3">
                    {transactions.slice(0, 5).map((transaction) => (
                      <div key={transaction.id} className="d-flex align-items-center justify-content-between p-3 bg-dark rounded">
                        <div className="d-flex align-items-center">
                          <div className={`rounded-circle d-flex align-items-center justify-content-center me-3 ${
                            transaction.type === 'deposit' ? 'bg-success bg-opacity-20' :
                            transaction.type === 'withdrawal' ? 'bg-danger bg-opacity-20' :
                            'bg-primary bg-opacity-20'
                          }`} style={{width: '40px', height: '40px'}}>
                            {transaction.type === 'deposit' ? (
                              <ArrowDownLeft className="text-success" size={20} />
                            ) : transaction.type === 'withdrawal' ? (
                              <ArrowUpRight className="text-danger" size={20} />
                            ) : (
                              <TrendingUp className="text-primary" size={20} />
                            )}
                          </div>
                          <div>
                            <div className="text-white fw-medium text-capitalize">{transaction.type}</div>
                            <small className="text-muted">
                              {transaction.timestamp.toLocaleDateString()}
                            </small>
                          </div>
                        </div>
                        <div className="text-end">
                          <div className="text-white fw-medium">
                            {transaction.currency === 'USD' ? '$' : ''}{transaction.amount} {transaction.currency}
                          </div>
                          <small className={`${
                            transaction.status === 'completed' ? 'text-success' :
                            transaction.status === 'pending' ? 'text-warning' :
                            'text-danger'
                          }`}>
                            {transaction.status}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Activity className="text-muted mb-3" size={48} />
                    <p className="text-muted mb-1">No transactions yet</p>
                    <small className="text-muted">Start trading to see your transaction history</small>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modals and Components */}
      {showPayPalModal && (
        <PayPalDepositModal
          onClose={() => setShowPayPalModal(false)}
          onSuccess={(amount) => {
            updateBalance(amount);
            setShowPayPalModal(false);
            handleDepositSuccess();
          }}
        />
      )}

      {showCryptoModal && (
        <CryptoDepositModal
          onClose={() => setShowCryptoModal(false)}
          onSuccess={handleDepositSuccess}
        />
      )}

      <LiveChat />
    </div>
  );
}