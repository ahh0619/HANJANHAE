'use client';

import { useEffect } from 'react';

export const RegisterServiceWorker = () => {
  useEffect(() => {
    const registerSW = async () => {
      if ('serviceWorker' in navigator) {
        try {
          await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        } catch (err) {
          console.error('Service Worker 등록 실패:', err);
        }
      }
    };

    registerSW();
  }, []);

  return null;
};
