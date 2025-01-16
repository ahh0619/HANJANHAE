import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

type ToastProps = {
  message: string;
  duration?: number;
  onClose?: () => void;
};

const Toast: React.FC<ToastProps> = ({ message, duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (onClose) onClose();
      }, 500);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const toastContent = (
    <div
      className={`fixed bottom-[150px] left-1/2 z-50 -translate-x-1/2 transform rounded-lg bg-gray-800 px-4 py-2 text-sm text-white shadow-lg transition-all duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {message}
    </div>
  );

  return ReactDOM.createPortal(toastContent, document.body);
};

export default Toast;
