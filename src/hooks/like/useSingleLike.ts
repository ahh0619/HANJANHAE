'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { toggleLike } from '@/app/actions/like';
import { useLikeStatus } from '@/hooks/like/useLikeStatus';

export function useSingleLike(drinkId: string, userId?: string) {
  const queryClient = useQueryClient();
  const { data, isLoading: isQueryLoading } = useLikeStatus(
    drinkId,
    userId || '',
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const mutation = useMutation({
    mutationFn: async () => {
      if (!userId) {
        setIsModalOpen(true);
        throw new Error('로그인이 필요합니다.');
      }

      return toggleLike({ userId, drinkId });
    },
    onMutate: async () => {
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
      setToastMessage('오류가 발생했습니다.');
    },
    onSuccess: (res) => {
      if (!res.liked) {
        setToastMessage('좋아요가 해제되었어요');
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['likeStatus', drinkId, userId],
      });
      queryClient.invalidateQueries({ queryKey: ['likes', userId] });
    },
  });

  function handleToggleLike() {
    mutation.mutate();
  }

  function closeModal() {
    setIsModalOpen(false);
  }
  function closeToast() {
    setToastMessage('');
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
    isModalOpen,
    closeModal,
    toastMessage,
    closeToast,
  };
}
