'use client';

import { useReviewActions } from '@/hooks/review/useReviewActions';
import { useAuthStore } from '@/store/authStore';

import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';
import ReviewSkeleton from './ReviewSkeleton';

export type ReviewSectionProps = {
  drinkId: string;
};

const ReviewSection = ({ drinkId }: ReviewSectionProps) => {
  const { user } = useAuthStore();
  const {
    reviews,
    isPending,
    isError,
    error,
    handleReviewSubmit,
    handleReviewUpdate,
    handleReviewDelete,
  } = useReviewActions(drinkId, user);

  return (
    <section className="p-4">
      <h3 className="text-lg font-bold">리뷰</h3>
      <ReviewForm onSubmit={handleReviewSubmit} />
      {isPending ? (
        <ReviewSkeleton />
      ) : isError ? (
        <p className="text-sm text-red-500">
          {error instanceof Error ? error.message : '오류 발생'}
        </p>
      ) : (
        <ReviewList
          reviews={reviews}
          user={user}
          onUpdate={handleReviewUpdate}
          onDelete={handleReviewDelete}
        />
      )}
    </section>
  );
};

export default ReviewSection;
