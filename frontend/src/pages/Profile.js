import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Calendar, Shield, Settings, Key } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-lg font-semibold text-gray-900">Account Settings</h1>
          <p className="text-xs text-gray-600 mt-1">Manage your account information and preferences</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Summary Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="widget">
              <div className="widget-header">
                <h3 className="widget-title">Profile</h3>
              </div>
              <div className="widget-body text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  {user?.name}
                </h3>
                <p className="text-xs text-gray-600 mb-3">{user?.email}</p>
                <div className="text-2xs text-gray-500">
                  <p>Member since</p>
                  <p className="font-medium">{formatDate(user?.joinedAt)}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="widget mt-4">
              <div className="widget-header">
                <h3 className="widget-title">Quick Actions</h3>
              </div>
              <div className="widget-body space-y-2">
                <button className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 rounded flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
                <button className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 rounded flex items-center">
                  <Key className="h-4 w-4 mr-2" />
                  Change Password
                </button>
                <button className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 rounded flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Security Settings
                </button>
              </div>
            </div>
          </motion.div>

          {/* Account Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="widget">
              <div className="widget-header">
                <h3 className="widget-title">Account Information</h3>
                <button className="header-btn">
                  Edit
                </button>
              </div>
              
              <div className="widget-body">
                <div className="professional-table">
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 text-xs font-medium text-gray-700 w-1/3">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-gray-400" />
                            Full Name
                          </div>
                        </td>
                        <td className="py-3 text-xs text-gray-900">{user?.name}</td>
                      </tr>
                      
                      <tr className="border-b border-gray-100">
                        <td className="py-3 text-xs font-medium text-gray-700">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-gray-400" />
                            Email Address
                          </div>
                        </td>
                        <td className="py-3 text-xs text-gray-900">{user?.email}</td>
                      </tr>

                      <tr className="border-b border-gray-100">
                        <td className="py-3 text-xs font-medium text-gray-700">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                            Member Since
                          </div>
                        </td>
                        <td className="py-3 text-xs text-gray-900">{formatDate(user?.joinedAt)}</td>
                      </tr>
                      
                      <tr className="border-b border-gray-100">
                        <td className="py-3 text-xs font-medium text-gray-700">
                          <div className="flex items-center">
                            <Shield className="h-4 w-4 mr-2 text-gray-400" />
                            Account Status
                          </div>
                        </td>
                        <td className="py-3">
                          <span className="status-indicator-success">
                            Active & Verified
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td className="py-3 text-xs font-medium text-gray-700">
                          Wallet Address
                        </td>
                        <td className="py-3">
                          <div className="font-mono text-xs text-gray-700 bg-gray-50 px-2 py-1 rounded border inline-block">
                            {user?.walletAddress}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Account Statistics */}
            <div className="widget mt-6">
              <div className="widget-header">
                <h3 className="widget-title">Account Statistics</h3>
              </div>
              <div className="widget-body">
                <div className="grid grid-cols-2 gap-4">
                  <div className="metric-card">
                    <div className="metric-label">Current Balance</div>
                    <div className="metric-value">
                      ${(user?.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-2xs text-gray-500">Portfolio value</div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-label">Total Interest</div>
                    <div className="metric-value">
                      ${(user?.totalInterestEarned || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-2xs text-gray-500">All time earnings</div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-label">Account Age</div>
                    <div className="metric-value">
                      {Math.floor((new Date() - new Date(user?.joinedAt)) / (1000 * 60 * 60 * 24))} days
                    </div>
                    <div className="text-2xs text-gray-500">Since registration</div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-label">Last Login</div>
                    <div className="metric-value text-sm">
                      {user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Today'}
                    </div>
                    <div className="text-2xs text-gray-500">Most recent access</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Information */}
            <div className="widget mt-6">
              <div className="widget-header">
                <h3 className="widget-title">Security & Privacy</h3>
                <button className="header-btn">
                  Manage
                </button>
              </div>
              <div className="widget-body">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <div className="text-xs font-medium text-gray-900">Two-Factor Authentication</div>
                      <div className="text-2xs text-gray-500">Add an extra layer of security</div>
                    </div>
                    <button className="btn-secondary text-2xs">
                      Enable
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <div className="text-xs font-medium text-gray-900">Login Notifications</div>
                      <div className="text-2xs text-gray-500">Get notified of account access</div>
                    </div>
                    <div className="status-indicator-success">
                      Enabled
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <div className="text-xs font-medium text-gray-900">Data Encryption</div>
                      <div className="text-2xs text-gray-500">Bank-level security protection</div>
                    </div>
                    <div className="status-indicator-success">
                      Active
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;