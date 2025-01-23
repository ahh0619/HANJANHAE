'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { toggleLike } from '@/app/actions/like';
import { useModal } from '@/app/providers/ModalProvider';
import { useToast } from '@/app/providers/ToastProvider';
import { useLikeStatus } from '@/hooks/like/useLikeStatus';

export const useSingleLike = (drinkId: string, userId?: string) => {
  const queryClient = useQueryClient();
  const { data, isLoading: isQueryLoading } = useLikeStatus(
    drinkId,
    userId || '',
  );
  const router = useRouter();

  const { openModal, closeModal } = useModal();
  const { openToast } = useToast();

  const mutation = useMutation({
    mutationFn: async () => {
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
    onMutate: async () => {
      if (!userId) return;
      await queryClient.cancelQueries({
        queryKey: ['likeStatus', drinkId, userId],
      });
      const prevData = queryClient.getQueryData<{ liked: boolean }>([
        'likeStatus',
        drinkId,
        userId,
      ]);
      queryClient.setQueryData(['likeStatus', drinkId, userId], {
        liked: !prevData?.liked,
      });
      return { prevData };
    },
    onError: (err, variables, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(
          ['likeStatus', drinkId, userId],
          context.prevData,
        );
      }
    },
    onSuccess: (res) => {
      if (!res.liked) {
        openToast('좋아요가 해제되었어요');
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
  });

  function handleToggleLike() {
    mutation.mutate();
  }

  const isLiked =
    queryClient.getQueryData<{ liked: boolean }>([
      'likeStatus',
      drinkId,
      userId,
    ])?.liked ??
    data?.liked ??
    false;

  const isLoading = isQueryLoading || mutation.isPending;

  return {
    isLoading,
    isLiked,
    handleToggleLike,
  };
};
