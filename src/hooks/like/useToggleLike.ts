import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { toggleLike } from '@/utils/like/action';

type LikeStatus = { liked: boolean };

type UseToggleLikeParams = {
  drinkId: string;
  userId: string;
};

export const useToggleLike = ({ drinkId, userId }: UseToggleLikeParams) => {
  const queryClient = useQueryClient();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const mutation = useMutation<
    LikeStatus,
    unknown,
    void,
    { previousData?: LikeStatus }
  >({
    mutationFn: async () => {
      if (!drinkId || !userId) {
        throw new Error('Missing parameters');
      }
      return toggleLike({ userId, drinkId });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['likeStatus', drinkId, userId],
      });

      const previousData = queryClient.getQueryData<LikeStatus>([
        'likeStatus',
        drinkId,
        userId,
      ]);

      queryClient.setQueryData(['likeStatus', drinkId, userId], {
        liked: !(previousData?.liked ?? false),
      });

      return { previousData };
    },
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ['likeStatus', drinkId, userId],
          context.previousData,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['likeStatus', drinkId, userId],
      });
      queryClient.invalidateQueries({
        queryKey: ['likes', userId],
      });
    },
    onSuccess: (data) => {
      if (!data.liked) {
        setToastMessage('좋아요가 해제되었어요');
      }
    },
  });

  return { ...mutation, toastMessage, clearToast: () => setToastMessage(null) };
};
