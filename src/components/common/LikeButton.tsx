'use client';

import { HeartIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useLikeStatus } from '@/hooks/like/useLikeStatus';
import { useToggleLike } from '@/hooks/like/useToggleLike';

import Modal from './Modal';
import Toast from './Toast';

type LikeButtonProps = {
  drinkId: string;
  userId: string | null;
};

const LikeButton = ({ drinkId, userId }: LikeButtonProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data } = useLikeStatus(drinkId, userId);
  const { mutate, toastMessage, clearToast } = useToggleLike({
    drinkId,
    userId: userId || '',
  });

  const handleLikeButtonClick = () => {
    if (!userId) {
      setIsModalOpen(true);
      return;
    }

    mutate();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleLikeButtonClick}
        className={`flex items-center justify-center rounded-full p-2 transition-colors`}
        aria-label={data?.liked ? '좋아요 취소' : '좋아요'}
      >
        <HeartIcon
          className={`transition-colors ${
            data?.liked && userId ? 'fill-primary text-primary' : 'text-black'
          } h-5 w-5 sm:h-6 sm:w-6`}
        />
      </button>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="좋아요를 하시겠어요?"
        content={`좋아요 기능을 사용하려면 \n 로그인을 해야 해요.`}
        secondaryAction={{
          text: '돌아가기',
          onClick: closeModal,
        }}
        primaryAction={{
          text: '로그인하기',
          onClick: () => {
            router.push('/signin');
            closeModal();
          },
        }}
      />

      {/* Toast */}
      {toastMessage && <Toast message={toastMessage} onClose={clearToast} />}
    </>
  );
};

export default LikeButton;
