'use client';

import LikeButton from '@/components/common/LikeButton';
import ShareButton from '@/components/common/ShareButton';
import { useAuthStore } from '@/store/authStore';
import { DrinkDescriptionProps } from '@/types/drink';

const DrinkDescription = ({
  name,
  imageUrl,
  description,
  drinkId,
}: DrinkDescriptionProps) => {
  const { user } = useAuthStore();
  return (
    <section className="mt-3 px-5">
      <div className="flex items-center justify-between">
        <h2 className="text-title-xl text-grayscale-900">{name}</h2>
        <div className="flex">
          <LikeButton userId={user?.id} drinkId={drinkId} />
          <ShareButton title={name} text={description!} imageUrl={imageUrl} />
        </div>
      </div>
      <p className="mt-2 text-body-sm text-grayscale-900">
        {description || '설명 없음'}
      </p>
    </section>
  );
};

export default DrinkDescription;
