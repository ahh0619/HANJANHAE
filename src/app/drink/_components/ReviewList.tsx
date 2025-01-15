'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { FiMessageCircle } from 'react-icons/fi';

import { ReviewListProps } from '@/types/review';
import {
  adjustTextarea,
  setCursorAndScrollToEnd,
  validateComment,
} from '@/utils/review/textarea';

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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editComment, setEditComment] = useState<string>('');
  const [editRating, setEditRating] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const handleReviewEditClick = (
    id: string,
    currentComment: string,
    currentRating: number,
  ) => {
    setEditingId(id);
    setEditComment(currentComment);
    setEditRating(currentRating);
    setErrorMessage(null);
  };

  const handleReviewSaveClick = (id: string) => {
    const error = validateComment(editComment, editRating);
    if (error) {
      setErrorMessage(error);
      return;
    }

    onUpdate(id, editComment, editRating);
    resetEditingState();
  };

  const handleCommentChange = (value: string) => {
    setEditComment(value);
    const error = validateComment(value, editRating);
    setErrorMessage(error);
  };

  const handleRatingChange = (rating: number) => {
    setEditRating(rating);
    const error = validateComment(editComment, rating);
    setErrorMessage(error);
  };

  const resetEditingState = () => {
    setEditingId(null);
    setEditComment('');
    setEditRating(0);
    setErrorMessage(null);
  };

  useEffect(() => {
    if (editingId && textareaRef.current) {
      adjustTextarea(textareaRef.current);
      setCursorAndScrollToEnd(textareaRef.current);
    }
  }, [editingId]);

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
            onDelete={() => onDelete(review.id)}
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
    </div>
  );
};

export default ReviewList;
