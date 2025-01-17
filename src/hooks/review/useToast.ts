import { useState } from 'react';

export const useToast = (initialDuration = 1500) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [duration, setDuration] = useState(initialDuration);

  const triggerToast = (message: string, customDuration?: number) => {
    setToastMessage(message);
    setShowToast(true);
    if (customDuration) setDuration(customDuration);
    setTimeout(() => setShowToast(false), customDuration || initialDuration);
  };

  return { showToast, toastMessage, duration, triggerToast, setShowToast };
};
