'use client';

import LikeButton from '@/components/common/LikeButton';
import ShareButton from '@/components/common/ShareButton';
import { useSingleDrinkLike } from '@/hooks/like/useSingleDrinkLike';
import { useAuthStore } from '@/store/authStore';
import { DrinkDescriptionProps } from '@/types/drink';

const DrinkDescription = ({
  name,
  imageUrl,
  description,
  drinkId,
}: DrinkDescriptionProps) => {
  const { user } = useAuthStore();
  const userId = user?.id || '';

  const { isLiked, isLoading, handleToggleLike } = useSingleDrinkLike({
    drinkId,
    userId,
  });

  return (
    <section className="mt-3 px-5 xl:mt-5 xl:px-0">
      <div className="flex items-start justify-between">
        <h2 className="flex-1 break-words text-title-xl text-grayscale-900">
          {name}
        </h2>
        <div className="flex shrink-0 items-center">
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
    </section>
  );
};

export default DrinkDescription;
