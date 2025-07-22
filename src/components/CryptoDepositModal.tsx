'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Bitcoin, AlertCircle, CheckCircle, ExternalLink, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface CryptoDepositModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function CryptoDepositModal({ onClose, onSuccess }: CryptoDepositModalProps) {
  const { adminSettings, submitCryptoDeposit } = useAuth();
  const [step, setStep] = useState<'instructions' | 'submit' | 'success'>('instructions');
  const [formData, setFormData] = useState({
    amount: '',
    txHash: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(adminSettings.depositWalletAddress);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSubmitDeposit = async () => {
    if (!formData.amount || !formData.txHash) {
      setError('Please fill in all required fields');
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount < adminSettings.minimumDeposit) {
      setError(`Minimum deposit amount is $${adminSettings.minimumDeposit}`);
      return;
    }

    if (formData.txHash.length < 10) {
      setError('Please provide a valid transaction hash');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const success = await submitCryptoDeposit(amount, formData.txHash);
      if (success) {
        setStep('success');
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 3000);
      } else {
        setError('Failed to submit deposit. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-slate-800 rounded-xl w-full max-w-md border border-slate-700"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <h2 className="text-xl font-semibold text-white">
              {step === 'instructions' && 'Cryptocurrency Deposit'}
              {step === 'submit' && 'Submit Deposit Details'}
              {step === 'success' && 'Deposit Submitted'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            {/* Instructions Step */}
            {step === 'instructions' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="bg-blue-900/20 border border-blue-500 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-blue-400 mr-3 mt-0.5" />
                    <div>
                      <h4 className="text-blue-400 font-medium text-sm mb-1">Important Instructions</h4>
                      <p className="text-blue-300 text-xs">
                        {adminSettings.depositInstructions}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Deposit Address
                  </label>
                  <div className="relative">
                    <div className="flex items-center p-3 bg-slate-700 rounded-lg border border-slate-600">
                      <Bitcoin className="w-5 h-5 text-amber-400 mr-3" />
                      <code className="text-sm text-green-400 flex-1 break-all">
                        {adminSettings.depositWalletAddress}
                      </code>
                      <button
                        onClick={handleCopyAddress}
                        className="ml-2 p-1 text-gray-400 hover:text-white transition-colors duration-200"
                        title="Copy address"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-900/20 border border-amber-500 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-amber-400 mr-3 mt-0.5" />
                    <div>
                      <h4 className="text-amber-400 font-medium text-sm mb-1">Minimum Deposit</h4>
                      <p className="text-amber-300 text-xs">
                        Minimum deposit amount: ${adminSettings.minimumDeposit} USD equivalent
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-white font-medium text-sm">How to deposit:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
                    <li>Copy the wallet address above</li>
                    <li>Send your cryptocurrency to this address</li>
                    <li>Wait for the transaction to be confirmed</li>
                    <li>Come back and provide the transaction details</li>
                  </ol>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={onClose}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setStep('submit')}
                    className="btn-primary flex-1"
                  >
                    I've Sent the Payment
                  </button>
                </div>
              </motion.div>
            )}

            {/* Submit Step */}
            {step === 'submit' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {error && (
                  <div className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Deposit Amount (USD) *
                  </label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                    className="block w-full px-3 py-3 border border-slate-600 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={`Minimum $${adminSettings.minimumDeposit}`}
                    min={adminSettings.minimumDeposit}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Transaction Hash *
                  </label>
                  <textarea
                    value={formData.txHash}
                    onChange={(e) => setFormData(prev => ({ ...prev, txHash: e.target.value }))}
                    className="block w-full px-3 py-3 border border-slate-600 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter the transaction hash/ID from your wallet"
                    rows={3}
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    The transaction hash can be found in your wallet or blockchain explorer
                  </p>
                </div>

                <div className="bg-slate-700 rounded-lg p-4">
                  <h4 className="text-white font-medium text-sm mb-2">Deposit Summary</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">To Address:</span>
                      <code className="text-green-400 text-xs">{adminSettings.depositWalletAddress.slice(0, 10)}...</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Amount:</span>
                      <span className="text-white">${formData.amount || '0'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className="text-yellow-400">Pending Verification</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setStep('instructions')}
                    className="btn-secondary flex-1"
                    disabled={isSubmitting}
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmitDeposit}
                    disabled={isSubmitting}
                    className="btn-primary flex-1 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      'Submit for Verification'
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Success Step */}
            {step === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Deposit Submitted Successfully!
                  </h3>
                  <p className="text-gray-400">
                    Your deposit of ${formData.amount} has been submitted for verification. 
                    You'll receive your funds once confirmed by our team.
                  </p>
                </div>

                <div className="bg-blue-900/20 border border-blue-500 rounded-lg p-4">
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-blue-400 mr-3 mt-0.5" />
                    <div>
                      <h4 className="text-blue-400 font-medium text-sm mb-1">Processing Time</h4>
                      <p className="text-blue-300 text-xs">
                        Deposits are typically processed within 15-30 minutes during business hours.
                        You'll see the balance update in your dashboard once confirmed.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="btn-primary w-full"
                >
                  Return to Dashboard
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}