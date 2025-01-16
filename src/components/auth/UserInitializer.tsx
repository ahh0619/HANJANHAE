'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import useSocial from '@/hooks/auth/useSocial';
import { useAuthStore } from '@/store/authStore';

const UserInitializer = () => {
  const router = useRouter();

  const { user, isAgree } = useAuthStore();
  const { handleAgree } = useSocial();

  console.log('user => ', user);

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
