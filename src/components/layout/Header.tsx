'use client';
import { useEffect } from 'react';

import { useAuthStore } from '@/store/authStore';
import { fetchUser } from '@/utils/auth/action';

const Header = () => {
  const { user, setUser } = useAuthStore();

  console.log('user => ', user);

  useEffect(() => {
    const fetchUserData = async () => {
      setUser(await fetchUser());
    };

    fetchUserData();
  }, []);

  return <div>Header</div>;
};

export default Header;
