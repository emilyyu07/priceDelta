import React, { useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import { AuthContext } from './AuthContext';
import { loginApi, registerApi, logoutApi, getToken } from '../services/auth.service';
import { userApi } from '../api/user';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const token = await loginApi(email, password);
      if (token) {
        const userData = await userApi.getMe();
        setUser(userData);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string): Promise<void> => {
    try {
      const { token } = await registerApi(email, password);
      if (token) {
        // After successful registration, log the user in
        const userData = await userApi.getMe();
        setUser(userData);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = useCallback(() => {
    logoutApi();
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    const token = getToken();
    if (token) {
      try {
        const userData = await userApi.getMe();
        setUser(userData);
      } catch (error) {
        console.error('Failed to refresh user:', error);
        logout(); // Logout if refresh fails (e.g., token expired)
      }
    }
  }, [logout]);

  useEffect(() => {
    const checkUser = async () => {
      const token = getToken();
      if (token) {
        try {
          const userData = await userApi.getMe();
          setUser(userData);
        } catch {
          logout();
        }
      }
      setIsLoading(false);
    };
    checkUser();
  }, [logout]);

  const value = {
    user,
    login,
    logout,
    register,
    isAuthenticated: !!user,
    isLoading,
    refreshUser, // Expose refreshUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
