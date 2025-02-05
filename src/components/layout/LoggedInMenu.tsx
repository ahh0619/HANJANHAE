'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import MypageModal from '@/app/mypage/_components/MypageModal';
import OptimizedImage from '@/components/common/OptimizedImage';

const LoggedInMenu = () => {
  const [isMyPageModalOpen, setMyPageModalOpen] = useState(false);
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });
  const modalRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  useEffect(() => {
    if (!isDesktop) {
      setMyPageModalOpen(false);
    }
  }, [isDesktop]);

  useEffect(() => {
    setMyPageModalOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMyPageModalOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setMyPageModalOpen(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMyPageModalOpen]);

  const handleMyPageClick = () => {
    setMyPageModalOpen((prev) => !prev);
  };

  return (
    <div className="flex items-center">
      <Link href="/like" className="flex items-center gap-2 p-3">
        <OptimizedImage src="/assets/icons/header-heart.svg" alt="좋아요" />
        <span className="text-label-mb">좋아요</span>
      </Link>

      <div className="relative">
        <button
          onClick={handleMyPageClick}
          className="flex items-center gap-2 p-3"
        >
          <OptimizedImage
            src="/assets/icons/header-user.svg"
            alt="마이페이지"
          />
          <span className="text-label-mb">마이페이지</span>
        </button>

        {isMyPageModalOpen && (
          <div
            ref={modalRef}
            className="absolute right-0 top-full z-50 mt-2 h-[492px] w-[400px] rounded-2xl border border-gray-200 bg-white shadow-lg"
          >
            <MypageModal />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoggedInMenu;
