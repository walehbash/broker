require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const cron = require('node-cron');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const walletRoutes = require('./routes/wallet');
const User = require('./models/User');

const app = express();
const server = http.createServer(app);

// CORS configuration for external access
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow localhost and codespace URLs
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://0.0.0.0:3000',
    ];
    
    // Allow GitHub Codespaces URLs
    if (origin.includes('github') || origin.includes('codespaces') || origin.includes('gitpod')) {
      return callback(null, true);
    }
    
    // Allow preview URLs
    if (origin.includes('preview.app') || origin.includes('app.github.dev')) {
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all origins for development
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Socket.io configuration for external access
const io = socketIo(server, {
  cors: {
    origin: function (origin, callback) {
      callback(null, true); // Allow all origins for development
    },
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    host: req.get('host')
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/wallet', walletRoutes);

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Interest calculation cron job (runs every minute for demo purposes)
cron.schedule('* * * * *', async () => {
  try {
    const users = await User.find({ balance: { $gt: 0 } });
    const interestRate = parseFloat(process.env.ANNUAL_INTEREST_RATE) / 100;
    const dailyRate = interestRate / 365;
    const minuteRate = dailyRate / (24 * 60); // For demo purposes, calculate per minute

    for (const user of users) {
      const interest = user.balance * minuteRate;
      user.balance += interest;
      
      // Add interest transaction
      user.transactions.push({
        type: 'interest',
        amount: interest,
        description: `Interest earned: ${(interestRate * 100).toFixed(1)}% APY`,
        timestamp: new Date()
      });

      await user.save();

      // Emit real-time update to user
      io.to(user._id.toString()).emit('balance-update', {
        newBalance: user.balance,
        interestEarned: interest,
        timestamp: new Date()
      });
    }

    console.log(`Interest calculated for ${users.length} users`);
  } catch (error) {
    console.error('Error calculating interest:', error);
  }
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

server.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
  console.log(`🌍 External access available`);
  console.log(`📡 Socket.io server ready for real-time connections`);
  console.log(`💰 Interest calculation cron job active (every minute)`);
});