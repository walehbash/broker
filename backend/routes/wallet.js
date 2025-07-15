const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Apply protection to all routes
router.use(protect);

// @desc    Get wallet info
// @route   GET /api/wallet/info
// @access  Private
router.get('/info', async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      success: true,
      wallet: {
        address: user.walletAddress,
        balance: user.balance,
        totalInterestEarned: user.totalInterestEarned,
        lastInterestUpdate: user.lastInterestUpdate
      }
    });
  } catch (error) {
    console.error('Get wallet info error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Simulate deposit to wallet
// @route   POST /api/wallet/deposit
// @access  Private
router.post('/deposit', [
  body('amount')
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be at least $0.01')
    .toFloat(),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Description must be less than 255 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { amount, description } = req.body;
    const user = await User.findById(req.user.id);

    // Add deposit to balance
    user.updateBalance(
      amount, 
      'deposit', 
      description || `Deposit of $${amount.toFixed(2)}`
    );
    
    await user.save();

    // Emit real-time balance update
    req.io.to(`user-${user._id}`).emit('balance-update', {
      balance: user.balance,
      transaction: {
        amount,
        type: 'deposit',
        description: description || `Deposit of $${amount.toFixed(2)}`,
        timestamp: new Date()
      }
    });

    res.json({
      success: true,
      message: 'Deposit successful',
      wallet: {
        balance: user.balance,
        lastTransaction: {
          amount,
          type: 'deposit',
          description: description || `Deposit of $${amount.toFixed(2)}`,
          timestamp: new Date()
        }
      }
    });
  } catch (error) {
    console.error('Deposit error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during deposit'
    });
  }
});

// @desc    Simulate withdrawal from wallet
// @route   POST /api/wallet/withdraw
// @access  Private
router.post('/withdraw', [
  body('amount')
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be at least $0.01')
    .toFloat(),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Description must be less than 255 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { amount, description } = req.body;
    const user = await User.findById(req.user.id);

    // Check if user has sufficient balance
    if (user.balance < amount) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient balance'
      });
    }

    // Subtract withdrawal from balance (negative amount)
    user.updateBalance(
      -amount, 
      'withdrawal', 
      description || `Withdrawal of $${amount.toFixed(2)}`
    );
    
    await user.save();

    // Emit real-time balance update
    req.io.to(`user-${user._id}`).emit('balance-update', {
      balance: user.balance,
      transaction: {
        amount: -amount,
        type: 'withdrawal',
        description: description || `Withdrawal of $${amount.toFixed(2)}`,
        timestamp: new Date()
      }
    });

    res.json({
      success: true,
      message: 'Withdrawal successful',
      wallet: {
        balance: user.balance,
        lastTransaction: {
          amount: -amount,
          type: 'withdrawal',
          description: description || `Withdrawal of $${amount.toFixed(2)}`,
          timestamp: new Date()
        }
      }
    });
  } catch (error) {
    console.error('Withdrawal error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during withdrawal'
    });
  }
});

// @desc    Get wallet transactions
// @route   GET /api/wallet/transactions
// @access  Private
router.get('/transactions', async (req, res) => {
  try {
    const { page = 1, limit = 10, type } = req.query;
    const user = await User.findById(req.user.id);
    
    let transactions = user.balanceHistory;
    
    // Filter by transaction type if specified
    if (type && ['deposit', 'interest', 'withdrawal'].includes(type)) {
      transactions = transactions.filter(t => t.type === type);
    }
    
    // Sort by timestamp (newest first)
    transactions = transactions.sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    );
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedTransactions = transactions.slice(startIndex, endIndex);
    
    const pagination = {};
    
    if (endIndex < transactions.length) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }
    
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.json({
      success: true,
      count: paginatedTransactions.length,
      total: transactions.length,
      pagination,
      transactions: paginatedTransactions
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Generate new wallet address (if needed)
// @route   POST /api/wallet/regenerate-address
// @access  Private
router.post('/regenerate-address', async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Generate new wallet address
    const crypto = require('crypto');
    const newAddress = 'BRK' + crypto.randomBytes(16).toString('hex').toUpperCase();
    
    user.walletAddress = newAddress;
    await user.save();

    res.json({
      success: true,
      message: 'New wallet address generated',
      walletAddress: newAddress
    });
  } catch (error) {
    console.error('Regenerate address error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;