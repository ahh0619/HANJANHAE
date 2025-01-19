'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ScrollTop() {
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
    ['/signup', '/signin'].includes(pathname) ||
    pathname.startsWith('/place')
  ) {
    return null;
  }

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className={`fixed bottom-[68px] right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-primary bg-etc-white shadow-lg transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="위로가기"
      >
        <Image
          src="/assets/icons/arrow-up.svg"
          alt="위로가기"
          width={24}
          height={24}
          className="text-primary"
        />
      </button>
    )
  );
}
