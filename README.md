# BrokerPro - Modern Investment Platform

A full-stack investment and account funding platform built with React, Node.js, Express, and MongoDB. Features real-time balance updates, secure authentication, and a modern user interface designed for trust and ease of use.

![BrokerPro Platform](https://via.placeholder.com/800x400/2563eb/ffffff?text=BrokerPro+Investment+Platform)

## 🌟 Features

### Core Functionality
- **User Authentication**: Secure signup/login with JWT tokens and password strength validation
- **Unique Wallet Addresses**: Each user gets a unique wallet address for fund transfers
- **Real-time Balance Updates**: Live balance tracking with WebSocket connections
- **Interest Calculation**: Automatic interest accrual with real-time notifications
- **Transaction History**: Complete history of deposits, withdrawals, and interest earnings
- **Responsive Design**: Mobile-first design that works on all devices

### Frontend Features
- **Modern Landing Page**: Conversion-optimized design emphasizing trust and benefits
- **Interactive Dashboard**: Real-time portfolio overview with animated balance cards
- **Form Validation**: Comprehensive client-side validation with user-friendly error messages
- **Real-time Notifications**: Toast notifications for all user actions and updates
- **Smooth Animations**: Framer Motion animations for enhanced user experience

### Backend Features
- **RESTful API**: Well-structured API endpoints with proper error handling
- **Database Models**: MongoDB schemas with validation and middleware
- **Real-time Communication**: Socket.io for live balance updates
- **Interest Automation**: Cron jobs for automatic interest calculation
- **Security**: Password hashing, JWT authentication, and input validation

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **React Router 6** - Client-side routing and navigation
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Framer Motion** - Animation library for smooth transitions
- **Axios** - HTTP client for API communication
- **Socket.io Client** - Real-time communication
- **React Hot Toast** - Beautiful toast notifications
- **Lucide React** - Modern icon library

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling
- **Socket.io** - Real-time bidirectional communication
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Node-cron** - Task scheduling for interest calculation

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd broker-platform
   ```

2. **Install dependencies for all components**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/broker-platform
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=30d
   NODE_ENV=development
   INTEREST_RATE=0.05
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # If using local MongoDB
   mongod
   
   # Or start MongoDB service
   sudo systemctl start mongodb
   ```

5. **Run the application**
   ```bash
   # Start both frontend and backend concurrently
   npm run dev
   ```

   The application will be available at:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Alternative: Run components separately

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

## 📱 Usage Guide

### Getting Started

1. **Visit the Landing Page**
   - Navigate to http://localhost:3000
   - Explore the features and benefits
   - Click "Get Started" to create an account

2. **Create an Account**
   - Fill out the registration form with strong password requirements
   - Receive your unique wallet address upon registration
   - Automatically logged in after successful registration

3. **Dashboard Overview**
   - View your real-time portfolio balance
   - See your unique wallet address
   - Monitor transaction history
   - Track interest earnings

4. **Simulate Transactions**
   - Use the "Deposit" button to simulate adding funds
   - Use the "Withdraw" button to simulate fund removal
   - Watch real-time balance updates

5. **Interest Earnings**
   - Interest is calculated automatically every minute (for demo purposes)
   - Receive real-time notifications when interest is earned
   - Track total interest in your dashboard stats

## 🎯 Key Components

### Frontend Structure
```
frontend/src/
├── components/          # Reusable UI components
│   ├── Navbar.js       # Navigation with authentication state
│   └── LoadingSpinner.js
├── contexts/           # React contexts for state management
│   ├── AuthContext.js  # Authentication and user state
│   └── SocketContext.js # Real-time communication
├── pages/              # Main application pages
│   ├── LandingPage.js  # Conversion-optimized landing page
│   ├── LoginPage.js    # User authentication
│   ├── RegisterPage.js # Account creation
│   ├── Dashboard.js    # Main user dashboard
│   └── Profile.js      # User profile management
└── App.js              # Main application component
```

### Backend Structure
```
backend/
├── models/             # Database schemas
│   └── User.js         # User model with wallet and balance
├── routes/             # API route handlers
│   ├── auth.js         # Authentication endpoints
│   ├── user.js         # User management
│   └── wallet.js       # Wallet operations
├── middleware/         # Express middleware
│   └── auth.js         # JWT authentication middleware
└── server.js           # Main server file
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Backend server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/broker-platform` |
| `JWT_SECRET` | Secret key for JWT tokens | Required |
| `JWT_EXPIRE` | JWT token expiration time | `30d` |
| `NODE_ENV` | Environment mode | `development` |
| `INTEREST_RATE` | Annual interest rate (decimal) | `0.05` |

### Interest Calculation

The platform calculates interest every minute for demonstration purposes. In production, you would typically:
- Calculate interest daily or monthly
- Use more sophisticated interest rate models
- Implement compound interest calculations

To modify the interest calculation interval, edit the cron schedule in `backend/server.js`:
```javascript
// Current: Every minute
cron.schedule('*/1 * * * *', async () => {
  // Interest calculation logic
});

// Daily at midnight
cron.schedule('0 0 * * *', async () => {
  // Interest calculation logic
});
```

## 🔐 Security Features

- **Password Security**: bcrypt hashing with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Server-side validation using express-validator
- **CORS Protection**: Configured for development environment
- **Unique Wallet Addresses**: Cryptographically generated unique identifiers

## 🚀 Production Deployment

### Prerequisites for Production
1. **Environment Setup**
   - Use MongoDB Atlas or dedicated MongoDB server
   - Set strong JWT secrets
   - Configure proper CORS origins
   - Set NODE_ENV to 'production'

2. **Frontend Build**
   ```bash
   cd frontend
   npm run build
   ```

3. **Backend Configuration**
   - Update CORS origins to match your domain
   - Use environment variables for all secrets
   - Set up proper logging
   - Configure SSL/HTTPS

### Deployment Options
- **Frontend**: Netlify, Vercel, or AWS S3 + CloudFront
- **Backend**: Heroku, DigitalOcean, AWS EC2, or Railway
- **Database**: MongoDB Atlas (recommended)

## 🔄 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### User Endpoints
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/dashboard-stats` - Get dashboard statistics
- `GET /api/user/balance-history` - Get balance history

### Wallet Endpoints
- `GET /api/wallet/info` - Get wallet information
- `POST /api/wallet/deposit` - Simulate deposit
- `POST /api/wallet/withdraw` - Simulate withdrawal
- `GET /api/wallet/transactions` - Get transaction history

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. **Check the Prerequisites**: Ensure Node.js and MongoDB are properly installed
2. **Verify Environment Variables**: Make sure all required environment variables are set
3. **Check Console Logs**: Look for error messages in both frontend and backend consoles
4. **Database Connection**: Verify MongoDB is running and accessible

For additional support, please open an issue in the repository.

---

Built with ❤️ for modern investors who demand transparency, security, and real-time insights into their portfolio performance.