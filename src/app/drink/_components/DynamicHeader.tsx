'use client';

import { useEffect, useState } from 'react';

import BackButton from '@/components/common/BackButton';
import LikeButton from '@/components/common/LikeButton';
import ShareButton from '@/components/common/ShareButton';
import { useSingleDrinkLike } from '@/hooks/like/useSingleDrinkLike';
import { useAuthStore } from '@/store/authStore';

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
  const userId = user?.id || '';

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { isLiked, isLoading, handleToggleLike } = useSingleDrinkLike({
    drinkId,
    userId,
  });

  return (
    <div
      className={`fixed left-1/2 top-0 z-50 h-11 w-full max-w-[600px] -translate-x-1/2 transform bg-etc-white text-grayscale-900 transition-all ${
        scrolled ? '' : 'hidden'
      }`}
    >
      <div className="flex items-center justify-between gap-1 px-1">
        {/* 뒤로가기 버튼과 주류 이름 */}
        <div className="flex min-w-0 flex-1 items-center gap-1">
          <BackButton />
          <p className="min-w-0 max-w-[63.7%] overflow-hidden text-ellipsis whitespace-nowrap text-title-xl text-grayscale-900">
            {name}
          </p>
        </div>
        {/* 좋아요 & 공유 버튼 */}
        <div className="flex items-center">
          <LikeButton isLiked={isLiked} onClick={handleToggleLike} />
          <ShareButton title={name} text={description} imageUrl={image} />
        </div>
      </div>
    </div>
  );
};

export default DynamicHeader;
