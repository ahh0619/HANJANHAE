'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { useAuthStore } from '@/store/authStore';
import { SignInDataType } from '@/types/Auth';

import { checkUser, fetchUser, signout } from '../actions/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { user, setUser, removeUser } = useAuthStore();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchSignedUser = async () => {
      try {
        if (await checkUser()) {
          setUser(await fetchUser());
          setIsAuthenticated(true);
        }
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    fetchSignedUser();
  }, [isAuthenticated]);

  /* 로그인 */
  const login = async (values: SignInDataType) => {
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.errorMessage) {
        throw data.errorMessage;
      }

      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    }
  };

  /* 로그아웃 */
  const logout = async () => {
    try {
      await signout();
      removeUser();
      setIsAuthenticated(false);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
