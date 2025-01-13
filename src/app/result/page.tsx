'use client';

import { useAuthStore } from '@/store/authStore';

import DrinkAuthReco from './_components/DrinkAuthReco';
import DrinkGuestReco from './_components/DrinkGuestReco';

const Page = () => {
  const { user } = useAuthStore();

  return user ? (
    <DrinkAuthReco userId={user.id} nickname={user.nickname} />
  ) : (
    <DrinkGuestReco />
  );
};

export default Page;
