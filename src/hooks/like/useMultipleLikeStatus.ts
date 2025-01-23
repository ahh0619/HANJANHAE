import { useQuery } from '@tanstack/react-query';

import { fetchMultipleLikeStatus } from '@/app/actions/like';

export const useMultipleLikeStatus = (userId: string, drinkIds: string[]) => {
  return useQuery({
    queryKey: ['multipleLikeStatus', userId, drinkIds],
    queryFn: () => fetchMultipleLikeStatus(userId, drinkIds),
    enabled: !!userId && drinkIds.length > 0,
  });
};
