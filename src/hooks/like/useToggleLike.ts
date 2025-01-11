import { useMutation, useQueryClient } from '@tanstack/react-query';

type LikeStatus = { liked: boolean };

type UseToggleLikeParams = {
  drinkId: string;
  userId: string;
};

export const useToggleLike = ({ drinkId, userId }: UseToggleLikeParams) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    LikeStatus,
    unknown,
    void,
    { previousData?: LikeStatus }
  >({
    mutationFn: async () => {
      const response = await fetch('/api/togglelike', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, drinkId }),
      });

      if (!response.ok) {
        throw new Error('Failed to toggle like');
      }

      return response.json();
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['likeStatus', drinkId] });

      const previousData = queryClient.getQueryData<LikeStatus>([
        'likeStatus',
        drinkId,
      ]);

      queryClient.setQueryData(['likeStatus', drinkId], {
        liked: !(previousData?.liked ?? false),
      });

      return { previousData };
    },
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['likeStatus', drinkId], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['likeStatus', drinkId] });
    },
  });

  return mutation;
};
