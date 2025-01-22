'use client';

import { useCallback, useRef } from 'react';

import OptimizedImage from '@/components/common/OptimizedImage';
import Toast from '@/components/common/Toast';
import { useReviewEditing } from '@/hooks/review/useReviewEditing';
import { useToast } from '@/hooks/review/useToast';

import ReviewContent from './ReviewContent';
import ReviewSkeleton from './ReviewSkeleton';

const ReviewList = ({
  reviews,
  user,
  onUpdate,
  onDelete,
  fetchNextPage,
  hasNextPage,
  isLoading,
}) => {
  const {
    editingId,
    editComment,
    editRating,
    isEditValid,
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
    triggerToast('리뷰가 삭제되었어요');
  };

  const lastReviewRef = useCallback(
    (node) => {
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
    <div className="mt-7 space-y-6">
      {/* 리뷰 리스트 */}
      {reviews.map((review, index) => {
        const canEdit = review.user_id === user?.id;
        const isEditing = editingId === review.id;

        return (
          <div
            key={review.id}
            className="flex flex-col rounded-lg bg-etc-white"
            ref={index === reviews.length - 1 ? lastReviewRef : null}
          >
            {/* 리뷰 내용 */}
            <ReviewContent
              review={review}
              nickname={review.nickname}
              profile_image={review.profile_image}
              editing={isEditing}
              editComment={editComment}
              textareaRef={textareaRef}
              onEditCommentChange={handleCommentChange}
              onSave={() => handleReviewSaveClick(review.id)}
              onCancel={resetEditingState}
              updatedRating={isEditing ? editRating : review.rating}
              onRatingChange={handleRatingChange}
              canEdit={canEdit}
              onEdit={() =>
                handleReviewEditClick(review.id, review.content, review.rating)
              }
              onDelete={() => handleReviewDelete(review.id)}
              isEditValid={isEditValid}
            />
          </div>
        );
      })}

      {/* 리뷰 없음 */}
      {reviews.length === 0 && (
        <div className="mt-20 flex flex-col items-center justify-center space-y-2 rounded-lg">
          <OptimizedImage
            src="/assets/icons/no-reviews.svg"
            alt="등록된 리뷰가 없습니다."
            width={131}
            height={206}
          />
          <p className="title-mb !mt-9 text-grayscale-500">
            등록된 리뷰가 없습니다.
          </p>
        </div>
      )}

      {/* 로딩 스켈레톤 */}
      {isLoading && <ReviewSkeleton />}

      {/* 삭제 Toast */}
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
