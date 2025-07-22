'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import {
  Settings,
  Users,
  Clock,
  CheckCircle,
  X,
  Edit,
  Save,
  DollarSign,
  Bitcoin,
  Copy,
  AlertTriangle,
  TrendingUp,
  Wallet
} from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function AdminPage() {
  const { user, adminSettings, updateAdminSettings, getAllUsers, updateUserBalance, getPendingDeposits, confirmDeposit, rejectDeposit } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'settings' | 'users' | 'deposits'>('deposits');
  const [editingSettings, setEditingSettings] = useState(false);
  const [settingsForm, setSettingsForm] = useState(adminSettings);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [userBalanceForm, setUserBalanceForm] = useState('');

  useEffect(() => {
    if (!user || !user.isAdmin) {
      router.push('/dashboard');
    }
  }, [user, router]);

  useEffect(() => {
    setSettingsForm(adminSettings);
  }, [adminSettings]);

  if (!user || !user.isAdmin) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-gray-400">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const allUsers = getAllUsers();
  const pendingDeposits = getPendingDeposits();
  const totalUsers = allUsers.length;
  const totalBalance = allUsers.reduce((sum, user) => sum + user.balance, 0);
  const pendingCount = pendingDeposits.filter(d => d.status === 'pending').length;

  const handleSaveSettings = () => {
    updateAdminSettings(settingsForm);
    setEditingSettings(false);
  };

  const handleUpdateUserBalance = (userId: string) => {
    const newBalance = parseFloat(userBalanceForm);
    if (!isNaN(newBalance) && newBalance >= 0) {
      updateUserBalance(userId, newBalance);
      setEditingUser(null);
      setUserBalanceForm('');
    }
  };

  const handleConfirmDeposit = (depositId: string) => {
    confirmDeposit(depositId);
  };

  const handleRejectDeposit = (depositId: string) => {
    rejectDeposit(depositId);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900" data-bs-theme="dark">
      <Navbar />
      
      <div className="container-fluid-custom py-5">
        <div className="row">
          <div className="col-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="display-5 fw-bold text-white mb-4">
                <Settings className="me-3 d-inline" size={32} />
                Admin Panel
              </h1>
              
              {/* Stats Cards */}
              <div className="row g-4 mb-5">
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="card border-0 shadow-lg">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <h6 className="card-title text-muted mb-1">Total Users</h6>
                          <h3 className="text-white fw-bold">{totalUsers}</h3>
                        </div>
                        <div className="bg-primary bg-opacity-20 rounded-circle p-3">
                          <Users className="text-primary" size={24} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="card border-0 shadow-lg">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <h6 className="card-title text-muted mb-1">Total Balance</h6>
                          <h3 className="text-white fw-bold">${totalBalance.toLocaleString()}</h3>
                        </div>
                        <div className="bg-success bg-opacity-20 rounded-circle p-3">
                          <DollarSign className="text-success" size={24} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="card border-0 shadow-lg">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <h6 className="card-title text-muted mb-1">Pending Deposits</h6>
                          <h3 className="text-white fw-bold">{pendingCount}</h3>
                        </div>
                        <div className="bg-warning bg-opacity-20 rounded-circle p-3">
                          <Clock className="text-warning" size={24} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="card border-0 shadow-lg">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <h6 className="card-title text-muted mb-1">Min Deposit</h6>
                          <h3 className="text-white fw-bold">${adminSettings.minimumDeposit}</h3>
                        </div>
                        <div className="bg-info bg-opacity-20 rounded-circle p-3">
                          <Wallet className="text-info" size={24} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <ul className="nav nav-pills mb-4">
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'deposits' ? 'active' : ''}`}
                    onClick={() => setActiveTab('deposits')}
                  >
                    <Clock className="me-2" size={16} />
                    Pending Deposits ({pendingCount})
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
                    onClick={() => setActiveTab('users')}
                  >
                    <Users className="me-2" size={16} />
                    Manage Users
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings className="me-2" size={16} />
                    Settings
                  </button>
                </li>
              </ul>

              {/* Tab Content */}
              <div className="tab-content">
                {/* Pending Deposits Tab */}
                {activeTab === 'deposits' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="card border-0 shadow-lg"
                  >
                    <div className="card-header bg-transparent border-bottom">
                      <h5 className="card-title text-white mb-0">Pending Deposits</h5>
                    </div>
                    <div className="card-body p-0">
                      {pendingDeposits.filter(d => d.status === 'pending').length === 0 ? (
                        <div className="text-center py-5">
                          <Clock className="text-muted mb-3" size={48} />
                          <p className="text-muted">No pending deposits</p>
                        </div>
                      ) : (
                        <div className="table-responsive">
                          <table className="table table-dark table-hover mb-0">
                            <thead>
                              <tr>
                                <th>User</th>
                                <th>Amount</th>
                                <th>Transaction Hash</th>
                                <th>Date</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {pendingDeposits
                                .filter(d => d.status === 'pending')
                                .map((deposit) => {
                                  const depositUser = allUsers.find(u => u.id === deposit.userId);
                                  return (
                                    <tr key={deposit.id}>
                                      <td>
                                        <div>
                                          <div className="fw-medium text-white">{depositUser?.name || 'Unknown'}</div>
                                          <small className="text-muted">{depositUser?.email || 'N/A'}</small>
                                        </div>
                                      </td>
                                      <td>
                                        <span className="fw-bold text-success">${deposit.amount.toLocaleString()}</span>
                                      </td>
                                      <td>
                                        <div className="d-flex align-items-center">
                                          <code className="text-warning me-2">{deposit.txHash.slice(0, 16)}...</code>
                                          <button
                                            onClick={() => copyToClipboard(deposit.txHash)}
                                            className="btn btn-sm btn-outline-secondary p-1"
                                          >
                                            <Copy size={12} />
                                          </button>
                                        </div>
                                      </td>
                                      <td>
                                        <small className="text-muted">
                                          {deposit.timestamp.toLocaleDateString()}<br />
                                          {deposit.timestamp.toLocaleTimeString()}
                                        </small>
                                      </td>
                                      <td>
                                        <div className="btn-group">
                                          <button
                                            onClick={() => handleConfirmDeposit(deposit.id)}
                                            className="btn btn-sm btn-success"
                                          >
                                            <CheckCircle size={14} className="me-1" />
                                            Confirm
                                          </button>
                                          <button
                                            onClick={() => handleRejectDeposit(deposit.id)}
                                            className="btn btn-sm btn-danger"
                                          >
                                            <X size={14} className="me-1" />
                                            Reject
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Users Tab */}
                {activeTab === 'users' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="card border-0 shadow-lg"
                  >
                    <div className="card-header bg-transparent border-bottom">
                      <h5 className="card-title text-white mb-0">User Management</h5>
                    </div>
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table table-dark table-hover mb-0">
                          <thead>
                            <tr>
                              <th>User</th>
                              <th>Wallet Address</th>
                              <th>Balance</th>
                              <th>Role</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {allUsers.map((userData) => (
                              <tr key={userData.id}>
                                <td>
                                  <div>
                                    <div className="fw-medium text-white">{userData.name}</div>
                                    <small className="text-muted">{userData.email}</small>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <code className="text-success me-2">{userData.walletAddress.slice(0, 12)}...</code>
                                    <button
                                      onClick={() => copyToClipboard(userData.walletAddress)}
                                      className="btn btn-sm btn-outline-secondary p-1"
                                    >
                                      <Copy size={12} />
                                    </button>
                                  </div>
                                </td>
                                <td>
                                  {editingUser === userData.id ? (
                                    <div className="d-flex align-items-center">
                                      <input
                                        type="number"
                                        value={userBalanceForm}
                                        onChange={(e) => setUserBalanceForm(e.target.value)}
                                        className="form-control form-control-sm me-2"
                                        style={{ width: '100px' }}
                                        min="0"
                                        step="0.01"
                                      />
                                      <button
                                        onClick={() => handleUpdateUserBalance(userData.id)}
                                        className="btn btn-sm btn-success me-1"
                                      >
                                        <Save size={12} />
                                      </button>
                                      <button
                                        onClick={() => {
                                          setEditingUser(null);
                                          setUserBalanceForm('');
                                        }}
                                        className="btn btn-sm btn-secondary"
                                      >
                                        <X size={12} />
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="d-flex align-items-center">
                                      <span className="fw-bold text-warning me-2">
                                        ${userData.balance.toLocaleString()}
                                      </span>
                                      <button
                                        onClick={() => {
                                          setEditingUser(userData.id);
                                          setUserBalanceForm(userData.balance.toString());
                                        }}
                                        className="btn btn-sm btn-outline-warning p-1"
                                      >
                                        <Edit size={12} />
                                      </button>
                                    </div>
                                  )}
                                </td>
                                <td>
                                  <span className={`badge ${userData.isAdmin ? 'bg-danger' : 'bg-secondary'}`}>
                                    {userData.isAdmin ? 'Admin' : 'User'}
                                  </span>
                                </td>
                                <td>
                                  <small className="text-muted">ID: {userData.id}</small>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="card border-0 shadow-lg"
                  >
                    <div className="card-header bg-transparent border-bottom">
                      <div className="d-flex align-items-center justify-content-between">
                        <h5 className="card-title text-white mb-0">Platform Settings</h5>
                        {!editingSettings ? (
                          <button
                            onClick={() => setEditingSettings(true)}
                            className="btn btn-sm btn-primary"
                          >
                            <Edit size={14} className="me-1" />
                            Edit Settings
                          </button>
                        ) : (
                          <div>
                            <button
                              onClick={handleSaveSettings}
                              className="btn btn-sm btn-success me-2"
                            >
                              <Save size={14} className="me-1" />
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setEditingSettings(false);
                                setSettingsForm(adminSettings);
                              }}
                              className="btn btn-sm btn-secondary"
                            >
                              <X size={14} className="me-1" />
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row g-4">
                        <div className="col-12">
                          <label className="form-label text-white">Deposit Wallet Address</label>
                          {editingSettings ? (
                            <input
                              type="text"
                              value={settingsForm.depositWalletAddress}
                              onChange={(e) => setSettingsForm(prev => ({ ...prev, depositWalletAddress: e.target.value }))}
                              className="form-control"
                              placeholder="Enter wallet address"
                            />
                          ) : (
                            <div className="d-flex align-items-center p-3 bg-dark rounded">
                              <Bitcoin className="text-warning me-3" size={20} />
                              <code className="text-success flex-grow-1">{adminSettings.depositWalletAddress}</code>
                              <button
                                onClick={() => copyToClipboard(adminSettings.depositWalletAddress)}
                                className="btn btn-sm btn-outline-secondary ms-2"
                              >
                                <Copy size={14} />
                              </button>
                            </div>
                          )}
                        </div>
                        
                        <div className="col-12 col-md-6">
                          <label className="form-label text-white">Minimum Deposit (USD)</label>
                          {editingSettings ? (
                            <input
                              type="number"
                              value={settingsForm.minimumDeposit}
                              onChange={(e) => setSettingsForm(prev => ({ ...prev, minimumDeposit: parseFloat(e.target.value) || 0 }))}
                              className="form-control"
                              min="1"
                              step="1"
                            />
                          ) : (
                            <div className="p-3 bg-dark rounded">
                              <span className="text-warning fw-bold">${adminSettings.minimumDeposit}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="col-12">
                          <label className="form-label text-white">Deposit Instructions</label>
                          {editingSettings ? (
                            <textarea
                              value={settingsForm.depositInstructions}
                              onChange={(e) => setSettingsForm(prev => ({ ...prev, depositInstructions: e.target.value }))}
                              className="form-control"
                              rows={3}
                              placeholder="Enter deposit instructions for users"
                            />
                          ) : (
                            <div className="p-3 bg-dark rounded">
                              <p className="text-light mb-0">{adminSettings.depositInstructions}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}