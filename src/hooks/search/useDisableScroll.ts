import { useEffect } from 'react';

const useDisableScroll = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden'; // 스크롤 비활성화
    } else {
      document.documentElement.style.overflow = ''; // 원래 상태로 복원
    }

    return () => {
      document.documentElement.style.overflow = ''; // 컴포넌트 언마운트 시 복원
    };
  }, [isOpen]);
};

export default useDisableScroll;
