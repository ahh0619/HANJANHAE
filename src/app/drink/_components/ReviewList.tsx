import Image from 'next/image';
import { useCallback, useRef } from 'react';

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
    <div className="mt-6 space-y-6">
      {/* 리뷰 리스트 */}
      {reviews.map((review, index) => {
        const canEdit = review.user_id === user?.id;
        const isEditing = editingId === review.id;

        return (
          <div
            key={review.id}
            className="flex flex-col rounded-lg bg-white"
            ref={index === reviews.length - 1 ? lastReviewRef : null}
          >
            {/* 리뷰 내용 */}
            <ReviewContent
              editing={isEditing}
              comment={review.comment}
              editComment={editComment}
              errorMessage={errorMessage}
              textareaRef={textareaRef}
              onEditCommentChange={handleCommentChange}
              onSave={() => handleReviewSaveClick(review.id)}
              onCancel={resetEditingState}
              updatedRating={isEditing ? editRating : review.rating}
              onRatingChange={handleRatingChange}
              nickname={review.nickname}
              createdAt={review.created_at}
              profileImage={review.profile_image}
              canEdit={canEdit}
              onEdit={() =>
                handleReviewEditClick(review.id, review.comment, review.rating)
              }
              onDelete={() => handleReviewDelete(review.id)}
            />
          </div>
        );
      })}

      {/* 리뷰 없음 */}
      {reviews.length === 0 && (
        <div className="mt-16 flex flex-col items-center justify-center space-y-2 rounded-lg">
          <Image
            src="/assets/icons/no-reviews.svg"
            alt="등록된 리뷰가 없습니다."
            width={168}
            height={208}
          />
          <p className="!mt-8 text-xl font-medium text-gray-500">
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
