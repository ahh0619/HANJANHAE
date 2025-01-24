import { useQuery } from '@tanstack/react-query';

import { checkLikeStatus } from '@/app/actions/like';

export const useSingleLikeStatus = (drinkId: string, userId: string) => {
  const fetchLikeStatus = async () => {
    if (!drinkId || !userId) {
      throw new Error('Missing parameters');
    }
    return checkLikeStatus({ drinkId, userId });
  };

  return useQuery({
    queryKey: ['likeStatus', drinkId, userId],
    queryFn: fetchLikeStatus,
    enabled: !!drinkId && !!userId,
  });
};
