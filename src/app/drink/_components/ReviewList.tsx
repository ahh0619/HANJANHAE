'use client';

import { useCallback, useRef } from 'react';
import { FiMessageCircle } from 'react-icons/fi';

import Toast from '@/components/common/Toast';
import { useReviewEditing } from '@/hooks/review/useReviewEditing';
import { useToast } from '@/hooks/review/useToast';
import { ReviewListProps } from '@/types/review';

import ReviewActionButtons from './ReviewActionButtons';
import ReviewContent from './ReviewContent';
import ReviewInfo from './ReviewInfo';
import ReviewSkeleton from './ReviewSkeleton';

const ReviewList = ({
  reviews,
  user,
  onUpdate,
  onDelete,
  fetchNextPage,
  hasNextPage,
  isLoading,
}: ReviewListProps & {
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isLoading: boolean;
}) => {
  const {
    editingId,
    editComment,
    editRating,
    errorMessage,
    textareaRef,
    handleReviewEditClick,
    handleReviewSaveClick,
    handleCommentChange,
    handleRatingChange,
    resetEditingState,
  } = useReviewEditing(onUpdate);

  const { showToast, toastMessage, triggerToast } = useToast(3000);

  const observer = useRef<IntersectionObserver | null>(null);

  const handleReviewDelete = (id: string) => {
    onDelete(id);
    triggerToast('리뷰가 삭제되었습니다.');
  };

  const lastReviewRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage, fetchNextPage],
  );

  return (
    <div className="mt-6 space-y-6">
      {reviews.map((review, index) => (
        <div
          key={review.id}
          className="rounded-lg border p-4 shadow-sm"
          ref={index === reviews.length - 1 ? lastReviewRef : null}
        >
          <ReviewInfo
            nickname={review.nickname}
            createdAt={review.created_at}
            rating={review.rating}
            profile_image={review.profile_image}
          />
          <ReviewContent
            editing={editingId === review.id}
            comment={review.comment}
            editComment={editComment}
            errorMessage={errorMessage}
            textareaRef={textareaRef}
            onEditCommentChange={handleCommentChange}
            onSave={() => handleReviewSaveClick(review.id)}
            onCancel={resetEditingState}
            updatedRating={editRating}
            onRatingChange={handleRatingChange}
          />
          <ReviewActionButtons
            canEdit={review.user_id === user?.id && editingId !== review.id}
            onEdit={() =>
              handleReviewEditClick(review.id, review.comment, review.rating)
            }
            onDelete={() => handleReviewDelete(review.id)}
          />
        </div>
      ))}
      {reviews.length === 0 && (
        <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border p-4 py-10 text-center shadow-sm">
          <FiMessageCircle className="h-12 w-12 text-gray-400" />
          <p className="text-sm text-gray-500">등록된 리뷰가 없습니다.</p>
        </div>
      )}
      {isLoading ? <ReviewSkeleton /> : null}
      {showToast && (
        <Toast
          message={toastMessage}
          duration={3000}
          onClose={() => triggerToast('')}
        />
      )}
    </div>
  );
};

export default ReviewList;
