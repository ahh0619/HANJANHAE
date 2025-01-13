'use client';

import { useEffect } from 'react';

import { useAuthStore } from '@/store/authStore';
import { checkUser, fetchUser } from '@/utils/auth/action';

const UserInitializer = () => {
  const { user, setUser } = useAuthStore();

  console.log('user => ', user);

  useEffect(() => {
    setUserData();
  }, []);

  const setUserData = async () => {
    if (await checkUser()) {
      setUser(await fetchUser());
    }
  };

  return null;
};

export default UserInitializer;
