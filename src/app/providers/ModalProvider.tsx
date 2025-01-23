'use client';

import React, { createContext, useContext, useState } from 'react';

import Modal from '@/components/common/Modal';

type ModalContextType = {
  openModal: (options: {
    title?: string;
    content?: string;
    primaryAction?: {
      text: string;
      onClick: () => void;
    };
    secondaryAction?: {
      text: string;
      onClick: () => void;
    };
  }) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [modalOptions, setModalOptions] = useState<{
    title?: string;
    content?: string;
    primaryAction?: {
      text: string;
      onClick: () => void;
    };
    secondaryAction?: {
      text: string;
      onClick: () => void;
    };
  }>({});

  function openModal(
    options: ModalContextType['openModal'] extends (o: infer U) => any
      ? U
      : never,
  ) {
    setModalOptions(options);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={modalOptions.title || '모달 제목'}
        content={modalOptions.content || ''}
        primaryAction={modalOptions.primaryAction}
        secondaryAction={modalOptions.secondaryAction}
      />
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
