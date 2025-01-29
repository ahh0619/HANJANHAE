'use client';

import { useLikeStatusAll } from './useLikeStatusAll';
import { useToggleLike } from './useToggleLike';

type UseMultipleDrinkLikeReturn = {
  isLoading: boolean;
  likeMap: Record<string, boolean>;
  handleToggleLike: (drinkId: string) => void;
};

type UseMultipleDrinkLikeProps = {
  drinkIds: string[];
  userId: string;
};

export const useMultipleDrinkLike = ({
  drinkIds,
  userId,
}: UseMultipleDrinkLikeProps): UseMultipleDrinkLikeReturn => {
  const { data: fullMap = {}, isLoading: mapLoading } =
    useLikeStatusAll(userId);

  const { toggle, isLoading: toggleLoading } = useToggleLike(userId);

  const partialMap: Record<string, boolean> = {};
  drinkIds.forEach((id) => {
    partialMap[id] = !!fullMap[id];
  });

  const handleToggleLike = (drinkId: string) => {
    toggle(drinkId);
  };

  return {
    isLoading: mapLoading || toggleLoading,
    likeMap: partialMap,
    handleToggleLike,
  };
};
