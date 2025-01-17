import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

type ToastProps = {
  message: string;
  duration?: number;
  onClose?: () => void;
};

const Toast: React.FC<ToastProps> = ({ message, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (onClose) onClose();
      }, 500);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible && !message) return null;

  const toastContent = (
    <div
      className={`fixed bottom-[106px] left-1/2 z-50 w-auto -translate-x-1/2 transform rounded-lg bg-gray-800 px-4 py-2 text-center text-label-lm text-white shadow-lg transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {message}
    </div>
  );

  return ReactDOM.createPortal(toastContent, document.body);
};

export default Toast;
