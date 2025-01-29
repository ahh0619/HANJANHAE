import { useQuery } from '@tanstack/react-query';

import { fetchAllLikeStatus } from '@/app/actions/like';

export function useLikeStatusAll(userId: string) {
  return useQuery({
    queryKey: ['likeStatusAll', userId],
    queryFn: () => fetchAllLikeStatus(userId),
    enabled: !!userId,
  });
}
