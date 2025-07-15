const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Apply protection to all routes
router.use(protect);

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        balance: user.balance,
        walletAddress: user.walletAddress,
        totalInterestEarned: user.totalInterestEarned,
        joinedAt: user.joinedAt,
        lastLogin: user.lastLogin,
        isActive: user.isActive
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
router.put('/profile', [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Please include a valid email').normalizeEmail()
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

    const { name, email } = req.body;
    const updateFields = {};

    if (name) updateFields.name = name;
    if (email) {
      // Check if email is already taken by another user
      const existingUser = await User.findOne({ 
        email, 
        _id: { $ne: req.user.id } 
      });
      
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email is already taken'
        });
      }
      updateFields.email = email;
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateFields,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        balance: user.balance,
        walletAddress: user.walletAddress,
        totalInterestEarned: user.totalInterestEarned,
        joinedAt: user.joinedAt,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get balance history
// @route   GET /api/user/balance-history
// @access  Private
router.get('/balance-history', async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Sort balance history by timestamp (newest first)
    const sortedHistory = user.balanceHistory.sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    );

    res.json({
      success: true,
      balanceHistory: sortedHistory,
      totalTransactions: sortedHistory.length
    });
  } catch (error) {
    console.error('Get balance history error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get dashboard stats
// @route   GET /api/user/dashboard-stats
// @access  Private
router.get('/dashboard-stats', async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Calculate stats
    const totalDeposits = user.balanceHistory
      .filter(entry => entry.type === 'deposit')
      .reduce((sum, entry) => sum + entry.amount, 0);
    
    const totalInterest = user.balanceHistory
      .filter(entry => entry.type === 'interest')
      .reduce((sum, entry) => sum + entry.amount, 0);
    
    const totalWithdrawals = user.balanceHistory
      .filter(entry => entry.type === 'withdrawal')
      .reduce((sum, entry) => sum + Math.abs(entry.amount), 0);
    
    // Calculate days since joining
    const daysSinceJoining = Math.floor(
      (new Date() - new Date(user.joinedAt)) / (1000 * 60 * 60 * 24)
    );
    
    // Calculate average daily interest (if applicable)
    const avgDailyInterest = daysSinceJoining > 0 ? totalInterest / daysSinceJoining : 0;
    
    // Recent transactions (last 5)
    const recentTransactions = user.balanceHistory
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 5);

    res.json({
      success: true,
      stats: {
        currentBalance: user.balance,
        totalDeposits,
        totalInterest,
        totalWithdrawals,
        daysSinceJoining,
        avgDailyInterest,
        walletAddress: user.walletAddress,
        memberSince: user.joinedAt,
        lastLogin: user.lastLogin,
        recentTransactions
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;