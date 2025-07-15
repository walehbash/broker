const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  balance: {
    type: Number,
    default: 0,
    min: 0
  },
  walletAddress: {
    type: String,
    unique: true,
    required: true
  },
  totalInterestEarned: {
    type: Number,
    default: 0
  },
  lastInterestUpdate: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  joinedAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  },
  balanceHistory: [{
    amount: Number,
    timestamp: {
      type: Date,
      default: Date.now
    },
    type: {
      type: String,
      enum: ['deposit', 'interest', 'withdrawal'],
      required: true
    },
    description: String
  }]
}, {
  timestamps: true
});

// Generate wallet address before saving
UserSchema.pre('save', function(next) {
  if (!this.walletAddress) {
    // Generate a unique wallet address
    this.walletAddress = 'BRK' + crypto.randomBytes(16).toString('hex').toUpperCase();
  }
  next();
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Add to balance history
UserSchema.methods.addToBalanceHistory = function(amount, type, description) {
  this.balanceHistory.push({
    amount,
    type,
    description: description || `${type.charAt(0).toUpperCase() + type.slice(1)} of $${amount.toFixed(2)}`
  });
  
  // Keep only last 100 transactions
  if (this.balanceHistory.length > 100) {
    this.balanceHistory = this.balanceHistory.slice(-100);
  }
};

// Update balance with history tracking
UserSchema.methods.updateBalance = function(amount, type, description) {
  this.balance += amount;
  this.addToBalanceHistory(amount, type, description);
  
  if (type === 'interest') {
    this.totalInterestEarned += amount;
  }
};

module.exports = mongoose.model('User', UserSchema);