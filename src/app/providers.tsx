'use client';

import React from 'react';

import { AuthProvider } from './providers/AuthProvider';
import { ModalProvider } from './providers/ModalProvider';
import QueryProvider from './providers/QueryProvider';
import { ToastProvider } from './providers/ToastProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <AuthProvider>
        <ModalProvider>
          <ToastProvider>{children}</ToastProvider>
        </ModalProvider>
      </AuthProvider>
    </QueryProvider>
  );
};

export default Providers;
