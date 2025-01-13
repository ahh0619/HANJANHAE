'use client';

import { useEffect, useState } from 'react';

import BackButton from '@/components/common/BackButton';
import LikeButton from '@/components/common/LikeButton';
import { useAuthStore } from '@/store/authStore';

import ShareButton from './ShareButton';

type DynamicHeaderProps = {
  name: string;
  image: string;
  description: string;
  drinkId: string;
};

const DynamicHeader = ({
  name,
  image,
  description,
  drinkId,
}: DynamicHeaderProps) => {
  const { user } = useAuthStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200); // 스크롤 200px 이상일 때만 true
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed left-0 top-0 z-50 w-full p-4 transition-all ${
        scrolled
          ? 'bg-white text-gray-900 shadow-md' // 스크롤 상태에서 보이게
          : 'hidden' // 스크롤이 없으면 숨김
      }`}
    >
      <div className="relative flex items-center justify-between">
        {/* 뒤로가기 버튼 */}
        <BackButton />

        {/* 술 이름 */}
        <p className="absolute left-1/2 -translate-x-1/2 transform text-base font-bold">
          {name}
        </p>

        {/* 좋아요 및 공유 버튼 */}
        <div className="flex">
          <LikeButton userId={user?.id} drinkId={drinkId} />
          <ShareButton title={name} text={description} imageUrl={image} />
        </div>
      </div>
    </div>
  );
};

export default DynamicHeader;
