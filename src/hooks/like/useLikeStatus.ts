import { useQuery } from '@tanstack/react-query';

export const useLikeStatus = (drinkId: string, userId: string) => {
  const fetchLikeStatus = async () => {
    const response = await fetch('/api/likestatus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ drinkId, userId }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch like status');
    }

    return response.json();
  };

  return useQuery({
    queryKey: ['likeStatus', drinkId, userId],
    queryFn: fetchLikeStatus,
    enabled: !!drinkId && !!userId,
  });
};
