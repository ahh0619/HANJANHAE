'use client';

import OptimizedImage from './OptimizedImage';

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
      <OptimizedImage
        src={
          isLiked ? '/assets/icons/heart_filled.svg' : '/assets/icons/heart.svg'
        }
        alt={isLiked ? '좋아요 취소' : '좋아요'}
        width={24}
        height={24}
      />
    </button>
  );
};

export default LikeButton;
