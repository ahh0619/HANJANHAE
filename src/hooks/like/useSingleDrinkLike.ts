'use client';

import { useLikeStatusAll } from './useLikeStatusAll';
import { useToggleLike } from './useToggleLike';

type UseSingleDrinkLikeReturn = {
  isLiked: boolean;
  isLoading: boolean;
  handleToggleLike: () => void;
};

type UseSingleDrinkLikeProps = {
  drinkId: string;
  userId: string;
};

export const useSingleDrinkLike = ({
  drinkId,
  userId,
}: UseSingleDrinkLikeProps): UseSingleDrinkLikeReturn => {
  const { data: fullMap = {}, isLoading: mapLoading } =
    useLikeStatusAll(userId);

  const { toggle, isLoading: toggleLoading } = useToggleLike(userId);

  const isLiked = !!fullMap[drinkId];

  const handleToggleLike = () => toggle(drinkId);
  return {
    isLiked,
    isLoading: mapLoading || toggleLoading,
    handleToggleLike,
  };
};
