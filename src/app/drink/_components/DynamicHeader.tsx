'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import BackButton from '@/components/common/BackButton';
import LikeButton from '@/components/common/LikeButton';
import Modal from '@/components/common/Modal';
import ShareButton from '@/components/common/ShareButton';
import Toast from '@/components/common/Toast';
import { useSingleLike } from '@/hooks/like/useSingleLike';
import { useAuthStore } from '@/store/authStore';

type DynamicHeaderProps = {
  name: string;
  image: string;
  description: string;
  drinkId: string;
};

export default function DynamicHeader({
  name,
  image,
  description,
  drinkId,
}: DynamicHeaderProps) {
  const { user } = useAuthStore();
  const userId = user?.id || '';
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const {
    isLoading,
    isLiked,
    handleToggleLike,
    isModalOpen,
    closeModal,
    toastMessage,
    closeToast,
  } = useSingleLike(drinkId, userId);

  return (
    <div
      className={`fixed left-1/2 top-0 z-50 w-full max-w-[600px] -translate-x-1/2 transform bg-etc-white text-grayscale-900 shadow-md transition-all ${
        scrolled ? '' : 'hidden'
      }`}
    >
      <div className="flex w-full items-center justify-between p-4">
        {/* 뒤로가기 버튼과 주류 이름 */}
        <div className="flex flex-1 items-center space-x-2">
          <BackButton />
          <p className="flex-1 truncate break-words text-title-xl text-grayscale-900">
            {name}
          </p>
        </div>
        {/* 좋아요 & 공유 버튼 */}
        <div className="flex space-x-2">
          <LikeButton isLiked={isLiked} onClick={handleToggleLike} />
          <ShareButton title={name} text={description} imageUrl={image} />
        </div>
      </div>

      {/* (A) 모달 */}
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

      {/* (B) 토스트 */}
      {toastMessage && <Toast message={toastMessage} onClose={closeToast} />}
    </div>
  );
}
