'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { toggleLike } from '@/app/actions/like';
import { DrinkType } from '@/types/drink';

import { useMultipleLikeStatus } from './useMultipleLikeStatus';

export function useMultipleLike(userId: string, drinkIds: string[]) {
  const queryClient = useQueryClient();

  const { data: bulkMap, isLoading: isQueryLoading } = useMultipleLikeStatus(
    userId,
    drinkIds,
  );

  const [likeMap, setLikeMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (bulkMap) {
      setLikeMap(bulkMap);
    }
  }, [bulkMap]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const mutation = useMutation({
    mutationFn: async (drinkId: string) => {
      if (!userId) {
        setIsModalOpen(true);
        throw new Error('로그인이 필요합니다.');
      }
      return toggleLike({ userId, drinkId });
    },
    onMutate: async (drinkId) => {
      setLikeMap((prev) => ({
        ...prev,
        [drinkId]: !prev[drinkId],
      }));

      await queryClient.cancelQueries({ queryKey: ['likes', userId] });

      const prevData = queryClient.getQueryData<DrinkType>(['likes', userId]);
      return { drinkId, prevData };
    },
    onError: (err, drinkId, context) => {
      if (context?.prevData) {
        setLikeMap((prev) => ({
          ...prev,
          [context.drinkId]: !prev[context.drinkId],
        }));

        queryClient.setQueryData(['likes', userId], context.prevData);
      }
      setToastMessage('오류가 발생했습니다.');
    },
    onSuccess: (res, drinkId) => {
      if (!res.liked) {
        setToastMessage('좋아요가 해제되었어요');
        removeItemFromLikesCache(drinkId);
      }
    },
    onSettled: () => {
      // 다시 fetch
      queryClient.invalidateQueries({
        queryKey: ['multipleLikeStatus', userId, drinkIds],
      });
      queryClient.invalidateQueries({ queryKey: ['likes', userId] });
    },
  });

  // “무한 스크롤 likes”에서 해당 drinkId 제거
  function removeItemFromLikesCache(drinkId: string) {
    queryClient.setQueryData<any>(['likes', userId], (oldData) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        pages: oldData.pages.map((page: any) => ({
          ...page,
          data: page.data.filter((item: any) => item.drink_id !== drinkId),
        })),
      };
    });
  }

  function toggleItem(drinkId: string) {
    mutation.mutate(drinkId);
  }

  useEffect(() => {
    if (userId && isModalOpen) {
      setIsModalOpen(false);
    }
  }, [userId, isModalOpen]);

  function closeModal() {
    setIsModalOpen(false);
  }
  function closeToast() {
    setToastMessage('');
  }

  const isLoading = isQueryLoading || mutation.isPending;

  return {
    isLoading,
    likeMap,
    toggleItem,
    isModalOpen,
    closeModal,
    toastMessage,
    closeToast,
  };
}
