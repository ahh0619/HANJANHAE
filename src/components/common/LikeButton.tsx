'use client';

import { HeartIcon } from 'lucide-react';
import { useState } from 'react';

type LikeButtonProps = {
  isLiked?: boolean; // 초기 좋아요 상태
  onToggle?: (liked: boolean) => void; // 좋아요 상태 변경 시 호출
};

const LikeButton = ({ isLiked = false, onToggle }: LikeButtonProps) => {
  const [liked, setLiked] = useState(isLiked);

  const handleClick = () => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    if (onToggle) {
      onToggle(newLikedState);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-50"
      aria-label={liked ? '좋아요 취소' : '좋아요'}
    >
      <HeartIcon
        className={`mr-3 h-6 w-6 transition-colors ${
          liked ? 'fill-red-500 text-red-500' : 'text-black-400'
        }`}
      />
    </button>
  );
};

export default LikeButton;
