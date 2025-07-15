const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const cron = require('node-cron');

// Load env vars
dotenv.config();

// Route files
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const walletRoutes = require('./routes/wallet');

// Import models
const User = require('./models/User');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Body parser middleware
app.use(express.json());

// CORS middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('join-user-room', (userId) => {
    socket.join(`user-${userId}`);
    console.log(`User ${userId} joined their room`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Make io accessible to routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/wallet', walletRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Interest calculation cron job (runs every minute for demo purposes)
cron.schedule('*/1 * * * *', async () => {
  try {
    const users = await User.find({ balance: { $gt: 0 } });
    const interestRate = parseFloat(process.env.INTEREST_RATE) || 0.05;
    
    for (const user of users) {
      const minutelyRate = interestRate / (365 * 24 * 60); // Convert annual rate to per-minute
      const interestAmount = user.balance * minutelyRate;
      
      user.balance += interestAmount;
      user.lastInterestUpdate = new Date();
      await user.save();
      
      // Emit real-time balance update
      io.to(`user-${user._id}`).emit('balance-update', {
        balance: user.balance,
        interestEarned: interestAmount
      });
    }
  } catch (error) {
    console.error('Error calculating interest:', error);
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});