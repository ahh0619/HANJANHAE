import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

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
};

export type ReviewSubmitData = {
  rating: number;
  comment: string;
};

export type User = {
  id: string;
  nickname: string;
};

export const useReviewActions = (drinkId: string, user: User | null) => {
  const queryClient = useQueryClient();

  // 리뷰 데이터 가져오기
  const {
    data: reviews = [],
    isPending,
    isError,
    error,
  } = useQuery<Review[]>({
    queryKey: ['reviews', drinkId],
    queryFn: () => fetchReviews(drinkId),
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
        nickname: user.nickname,
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
    let deletedReview: Review | null = null;

    try {
      if (!user?.id) throw new Error('로그인이 필요합니다.');

      // 삭제 전 데이터 저장
      deletedReview = reviews.find((review) => review.id === id) || null;

      // 클라이언트에서 미리 삭제 처리
      queryClient.setQueryData<Review[]>(['reviews', drinkId], (oldReviews) =>
        oldReviews?.filter((review) => review.id !== id),
      );

      // 서버에서 리뷰 삭제
      await deleteMutation.mutateAsync(id);

      // 알림 메시지 표시
      toast(
        <div className="flex items-center justify-between rounded-lg bg-gray-800 px-4 py-2 text-white shadow-md">
          <p className="text-sm">리뷰가 삭제되었습니다.</p>
          <button
            onClick={async () => {
              if (deletedReview) {
                await handleUndoDelete(deletedReview);
              }
            }}
            className="ml-4 text-sm text-blue-400 underline transition-transform hover:scale-105 hover:text-red-500 hover:no-underline"
          >
            실행 취소
          </button>
        </div>,
        {
          autoClose: 5000,
          onClose: () => {
            if (deletedReview) {
              deletedReview = null; // 실행 취소 기회 제거
            }
          },
        },
      );

      console.log('리뷰가 성공적으로 삭제되었습니다.');
    } catch (err) {
      console.error('리뷰 삭제 실패:', err);

      // 삭제 실패 시 복구
      if (deletedReview) {
        queryClient.setQueryData<Review[]>(
          ['reviews', drinkId],
          (oldReviews) => {
            const safeReviews = oldReviews || [];
            return [deletedReview, ...safeReviews];
          },
        );
      }
    }
  };

  const handleUndoDelete = async (deletedReview: Review | null) => {
    if (!deletedReview) return;

    try {
      // 삭제된 리뷰 복구
      await submitMutation.mutateAsync({
        drinkId,
        userId: deletedReview.user_id!,
        content: deletedReview.comment,
        rating: deletedReview.rating,
        nickname: deletedReview.nickname!,
      });

      queryClient.invalidateQueries({ queryKey: ['reviews', drinkId] });

      console.log('리뷰가 성공적으로 복구되었습니다.');
    } catch (err) {
      console.error('리뷰 복구 실패:', err);
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
