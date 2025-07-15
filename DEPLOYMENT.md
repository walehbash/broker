# 🚀 BrokerPro - External Access & Deployment Guide

## 🌐 **Server Configuration for External Access**

The BrokerPro platform is now configured to work with GitHub Codespaces, Gitpod, and other cloud development environments.

### **Current Server Status:**
- ✅ **Backend API**: Running on port `5000` (external access enabled)
- ✅ **Frontend**: Running on port `3000` (external access enabled)
- ✅ **Database**: MongoDB on port `27017`
- ✅ **WebSocket**: Real-time updates enabled

## 🔗 **Access URLs**

### **For GitHub Codespaces:**
```
Frontend: https://[CODESPACE-NAME]-3000.app.github.dev
Backend API: https://[CODESPACE-NAME]-5000.app.github.dev
```

### **For Local Development:**
```
Frontend: http://localhost:3000
Backend API: http://localhost:5000
```

### **For Other Cloud Environments:**
```
Frontend: http://[YOUR-HOST]:3000
Backend API: http://[YOUR-HOST]:5000
```

## ⚙️ **Configuration Changes Made**

### **Frontend Configuration:**
- **Host binding**: `0.0.0.0` (accepts external connections)
- **Proxy setup**: Routes `/api/*` requests to backend
- **CORS enabled**: For cross-origin requests
- **Socket.io**: Auto-detects environment and adjusts connection

### **Backend Configuration:**
- **Host binding**: `0.0.0.0:5000` (accepts external connections)
- **CORS policy**: Allows GitHub Codespaces and common cloud IDEs
- **WebSocket CORS**: Configured for external access
- **Health endpoint**: `/api/health` for monitoring

## 🛠 **Development Scripts**

```bash
# Start both servers for external access
npm run start:external

# Start individual services
cd backend && npm start    # Backend on 0.0.0.0:5000
cd frontend && npm start   # Frontend on 0.0.0.0:3000

# Local development only
cd frontend && npm run start:local  # Frontend on localhost:3000
```

## 🔐 **Demo Credentials**

```
Email: demo@brokerpro.com
Password: Demo123!
```

## 📱 **Features Working Externally**

- ✅ **User Authentication** (Login/Register)
- ✅ **Real-time Balance Updates** (WebSocket)
- ✅ **Interest Calculations** (Every minute)
- ✅ **Deposit/Withdrawal Simulation**
- ✅ **Transaction History**
- ✅ **Professional Dashboard**
- ✅ **Responsive Design**

## 🐛 **Troubleshooting**

### **If Codespaces shows "Service Unavailable":**
1. Check port visibility in Codespaces settings
2. Make sure both services are running:
   ```bash
   ps aux | grep -E "(node|npm)"
   ```

### **WebSocket Connection Issues:**
- The frontend auto-detects the environment
- For custom environments, update `REACT_APP_SOCKET_URL` in `.env`

### **CORS Errors:**
- Backend is configured to allow common cloud IDE domains
- For custom domains, add them to the CORS whitelist in `server.js`

## 📦 **Environment Variables**

### **Frontend (.env):**
```
HOST=0.0.0.0
PORT=3000
REACT_APP_API_URL=/api
CHOKIDAR_USEPOLLING=true
WATCHPACK_POLLING=true
```

### **Backend (.env):**
```
HOST=0.0.0.0
PORT=5000
MONGODB_URI=mongodb://localhost:27017/brokerpro
JWT_SECRET=your-secret-key-here
ANNUAL_INTEREST_RATE=5.2
NODE_ENV=development
```

## 🚀 **GitHub Codespaces Quick Start**

1. **Open Codespace** with this repository
2. **Wait for auto-setup** (servers start automatically)
3. **Access frontend** via the Ports tab or popup notification
4. **Login** with demo credentials above

The platform will automatically detect it's running in Codespaces and configure itself appropriately.

## 🌍 **Public Deployment**

For production deployment to services like Vercel, Netlify, or Heroku:

1. **Frontend**: Build and deploy the `frontend` folder
2. **Backend**: Deploy the `backend` folder
3. **Database**: Use MongoDB Atlas or similar cloud database
4. **Environment**: Update URLs and secrets for production

---

**🎯 The BrokerPro platform is now ready for external access and cloud development!**