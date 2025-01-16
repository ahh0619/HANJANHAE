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
      setScrolled(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed left-0 top-0 z-50 w-full p-4 transition-all ${
        scrolled ? 'text-grayscale-900 bg-etc-white shadow-md' : 'hidden'
      }`}
    >
      <div className="relative flex items-center justify-between">
        {/* 뒤로가기 버튼과 주류 이름 */}
        <div className="flex items-center space-x-2">
          <BackButton />
          <p className="text-title-xl text-grayscale-900">{name}</p>
        </div>

        {/* 좋아요 및 공유 버튼 */}
        <div className="flex space-x-2">
          <LikeButton userId={user?.id} drinkId={drinkId} />
          <ShareButton title={name} text={description} imageUrl={image} />
        </div>
      </div>
    </div>
  );
};

export default DynamicHeader;
