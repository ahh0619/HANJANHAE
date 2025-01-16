'use client';

import LikeButton from '@/components/common/LikeButton';
import { useAuthStore } from '@/store/authStore';

import ShareButton from './ShareButton';

type DrinkDescriptionProps = {
  name: string;
  imageUrl: string;
  description: string | null;
  drinkId: string;
};

const DrinkDescription = ({
  name,
  imageUrl,
  description,
  drinkId,
}: DrinkDescriptionProps) => {
  const { user } = useAuthStore();
  return (
    <section className="p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-grayscale-900 text-title-lm">{name}</h2>
        <div className="flex">
          <LikeButton userId={user?.id} drinkId={drinkId} />
          <ShareButton title={name} text={description!} imageUrl={imageUrl} />
        </div>
      </div>
      <p className="text-grayscale-900 text-body-mm mt-2">
        {description || '설명 없음'}
      </p>
    </section>
  );
};

export default DrinkDescription;
