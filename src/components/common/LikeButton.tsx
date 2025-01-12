'use client';

import { HeartIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { useLikeStatus } from '@/hooks/like/useLikeStatus';
import { useToggleLike } from '@/hooks/like/useToggleLike';

type LikeButtonProps = {
  drinkId: string;
  userId: string | null;
};

const LikeButton = ({ drinkId, userId }: LikeButtonProps) => {
  const router = useRouter();

  const { data } = useLikeStatus(drinkId, userId); // 좋아요 상태 가져오기
  const toggleLikeMutation = useToggleLike({ drinkId, userId: userId }); // 좋아요 토글 훅

  const handleLikeButtonClick = () => {
    if (!userId) {
      // 로그인 페이지로 이동
      toast.info('로그인이 필요한 서비스입니다.');
      router.push('/signin');
      return;
    }

    toggleLikeMutation.mutate(undefined, {
      onSuccess: (result) => {
        if (result.liked) {
          toast('좋아요가 추가되었습니다.');
        } else {
          toast('좋아요가 취소되었습니다.');
        }
      },
      onError: () => {
        toast.error('좋아요 작업 중 오류가 발생했습니다.');
      },
    });
  };

  return (
    <button
      onClick={handleLikeButtonClick}
      className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-50"
      aria-label={data?.liked ? '좋아요 취소' : '좋아요'}
    >
      <HeartIcon
        className={`mr-3 h-6 w-6 transition-colors ${
          data?.liked && userId ? 'fill-red-500 text-red-500' : 'text-black-400'
        }`}
      />
    </button>
  );
};

export default LikeButton;
