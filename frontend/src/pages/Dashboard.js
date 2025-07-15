import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useSocket } from '../contexts/SocketContext';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  Plus, 
  Minus, 
  Copy, 
  BarChart3,
  Activity,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Zap
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
    const interval = setInterval(fetchDashboardData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsResponse, transactionsResponse] = await Promise.all([
        axios.get('/api/user/dashboard-stats'),
        axios.get('/api/wallet/transactions', { params: { limit: 15 } })
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
    toast.success('Address copied');
  };

  const handleDeposit = async () => {
    const amount = parseFloat(depositAmount);
    if (!amount || amount < 0.01) {
      toast.error('Minimum deposit $0.01');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('/api/wallet/deposit', {
        amount,
        description: `Deposit $${amount.toFixed(2)}`
      });

      if (response.data.success) {
        setDepositAmount('');
        setShowDepositModal(false);
        fetchDashboardData();
        toast.success('Deposit successful');
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
      toast.error('Minimum withdrawal $0.01');
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
        description: `Withdrawal $${amount.toFixed(2)}`
      });

      if (response.data.success) {
        setWithdrawAmount('');
        setShowWithdrawModal(false);
        fetchDashboardData();
        toast.success('Withdrawal successful');
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

  const formatCompactCurrency = (amount) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}K`;
    }
    return formatCurrency(amount);
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'deposit':
        return <ArrowUpRight className="h-3 w-3 text-green-600" />;
      case 'withdrawal':
        return <ArrowDownRight className="h-3 w-3 text-red-600" />;
      case 'interest':
        return <TrendingUp className="h-3 w-3 text-blue-600" />;
      default:
        return <Activity className="h-3 w-3 text-gray-600" />;
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
    <div className="min-h-screen bg-gray-50">
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Portfolio Dashboard</h1>
            <div className="flex items-center mt-1 space-x-4">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-1.5 ${connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-xs text-gray-500">
                  {connected ? 'Live Data' : 'Disconnected'}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={fetchDashboardData}
              className="header-btn"
              disabled={loading}
            >
              <RefreshCw className={`h-3 w-3 mr-1 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Portfolio Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
          {/* Main Balance Card */}
          <div className="lg:col-span-2 balance-card p-4 animate-balance">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Wallet className="h-4 w-4 mr-2" />
                <span className="text-xs font-medium opacity-90">Portfolio Value</span>
              </div>
              <div className="flex items-center text-xs opacity-75">
                <Zap className="h-3 w-3 mr-1" />
                Live
              </div>
            </div>
            <div className="text-2xl font-bold mb-1">
              {formatCurrency(user?.balance || 0)}
            </div>
            <div className="flex items-center justify-between text-xs opacity-90">
              <span>
                +{formatCurrency(dashboardStats?.avgDailyInterest * 30 || 0)} est. monthly
              </span>
              <span>
                5.2% APY
              </span>
            </div>
          </div>

          {/* Metrics */}
          <div className="metric-card">
            <div className="metric-label">Total Deposits</div>
            <div className="metric-value text-base">
              {formatCompactCurrency(dashboardStats?.totalDeposits || 0)}
            </div>
            <div className="metric-change-positive">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              All time
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Interest Earned</div>
            <div className="metric-value text-base">
              {formatCompactCurrency(dashboardStats?.totalInterest || 0)}
            </div>
            <div className="metric-change-positive">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +{formatCurrency(dashboardStats?.avgDailyInterest || 0)}/day
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Days Active</div>
            <div className="metric-value text-base">
              {dashboardStats?.daysSinceJoining || 0}
            </div>
            <div className="text-xs text-gray-500">
              <Clock className="h-3 w-3 inline mr-1" />
              Since {new Date(user?.joinedAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-4">
          {/* Account Actions */}
          <div className="lg:col-span-1">
            <div className="widget mb-4">
              <div className="widget-header">
                <h3 className="widget-title">Account Actions</h3>
              </div>
              <div className="widget-body space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Wallet Address
                  </label>
                  <div className="flex items-center">
                    <div className="flex-1 px-2 py-1.5 bg-gray-50 rounded text-xs font-mono border text-gray-700 truncate">
                      {user?.walletAddress}
                    </div>
                    <button
                      onClick={copyWalletAddress}
                      className="ml-2 p-1.5 text-gray-500 hover:text-gray-700 border rounded"
                      title="Copy"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => setShowDepositModal(true)}
                    className="btn-success btn-large w-full"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Deposit
                  </button>
                  <button
                    onClick={() => setShowWithdrawModal(true)}
                    className="btn-secondary btn-large w-full"
                    disabled={!user?.balance || user.balance <= 0}
                  >
                    <Minus className="h-3 w-3 mr-1" />
                    Withdraw
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="widget">
              <div className="widget-header">
                <h3 className="widget-title">Quick Stats</h3>
              </div>
              <div className="widget-body space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Today's Interest</span>
                  <span className="text-xs font-medium text-green-600">
                    +{formatCurrency(dashboardStats?.avgDailyInterest || 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">This Month</span>
                  <span className="text-xs font-medium text-green-600">
                    +{formatCurrency((dashboardStats?.avgDailyInterest || 0) * 30)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Transactions</span>
                  <span className="text-xs font-medium text-gray-900">
                    {transactions.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Account Status</span>
                  <span className="status-indicator-success">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="lg:col-span-3">
            <div className="widget">
              <div className="widget-header">
                <h3 className="widget-title">Recent Transactions</h3>
                <button className="header-btn">View All</button>
              </div>
              <div className="widget-body p-0">
                {transactions.length > 0 ? (
                  <div className="overflow-hidden">
                    <table className="professional-table">
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>Description</th>
                          <th>Amount</th>
                          <th>Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.slice(0, 10).map((transaction, index) => (
                          <tr key={index}>
                            <td>
                              <div className="flex items-center">
                                {getTransactionIcon(transaction.type)}
                                <span className="ml-2 text-xs font-medium capitalize">
                                  {transaction.type}
                                </span>
                              </div>
                            </td>
                            <td className="text-xs text-gray-600 max-w-48 truncate">
                              {transaction.description}
                            </td>
                            <td className={`text-xs font-medium ${getTransactionColor(transaction.type)}`}>
                              {transaction.type === 'withdrawal' ? '-' : '+'}
                              {formatCurrency(Math.abs(transaction.amount))}
                            </td>
                            <td className="text-xs text-gray-500">
                              {new Date(transaction.timestamp).toLocaleDateString()} {new Date(transaction.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </td>
                            <td>
                              <span className="status-indicator-success">
                                Complete
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <Activity className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-500 mb-1">No transactions yet</p>
                    <p className="text-2xs text-gray-400">
                      Make your first deposit to get started
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded border w-full max-w-sm mx-4"
          >
            <div className="card-header">
              <h3 className="text-sm font-semibold text-gray-900">Simulate Deposit</h3>
            </div>
            <div className="card-body">
              <div className="form-compact">
                <div className="form-group">
                  <label>Amount (USD)</label>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="input input-large"
                    placeholder="0.00"
                    min="0.01"
                    step="0.01"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowDepositModal(false)}
                    className="btn-secondary btn-large flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeposit}
                    disabled={loading || !depositAmount}
                    className="btn-success btn-large flex-1"
                  >
                    {loading ? <LoadingSpinner size="small" /> : 'Deposit'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded border w-full max-w-sm mx-4"
          >
            <div className="card-header">
              <h3 className="text-sm font-semibold text-gray-900">Simulate Withdrawal</h3>
            </div>
            <div className="card-body">
              <div className="form-compact">
                <div className="form-group">
                  <label>Amount (USD)</label>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="input input-large"
                    placeholder="0.00"
                    min="0.01"
                    max={user?.balance || 0}
                    step="0.01"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Available: {formatCurrency(user?.balance || 0)}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowWithdrawModal(false)}
                    className="btn-secondary btn-large flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleWithdraw}
                    disabled={loading || !withdrawAmount}
                    className="btn-danger btn-large flex-1"
                  >
                    {loading ? <LoadingSpinner size="small" /> : 'Withdraw'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;