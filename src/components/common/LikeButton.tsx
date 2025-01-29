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
      className="flex items-center justify-center rounded-full p-2 transition-colors"
      aria-label={isLiked ? '좋아요 취소' : '좋아요'}
    >
      <HeartIcon
        className={`h-6 w-6 transition-colors ${
          isLiked ? 'fill-primary text-primary' : 'text-black'
        }`}
      />
    </button>
  );
};

export default LikeButton;
