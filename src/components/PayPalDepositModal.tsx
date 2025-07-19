'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, CreditCard, Shield, CheckCircle, AlertCircle } from 'lucide-react';

interface PayPalDepositModalProps {
  onClose: () => void;
  onSuccess: (amount: number) => void;
}

export default function PayPalDepositModal({ onClose, onSuccess }: PayPalDepositModalProps) {
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'amount' | 'paypal' | 'success'>('amount');
  const [error, setError] = useState('');

  const predefinedAmounts = [100, 250, 500, 1000, 2500, 5000];

  const handleAmountSubmit = () => {
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount < 10) {
      setError('Minimum deposit amount is $10');
      return;
    }
    if (numAmount > 10000) {
      setError('Maximum deposit amount is $10,000');
      return;
    }
    setError('');
    setStep('paypal');
  };

  const handlePayPalPayment = async () => {
    setIsProcessing(true);
    
    // Simulate PayPal payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setStep('success');
    
    // Wait a moment then call success callback
    setTimeout(() => {
      onSuccess(parseFloat(amount));
    }, 1500);
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
          className="bg-slate-800 rounded-xl p-6 w-full max-w-md border border-slate-700"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              {step === 'amount' && 'Deposit Funds'}
              {step === 'paypal' && 'PayPal Payment'}
              {step === 'success' && 'Deposit Successful'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Amount Selection Step */}
          {step === 'amount' && (
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
                  Deposit Amount (USD)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-600 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter amount"
                    min="10"
                    max="10000"
                  />
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div>
                <p className="text-sm text-gray-400 mb-3">Quick select:</p>
                <div className="grid grid-cols-3 gap-2">
                  {predefinedAmounts.map((preAmount) => (
                    <button
                      key={preAmount}
                      onClick={() => setAmount(preAmount.toString())}
                      className="p-2 text-sm bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 hover:text-white transition-colors duration-200"
                    >
                      ${preAmount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-blue-900/20 border border-blue-500 rounded-lg p-4">
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-blue-400 mr-3 mt-0.5" />
                  <div>
                    <h4 className="text-blue-400 font-medium text-sm">Secure Payment</h4>
                    <p className="text-blue-300 text-xs mt-1">
                      Your payment is processed securely through PayPal's encrypted payment system. 
                      Funds will be available in your account immediately.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAmountSubmit}
                disabled={!amount}
                className="btn-primary w-full"
              >
                Continue to PayPal
              </button>
            </motion.div>
          )}

          {/* PayPal Payment Step */}
          {step === 'paypal' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Confirm Payment
                </h3>
                <p className="text-gray-400 text-sm">
                  You will be redirected to PayPal to complete your payment of{' '}
                  <span className="text-white font-semibold">${parseFloat(amount).toLocaleString()}</span>
                </p>
              </div>

              <div className="bg-slate-700 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount:</span>
                  <span className="text-white font-medium">${parseFloat(amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Processing Fee:</span>
                  <span className="text-green-400">Free</span>
                </div>
                <hr className="border-slate-600" />
                <div className="flex justify-between">
                  <span className="text-white font-medium">Total:</span>
                  <span className="text-white font-semibold">${parseFloat(amount).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setStep('amount')}
                  className="btn-secondary flex-1"
                  disabled={isProcessing}
                >
                  Back
                </button>
                <button
                  onClick={handlePayPalPayment}
                  disabled={isProcessing}
                  className="btn-primary flex-1 flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    'Pay with PayPal'
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
                  Payment Successful!
                </h3>
                <p className="text-gray-400">
                  ${parseFloat(amount).toLocaleString()} has been added to your account
                </p>
              </div>

              <div className="bg-green-900/20 border border-green-500 rounded-lg p-4">
                <p className="text-green-400 text-sm">
                  Your funds are now available for trading. You can start investing immediately.
                </p>
              </div>

              <button
                onClick={onClose}
                className="btn-primary w-full"
              >
                Continue Trading
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}