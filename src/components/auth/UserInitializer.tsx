'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import useSocial from '@/hooks/auth/useSocial';
import { useAuthStore } from '@/store/authStore';
import { checkUser, fetchUser } from '@/utils/auth/action';

const UserInitializer = () => {
  const router = useRouter();

  const { user, isAgree, setUser } = useAuthStore();
  const { handleAgree } = useSocial();

  console.log('user => ', user);

  useEffect(() => {
    const setUserData = async () => {
      if (await checkUser()) {
        setUser(await fetchUser());
      }
    };

    setUserData();
  }, []);

  useEffect(() => {
    const setAgreeTerms = async () => {
      if (user && !user.agree_terms) {
        handleAgree({
          userId: user.id,
          isAgree,
          onAgree: () => router.push('/'),
          onDisagree: () => router.push('/signup'),
        });
      }
    };

    setAgreeTerms();
  }, [user]);

  return null;
};

export default UserInitializer;
