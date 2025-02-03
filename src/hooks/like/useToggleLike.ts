import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { toggleLike } from '@/app/actions/like';
import { useModal } from '@/app/providers/ModalProvider';
import { useToast } from '@/app/providers/ToastProvider';

export const useToggleLike = (userId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const { openToast } = useToast();

  const mutation = useMutation({
    mutationFn: async (drinkId: string) => {
      if (!userId) {
        openModal({
          title: '좋아요를 하시겠어요?',
          content: `좋아요 기능을 사용하려면\n로그인을 해야 해요.`,
          primaryAction: {
            text: '로그인하기',
            onClick: () => {
              router.push('/signin');
              closeModal();
            },
          },
          secondaryAction: {
            text: '돌아가기',
            onClick: closeModal,
          },
        });
        throw new Error('로그인이 필요합니다.');
      }
      return toggleLike({ userId, drinkId });
    },

    onMutate: async (drinkId) => {
      await queryClient.cancelQueries({ queryKey: ['likeStatusAll', userId] });

      const prevLikeMap = queryClient.getQueryData<Record<string, boolean>>([
        'likeStatusAll',
        userId,
      ]);
      if (!prevLikeMap) return { prevLikeMap: {} };

      queryClient.setQueryData(['likeStatusAll', userId], {
        ...prevLikeMap,
        [drinkId]: !prevLikeMap[drinkId],
      });

      return { prevLikeMap };
    },

    onError: (error, drinkId, context) => {
      if (context?.prevLikeMap) {
        queryClient.setQueryData(
          ['likeStatusAll', userId],
          context.prevLikeMap,
        );
      }
    },

    onSuccess: (res, drinkId) => {
      if (res.liked) {
        openToast('좋아요에 추가되었어요');
      } else {
        openToast('좋아요가 해제되었어요');
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['likeStatusAll', userId] });
    },
  });

  const toggle = (drinkId: string) => {
    mutation.mutate(drinkId);
  };

  return {
    toggle,
    isLoading: mutation.isPending,
  };
};
