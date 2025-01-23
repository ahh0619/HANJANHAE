'use client';

import React, { createContext, useContext, useState } from 'react';

import Toast from '@/components/common/Toast';

type ToastContextType = {
  openToast: (message: string, duration?: number) => void;
  closeToast: () => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toastMessage, setToastMessage] = useState('');
  const [duration, setDuration] = useState(3000);

  function openToast(message: string, customDuration = 3000) {
    setToastMessage(message);
    setDuration(customDuration);
  }

  function closeToast() {
    setToastMessage('');
  }

  return (
    <ToastContext.Provider value={{ openToast, closeToast }}>
      {children}
      {!!toastMessage && (
        <Toast
          message={toastMessage}
          duration={duration}
          onClose={closeToast}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
