'use client';

import { useRouter } from 'next/navigation';

import LikeButton from '@/components/common/LikeButton';
import Modal from '@/components/common/Modal';
import ShareButton from '@/components/common/ShareButton';
import Toast from '@/components/common/Toast';
import { useSingleLike } from '@/hooks/like/useSingleLike';
import { useAuthStore } from '@/store/authStore';
import { DrinkDescriptionProps } from '@/types/drink';

export default function DrinkDescription({
  name,
  imageUrl,
  description,
  drinkId,
}: DrinkDescriptionProps) {
  const { user } = useAuthStore();
  const userId = user?.id || '';
  const router = useRouter();

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
    <section className="mt-3 px-5">
      <div className="flex items-center justify-between">
        <h2 className="text-title-xl text-grayscale-900">{name}</h2>
        <div className="flex">
          <LikeButton isLiked={isLiked} onClick={handleToggleLike} />
          <ShareButton
            title={name}
            text={description ?? ''}
            imageUrl={imageUrl}
          />
        </div>
      </div>

      <p className="mt-2 text-body-sm text-grayscale-900">
        {description || '설명 없음'}
      </p>

      {/* 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="좋아요를 하시겠어요?"
        content={`좋아요 기능을 사용하려면 \n 로그인을 해야 해요.`}
        secondaryAction={{ text: '돌아가기', onClick: closeModal }}
        primaryAction={{
          text: '로그인하기',
          onClick: () => {
            router.push('/signin');
            closeModal();
          },
        }}
      />

      {/* 토스트 */}
      {toastMessage && <Toast message={toastMessage} onClose={closeToast} />}
    </section>
  );
}
