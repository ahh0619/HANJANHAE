import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  deleteReview,
  fetchReviews,
  submitReview,
  updateReview,
} from '@/utils/review/action';

export type Review = {
  id: string;
  user_id: string | null;
  nickname: string | null;
  comment: string;
  rating: number;
  created_at: string | null;
  profile_image: string | null;
};

export type ReviewSubmitData = {
  rating: number;
  comment: string;
};

export type User = {
  id: string;
  nickname: string;
  profile_image: string | null;
};

export const useReviewActions = (drinkId: string, user: User | null) => {
  const queryClient = useQueryClient();

  // 리뷰 데이터 가져오기
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteQuery<Review[]>({
    queryKey: ['reviews', drinkId],
    queryFn: ({ pageParam = 1 }: { pageParam: number }) =>
      fetchReviews(drinkId, pageParam, 10),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < 10 ? undefined : allPages.length + 1,
    enabled: !!drinkId,
  });

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

      console.log('리뷰가 성공적으로 등록되었습니다.');
    } catch (err) {
      console.error('리뷰 등록 실패:', err);
    }
  };

  const handleReviewUpdate = async (id: string, updatedComment: string) => {
    let previousReviews: Review[] | undefined;

    try {
      if (!user?.id) throw new Error('로그인이 필요합니다.');

      previousReviews = queryClient.getQueryData<Review[]>([
        'reviews',
        drinkId,
      ]);

      queryClient.setQueryData<Review[]>(['reviews', drinkId], (oldReviews) =>
        oldReviews?.map((review) =>
          review.id === id ? { ...review, comment: updatedComment } : review,
        ),
      );

      await updateMutation.mutateAsync({ id, updatedComment });

      console.log('리뷰가 성공적으로 수정되었습니다.');
    } catch (err) {
      console.error('리뷰 수정 실패:', err);

      if (previousReviews) {
        queryClient.setQueryData(['reviews', drinkId], previousReviews);
      }
    }
  };

  const handleReviewDelete = async (id: string) => {
    try {
      if (!user?.id) throw new Error('로그인이 필요합니다.');

      await deleteMutation.mutateAsync(id);
      console.log('리뷰가 성공적으로 삭제되었습니다.');
    } catch (err) {
      console.error('리뷰 삭제 실패:', err);
    }
  };

  return {
    reviews,
    isPending,
    isError,
    error,
    handleReviewSubmit,
    handleReviewUpdate,
    handleReviewDelete,
  };
};
