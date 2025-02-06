import { useEffect } from 'react';

const useDisableScroll = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden'; 
    } else {
      document.documentElement.style.overflow = ''; 
    }

    return () => {
      document.documentElement.style.overflow = ''; // 컴포넌트 언마운트 시 복원
    };
  }, [isOpen]);
};

export default useDisableScroll;
