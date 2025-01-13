import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { UserType } from '@/types/Auth';

type AuthStore = {
  user: UserType | null;
  isAgree: boolean;
  isSocial: boolean;
  setUser: (user: UserType | null) => void;
  removeUser: () => void;
  setIsAgree: (isAgree: boolean) => void;
  setIsSocial: (isSocial: boolean) => void;
};

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: null,
      isAgree: false,
      isSocial: false,
      setUser: (user: UserType | null) => set({ user }),
      removeUser: () => set({ user: null, isAgree: false, isSocial: false }),
      setIsAgree: (isAgree: boolean) => set({ isAgree }),
      setIsSocial: (isSocial: boolean) => set({ isSocial }),
    }),
    { name: 'auth-storage' },
  ),
);
