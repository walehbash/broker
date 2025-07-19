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
  Activity
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import PortfolioChart from '@/components/PortfolioChart';
import PayPalDepositModal from '@/components/PayPalDepositModal';
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
  const { user, updateBalance } = useAuth();
  const router = useRouter();
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [showPayPalModal, setShowPayPalModal] = useState(false);
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

    // Simulate transaction history
    const mockTransactions: Transaction[] = [
      {
        id: '1',
        type: 'deposit',
        amount: 1000,
        currency: 'USD',
        timestamp: new Date(Date.now() - 86400000),
        status: 'completed'
      },
      {
        id: '2',
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
  }, [user, router]);

  const copyWalletAddress = async () => {
    if (user?.walletAddress) {
      await navigator.clipboard.writeText(user.walletAddress);
      // You could add a toast notification here
    }
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
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Welcome back, {user.name}!</h1>
              <p className="text-gray-400 mt-1">Here's your investment portfolio overview</p>
            </div>
            <button
              onClick={() => setBalanceVisible(!balanceVisible)}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              {balanceVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              <span>{balanceVisible ? 'Hide' : 'Show'} Balance</span>
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.change !== 0 && (
                      <span className={`text-sm ${stat.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {stat.changeText}
                      </span>
                    )}
                    {stat.change === 0 && (
                      <span className="text-sm text-gray-400">{stat.changeText}</span>
                    )}
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  stat.change > 0 ? 'bg-green-500/20' : 
                  stat.change < 0 ? 'bg-red-500/20' : 
                  'bg-blue-500/20'
                }`}>
                  <stat.icon className={`w-6 h-6 ${
                    stat.change > 0 ? 'text-green-400' : 
                    stat.change < 0 ? 'text-red-400' : 
                    'text-blue-400'
                  }`} />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Portfolio Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Portfolio Performance</h2>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-white transition-colors duration-200">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <PortfolioChart data={portfolioData} />
            </div>
          </motion.div>

          {/* Wallet Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Wallet Address */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Your Wallet</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Wallet Address</label>
                  <div className="flex items-center mt-2 p-3 bg-slate-700 rounded-lg">
                    <code className="text-sm text-green-400 flex-1 break-all">
                      {user.walletAddress}
                    </code>
                    <button
                      onClick={copyWalletAddress}
                      className="ml-2 text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setShowPayPalModal(true)}
                    className="btn-primary flex-1 flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Deposit
                  </button>
                  <button className="btn-secondary flex-1">
                    Withdraw
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors duration-200">
                  <div className="flex items-center">
                    <Bitcoin className="w-5 h-5 text-amber-400 mr-3" />
                    <span className="text-white">Buy Bitcoin</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors duration-200">
                  <div className="flex items-center">
                    <Activity className="w-5 h-5 text-blue-400 mr-3" />
                    <span className="text-white">View Analytics</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors duration-200">
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 text-green-400 mr-3" />
                    <span className="text-white">Set Price Alerts</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Market Overview and Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Market Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Market Overview</h2>
            <div className="space-y-4">
              {cryptoPrices.map((crypto) => (
                <div key={crypto.symbol} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-amber-400 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold">{crypto.icon}</span>
                    </div>
                    <div>
                      <div className="text-white font-medium">{crypto.name}</div>
                      <div className="text-gray-400 text-sm">{crypto.symbol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium crypto-price">
                      ${crypto.price.toLocaleString()}
                    </div>
                    <div className={`text-sm ${crypto.change24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {crypto.change24h > 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="card"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Recent Transactions</h2>
            <div className="space-y-4">
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                        transaction.type === 'deposit' ? 'bg-green-500/20' :
                        transaction.type === 'withdrawal' ? 'bg-red-500/20' :
                        'bg-blue-500/20'
                      }`}>
                        {transaction.type === 'deposit' ? (
                          <ArrowDownLeft className="w-5 h-5 text-green-400" />
                        ) : transaction.type === 'withdrawal' ? (
                          <ArrowUpRight className="w-5 h-5 text-red-400" />
                        ) : (
                          <TrendingUp className="w-5 h-5 text-blue-400" />
                        )}
                      </div>
                      <div>
                        <div className="text-white font-medium capitalize">{transaction.type}</div>
                        <div className="text-gray-400 text-sm">
                          {transaction.timestamp.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">
                        {transaction.currency === 'USD' ? '$' : ''}{transaction.amount} {transaction.currency}
                      </div>
                      <div className={`text-sm ${
                        transaction.status === 'completed' ? 'text-green-400' :
                        transaction.status === 'pending' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {transaction.status}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Activity className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-400">No transactions yet</p>
                  <p className="text-gray-500 text-sm">Start trading to see your transaction history</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modals and Components */}
      {showPayPalModal && (
        <PayPalDepositModal
          onClose={() => setShowPayPalModal(false)}
          onSuccess={(amount) => {
            updateBalance(amount);
            setShowPayPalModal(false);
          }}
        />
      )}

      <LiveChat />
    </div>
  );
}