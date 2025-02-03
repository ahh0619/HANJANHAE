'use client';

import { HeartIcon } from 'lucide-react';

type LikeButtonProps = {
  isLiked: boolean;
  onClick: () => void;
};

const LikeButton = ({ isLiked, onClick }: LikeButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-full p-2 transition-colors"
      aria-label={isLiked ? '좋아요 취소' : '좋아요'}
    >
      <HeartIcon
        className={`h-6 w-6 transition-colors ${
          isLiked ? 'fill-primary text-primary' : 'text-grayscale-900'
        }`}
      />
    </button>
  );
};

export default LikeButton;
