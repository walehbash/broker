import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Set up axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const savedToken = localStorage.getItem('token');
    
    if (!savedToken) {
      setLoading(false);
      return;
    }

    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
      const response = await axios.get('/api/auth/me');
      
      if (response.data.success) {
        setUser(response.data.user);
        setToken(savedToken);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });

      if (response.data.success) {
        const { token: authToken, user: userData } = response.data;
        
        localStorage.setItem('token', authToken);
        setToken(authToken);
        setUser(userData);
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
        
        toast.success('Welcome back!');
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/auth/register', {
        name,
        email,
        password
      });

      if (response.data.success) {
        const { token: authToken, user: userData } = response.data;
        
        localStorage.setItem('token', authToken);
        setToken(authToken);
        setUser(userData);
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
        
        toast.success('Account created successfully!');
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    toast.success('Logged out successfully');
  };

  const updateUser = (userData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...userData
    }));
  };

  const updateBalance = (newBalance, transaction = null) => {
    setUser(prevUser => ({
      ...prevUser,
      balance: newBalance
    }));

    if (transaction) {
      const message = transaction.type === 'interest' 
        ? `+$${transaction.amount.toFixed(2)} interest earned`
        : `${transaction.type === 'deposit' ? '+' : ''}$${transaction.amount.toFixed(2)} ${transaction.type}`;
      
      toast.success(message, {
        icon: transaction.type === 'interest' ? '💰' : transaction.type === 'deposit' ? '⬆️' : '⬇️'
      });
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUser,
    updateBalance,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};