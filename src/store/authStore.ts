import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { UserType } from '@/types/Auth';

type AuthStore = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  removeUser: () => void;
};

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: null,
      setUser: (user: UserType | null) => set({ user }),
      removeUser: () => set({ user: null }),
    }),
    { name: 'auth-storage' },
  ),
);
