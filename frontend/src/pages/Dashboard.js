import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useSocket } from '../contexts/SocketContext';
import { 
  Wallet, 
  TrendingUp, 
  DollarSign, 
  Plus, 
  Minus, 
  Copy, 
  Clock,
  BarChart3,
  Zap,
  Eye,
  Calendar,
  Activity
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const { user, updateBalance } = useAuth();
  const { connected } = useSocket();
  const [loading, setLoading] = useState(false);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsResponse, transactionsResponse] = await Promise.all([
        axios.get('/api/user/dashboard-stats'),
        axios.get('/api/wallet/transactions', { params: { limit: 10 } })
      ]);

      if (statsResponse.data.success) {
        setDashboardStats(statsResponse.data.stats);
      }

      if (transactionsResponse.data.success) {
        setTransactions(transactionsResponse.data.transactions);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(user.walletAddress);
    toast.success('Wallet address copied to clipboard!');
  };

  const handleDeposit = async () => {
    const amount = parseFloat(depositAmount);
    if (!amount || amount < 0.01) {
      toast.error('Please enter a valid amount (minimum $0.01)');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('/api/wallet/deposit', {
        amount,
        description: `Demo deposit of $${amount.toFixed(2)}`
      });

      if (response.data.success) {
        setDepositAmount('');
        setShowDepositModal(false);
        fetchDashboardData();
        toast.success('Deposit successful!');
      }
    } catch (error) {
      console.error('Deposit error:', error);
      toast.error(error.response?.data?.message || 'Deposit failed');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount);
    if (!amount || amount < 0.01) {
      toast.error('Please enter a valid amount (minimum $0.01)');
      return;
    }

    if (amount > user.balance) {
      toast.error('Insufficient balance');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('/api/wallet/withdraw', {
        amount,
        description: `Demo withdrawal of $${amount.toFixed(2)}`
      });

      if (response.data.success) {
        setWithdrawAmount('');
        setShowWithdrawModal(false);
        fetchDashboardData();
        toast.success('Withdrawal successful!');
      }
    } catch (error) {
      console.error('Withdrawal error:', error);
      toast.error(error.response?.data?.message || 'Withdrawal failed');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'deposit':
        return <Plus className="h-4 w-4 text-green-600" />;
      case 'withdrawal':
        return <Minus className="h-4 w-4 text-red-600" />;
      case 'interest':
        return <TrendingUp className="h-4 w-4 text-blue-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'deposit':
        return 'text-green-600';
      case 'withdrawal':
        return 'text-red-600';
      case 'interest':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  if (loading && !dashboardStats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600 mt-2">
              Here's an overview of your investment portfolio
            </p>
            <div className="flex items-center mt-2">
              <div className={`w-2 h-2 rounded-full mr-2 ${connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-500">
                {connected ? 'Real-time updates active' : 'Connection lost'}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="balance-card mb-8 animate-balance"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Wallet className="h-8 w-8 mr-3" />
              <div>
                <h2 className="text-2xl font-bold">Portfolio Balance</h2>
                <p className="text-blue-100">Real-time value</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span className="text-sm">Live</span>
            </div>
          </div>
          
          <div className="text-5xl font-bold mb-4">
            {formatCurrency(user?.balance || 0)}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-300" />
              <span className="text-lg">
                +{formatCurrency(dashboardStats?.avgDailyInterest * 30 || 0)} estimated monthly
              </span>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-100">Total Interest Earned</div>
              <div className="text-xl font-semibold">
                {formatCurrency(dashboardStats?.totalInterest || 0)}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="stats-card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Deposits</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(dashboardStats?.totalDeposits || 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Plus className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="stats-card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Interest Earned</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(dashboardStats?.totalInterest || 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="stats-card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Days Invested</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardStats?.daysSinceJoining || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="stats-card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Daily Average</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(dashboardStats?.avgDailyInterest || 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Wallet Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Wallet Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Wallet Address
                  </label>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 p-3 bg-gray-50 rounded-md border text-sm font-mono">
                      {user?.walletAddress}
                    </div>
                    <button
                      onClick={copyWalletAddress}
                      className="btn-secondary p-3"
                      title="Copy address"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Use this address to transfer funds to your account
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setShowDepositModal(true)}
                      className="btn-success w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Deposit
                    </button>
                    <button
                      onClick={() => setShowWithdrawModal(true)}
                      className="btn-secondary w-full"
                      disabled={!user?.balance || user.balance <= 0}
                    >
                      <Minus className="h-4 w-4 mr-2" />
                      Withdraw
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="lg:col-span-2"
          >
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Transactions
                </h3>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All
                </button>
              </div>

              <div className="space-y-0 divide-y divide-gray-100">
                {transactions.length > 0 ? (
                  transactions.map((transaction, index) => (
                    <div key={index} className="transaction-item">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {transaction.description}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(transaction.timestamp).toLocaleDateString()} at{' '}
                            {new Date(transaction.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className={`text-right ${getTransactionColor(transaction.type)}`}>
                        <p className="font-semibold">
                          {transaction.type === 'withdrawal' ? '-' : '+'}
                          {formatCurrency(Math.abs(transaction.amount))}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                          {transaction.type}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Activity className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">No transactions yet</p>
                    <p className="text-sm text-gray-400">
                      Make your first deposit to get started
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Simulate Deposit
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (USD)
              </label>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="input"
                placeholder="0.00"
                min="0.01"
                step="0.01"
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDepositModal(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleDeposit}
                disabled={loading || !depositAmount}
                className="btn-success flex-1"
              >
                {loading ? <LoadingSpinner size="small" /> : 'Deposit'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Simulate Withdrawal
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (USD)
              </label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="input"
                placeholder="0.00"
                min="0.01"
                max={user?.balance || 0}
                step="0.01"
              />
              <p className="text-sm text-gray-500 mt-1">
                Available: {formatCurrency(user?.balance || 0)}
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleWithdraw}
                disabled={loading || !withdrawAmount}
                className="btn-danger flex-1"
              >
                {loading ? <LoadingSpinner size="small" /> : 'Withdraw'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;