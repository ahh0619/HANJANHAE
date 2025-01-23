'use client';

import { useRouter } from 'next/navigation';

import { useReviewActions } from '@/hooks/review/useReviewActions';
import { useAuthStore } from '@/store/authStore';

import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';
import ReviewLoginPrompt from './ReviewLoginPrompt';
import ReviewSkeleton from './ReviewSkeleton';

export type ReviewSectionProps = {
  drinkId: string;
};

const ReviewSection = ({ drinkId }: ReviewSectionProps) => {
  const { user } = useAuthStore();
  const router = useRouter();

  const {
    reviews,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    handleReviewSubmit,
    handleReviewUpdate,
    handleReviewDelete,
  } = useReviewActions(drinkId, user);

  const handleLoginClick = () => {
    router.push('/signin');
  };

  return (
    <section className="mb-[159px] px-5">
      <h3 className="!mt-8 text-title-lb text-grayscale-900">리뷰</h3>
      {user ? (
        <ReviewForm onSubmit={handleReviewSubmit} />
      ) : (
        <ReviewLoginPrompt onLoginClick={handleLoginClick} />
      )}
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
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isLoading={isPending}
        />
      )}
    </section>
  );
};

export default ReviewSection;
