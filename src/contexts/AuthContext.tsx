'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  walletAddress: string;
  balance: number;
  isAdmin?: boolean;
  pendingDeposits?: PendingDeposit[];
}

interface PendingDeposit {
  id: string;
  userId: string;
  amount: number;
  txHash: string;
  status: 'pending' | 'confirmed' | 'rejected';
  timestamp: Date;
  adminWalletAddress: string;
}

interface AdminSettings {
  depositWalletAddress: string;
  minimumDeposit: number;
  depositInstructions: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateBalance: (amount: number) => void;
  submitCryptoDeposit: (amount: number, txHash: string) => Promise<boolean>;
  isLoading: boolean;
  // Admin functions
  adminSettings: AdminSettings;
  updateAdminSettings: (settings: Partial<AdminSettings>) => void;
  getAllUsers: () => User[];
  updateUserBalance: (userId: string, newBalance: number) => boolean;
  getPendingDeposits: () => PendingDeposit[];
  confirmDeposit: (depositId: string) => boolean;
  rejectDeposit: (depositId: string) => boolean;
}

const defaultAdminSettings: AdminSettings = {
  depositWalletAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
  minimumDeposit: 50,
  depositInstructions: 'Send your cryptocurrency to the address above and provide the transaction hash for verification.'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [adminSettings, setAdminSettings] = useState<AdminSettings>(defaultAdminSettings);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [pendingDeposits, setPendingDeposits] = useState<PendingDeposit[]>([]);

  useEffect(() => {
    // Load data from localStorage on mount
    const storedUser = localStorage.getItem('octaTrade_user');
    const storedUsers = localStorage.getItem('octaTrade_allUsers');
    const storedAdminSettings = localStorage.getItem('octaTrade_adminSettings');
    const storedPendingDeposits = localStorage.getItem('octaTrade_pendingDeposits');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedUsers) {
      setAllUsers(JSON.parse(storedUsers));
    }
    if (storedAdminSettings) {
      setAdminSettings(JSON.parse(storedAdminSettings));
    }
    if (storedPendingDeposits) {
      setPendingDeposits(JSON.parse(storedPendingDeposits).map((deposit: any) => ({
        ...deposit,
        timestamp: new Date(deposit.timestamp)
      })));
    }

    // Create default admin user if no users exist
    if (!storedUsers) {
      const adminUser: User = {
        id: 'admin-001',
        email: 'admin@octatrade.com',
        name: 'OctaTrade Admin',
        walletAddress: generateWalletAddress(),
        balance: 0,
        isAdmin: true,
        pendingDeposits: []
      };
      const initialUsers = [adminUser];
      setAllUsers(initialUsers);
      localStorage.setItem('octaTrade_allUsers', JSON.stringify(initialUsers));
    }

    setIsLoading(false);
  }, []);

  const generateWalletAddress = () => {
    // Generate a mock Bitcoin wallet address
    const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    let result = '1';
    for (let i = 0; i < 33; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists in allUsers
      let existingUser = allUsers.find(u => u.email === email);
      
      if (!existingUser) {
        // Create new user if doesn't exist
        const userData: User = {
          id: Date.now().toString(),
          email,
          name: email.split('@')[0],
          walletAddress: generateWalletAddress(),
          balance: 0,
          isAdmin: email === 'admin@octatrade.com',
          pendingDeposits: []
        };
        
        const updatedUsers = [...allUsers, userData];
        setAllUsers(updatedUsers);
        localStorage.setItem('octaTrade_allUsers', JSON.stringify(updatedUsers));
        existingUser = userData;
      }
      
      setUser(existingUser);
      localStorage.setItem('octaTrade_user', JSON.stringify(existingUser));
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUser = allUsers.find(u => u.email === email);
      if (existingUser) {
        setIsLoading(false);
        return false; // User already exists
      }
      
      const userData: User = {
        id: Date.now().toString(),
        email,
        name,
        walletAddress: generateWalletAddress(),
        balance: 0,
        isAdmin: email === 'admin@octatrade.com',
        pendingDeposits: []
      };
      
      const updatedUsers = [...allUsers, userData];
      setAllUsers(updatedUsers);
      localStorage.setItem('octaTrade_allUsers', JSON.stringify(updatedUsers));
      
      setUser(userData);
      localStorage.setItem('octaTrade_user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('octaTrade_user');
  };

  const updateBalance = (amount: number) => {
    if (user) {
      const updatedUser = { ...user, balance: user.balance + amount };
      setUser(updatedUser);
      localStorage.setItem('octaTrade_user', JSON.stringify(updatedUser));
      
      // Update in allUsers as well
      const updatedUsers = allUsers.map(u => 
        u.id === user.id ? updatedUser : u
      );
      setAllUsers(updatedUsers);
      localStorage.setItem('octaTrade_allUsers', JSON.stringify(updatedUsers));
    }
  };

  const submitCryptoDeposit = async (amount: number, txHash: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const deposit: PendingDeposit = {
        id: Date.now().toString(),
        userId: user.id,
        amount,
        txHash,
        status: 'pending',
        timestamp: new Date(),
        adminWalletAddress: adminSettings.depositWalletAddress
      };

      const updatedDeposits = [...pendingDeposits, deposit];
      setPendingDeposits(updatedDeposits);
      localStorage.setItem('octaTrade_pendingDeposits', JSON.stringify(updatedDeposits));

      return true;
    } catch (error) {
      return false;
    }
  };

  // Admin functions
  const updateAdminSettings = (settings: Partial<AdminSettings>) => {
    const updatedSettings = { ...adminSettings, ...settings };
    setAdminSettings(updatedSettings);
    localStorage.setItem('octaTrade_adminSettings', JSON.stringify(updatedSettings));
  };

  const getAllUsers = () => {
    return allUsers;
  };

  const updateUserBalance = (userId: string, newBalance: number): boolean => {
    try {
      const updatedUsers = allUsers.map(u => 
        u.id === userId ? { ...u, balance: newBalance } : u
      );
      setAllUsers(updatedUsers);
      localStorage.setItem('octaTrade_allUsers', JSON.stringify(updatedUsers));

      // Update current user if it's the same user
      if (user && user.id === userId) {
        const updatedUser = { ...user, balance: newBalance };
        setUser(updatedUser);
        localStorage.setItem('octaTrade_user', JSON.stringify(updatedUser));
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  const getPendingDeposits = () => {
    return pendingDeposits;
  };

  const confirmDeposit = (depositId: string): boolean => {
    try {
      const deposit = pendingDeposits.find(d => d.id === depositId);
      if (!deposit) return false;

      // Update deposit status
      const updatedDeposits = pendingDeposits.map(d => 
        d.id === depositId ? { ...d, status: 'confirmed' as const } : d
      );
      setPendingDeposits(updatedDeposits);
      localStorage.setItem('octaTrade_pendingDeposits', JSON.stringify(updatedDeposits));

      // Add balance to user
      updateUserBalance(deposit.userId, 
        allUsers.find(u => u.id === deposit.userId)?.balance! + deposit.amount
      );

      return true;
    } catch (error) {
      return false;
    }
  };

  const rejectDeposit = (depositId: string): boolean => {
    try {
      const updatedDeposits = pendingDeposits.map(d => 
        d.id === depositId ? { ...d, status: 'rejected' as const } : d
      );
      setPendingDeposits(updatedDeposits);
      localStorage.setItem('octaTrade_pendingDeposits', JSON.stringify(updatedDeposits));
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateBalance,
      submitCryptoDeposit,
      isLoading,
      adminSettings,
      updateAdminSettings,
      getAllUsers,
      updateUserBalance,
      getPendingDeposits,
      confirmDeposit,
      rejectDeposit
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}