'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { toggleLike } from '@/app/actions/like';
import { useModal } from '@/app/providers/ModalProvider';
import { useToast } from '@/app/providers/ToastProvider';

import { useMultipleLikeStatus } from './useMultipleLikeStatus';

export const useMultipleLike = (userId: string, drinkIds: string[]) => {
  const queryClient = useQueryClient();
  const router = useRouter();

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

  const { openModal, closeModal } = useModal();
  const { openToast } = useToast();

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
      if (!userId) return;
      setLikeMap((prev) => ({
        ...prev,
        [drinkId]: !prev[drinkId],
      }));
      await queryClient.cancelQueries({ queryKey: ['likes', userId] });
      const prevData = queryClient.getQueryData(['likes', userId]);
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
    },
    onSuccess: (res, drinkId) => {
      if (!res.liked) {
        openToast('좋아요가 해제되었어요');
        removeItemFromLikesCache(drinkId);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['multipleLikeStatus', userId, drinkIds],
      });
      queryClient.invalidateQueries({ queryKey: ['likes', userId] });
    },
  });

  function toggleItem(drinkId: string) {
    mutation.mutate(drinkId);
  }

  const isLoading = isQueryLoading || mutation.isPending;

  return {
    isLoading,
    likeMap,
    toggleItem,
  };
};
