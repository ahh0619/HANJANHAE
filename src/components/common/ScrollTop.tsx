'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import OptimizedImage from './OptimizedImage';

const ScrollTop = () => {
  const pathname = usePathname();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (
    ['/signup', '/signin', '/preferences/result'].includes(pathname) ||
    pathname.startsWith('/place')
  ) {
    return null;
  }

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className={`fixed bottom-[68px] right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-primary bg-etc-white transition-opacity duration-300 xl:bottom-10 xl:right-10 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="위로가기"
      >
        <OptimizedImage
          src="/assets/icons/arrow-up.svg"
          alt="위로가기"
          className="text-primary"
        />
      </button>
    )
  );
};

export default ScrollTop;
