'use client';
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

export default useModalStore;
