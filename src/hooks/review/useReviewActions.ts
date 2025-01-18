import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  InfiniteQueryData,
  Review,
  ReviewSubmitData,
  User,
} from '@/types/review';
import {
  deleteReview,
  fetchReviews,
  submitReview,
  updateReview,
} from '@/utils/review/action';

export const useReviewActions = (drinkId: string, user: User | null) => {
  const queryClient = useQueryClient();

  // 리뷰 데이터 가져오기
  const { data, fetchNextPage, hasNextPage, isPending, isError, error } =
    useInfiniteQuery({
      queryKey: ['reviews', drinkId],
      queryFn: ({ pageParam = 1 }: { pageParam: number }) =>
        fetchReviews(drinkId, pageParam, 5),
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < 5) return undefined;
        return allPages.length + 1;
      },
      initialPageParam: 1,
      enabled: !!drinkId,
    });

  // 모든 리뷰 합치기
  const reviews = data?.pages.flat() || [];

  const submitMutation = useMutation({
    mutationFn: submitReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', drinkId] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', drinkId] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', drinkId] });
    },
  });

  const handleReviewSubmit = async (data: ReviewSubmitData) => {
    try {
      if (!user?.id) throw new Error('로그인이 필요합니다.');
      if (!drinkId || !data.rating || !data.comment)
        throw new Error('필수 입력값이 없습니다.');

      await submitMutation.mutateAsync({
        drinkId,
        userId: user.id,
        content: data.comment,
        rating: data.rating,
      });
    } catch (err) {
      console.error('리뷰 등록 실패:', err);
    }
  };

  const handleReviewUpdate = async (
    id: string,
    updatedComment: string,
    updatedRating: number,
  ) => {
    let previousData: InfiniteQueryData<Review[]> | undefined;

    try {
      if (!user?.id) throw new Error('로그인이 필요합니다.');

      // React Query 캐시 데이터 가져오기
      previousData = queryClient.getQueryData(['reviews', drinkId]);

      // 서버에 업데이트 요청 및 updated_at 값 받아오기
      const updatedReview = await updateMutation.mutateAsync({
        id,
        updatedComment,
        updatedRating,
      });

      // React Query 캐시 업데이트
      queryClient.setQueryData(['reviews', drinkId], (oldData: any) => {
        if (!oldData || !Array.isArray(oldData.pages)) {
          return oldData;
        }

        return {
          ...oldData,
          pages: oldData.pages.map((page: Review[]) =>
            page.map((review) =>
              review.id === id
                ? {
                    ...review,
                    comment: updatedComment,
                    rating: updatedRating,
                    updated_at: updatedReview.updated_at,
                  }
                : review,
            ),
          ),
        };
      });
    } catch (err) {
      console.error('리뷰 수정 실패:', err);

      // 이전 데이터를 복원하여 에러 방지
      if (previousData) {
        queryClient.setQueryData(['reviews', drinkId], previousData);
      }
    }
  };

  const handleReviewDelete = async (id: string) => {
    try {
      if (!user?.id) throw new Error('로그인이 필요합니다.');

      await deleteMutation.mutateAsync(id);
    } catch (err) {
      console.error('리뷰 삭제 실패:', err);
    }
  };

  return {
    reviews,
    fetchNextPage,
    hasNextPage,
    isPending,
    isError,
    error,
    handleReviewSubmit,
    handleReviewUpdate,
    handleReviewDelete,
  };
};
