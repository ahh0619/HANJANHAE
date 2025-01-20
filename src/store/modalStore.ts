'use client';
import { useEffect } from 'react';
import { create } from 'zustand';

type Modal = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const useModalStore = create<Modal>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));

const useBodyLock = () => {
  const isModalOpen = useModalStore((state) => state.isModalOpen);

  useEffect(() => {
    const html = document.documentElement;

    if (isModalOpen) {
      html.classList.add('html-overflow-hidden');
    } else {
      html.classList.remove('html-overflow-hidden');
    }

    return () => {
      html.classList.remove('html-overflow-hidden');
    };
  }, [isModalOpen]);
};

export { useBodyLock };
export default useModalStore;
