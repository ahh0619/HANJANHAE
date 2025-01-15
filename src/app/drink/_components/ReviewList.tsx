'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { FiMessageCircle } from 'react-icons/fi';

import { ReviewListProps } from '@/types/review';
import {
  adjustTextarea,
  setCursorAndScrollToEnd,
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
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const handleEditClick = (id: string, currentComment: string) => {
    setEditingId(id);
    setEditComment(currentComment);
  };

  const handleSaveClick = (id: string) => {
    if (editComment.length > 100) return;
    onUpdate(id, editComment);
    setEditingId(null);
    setEditComment('');
  };

  useEffect(() => {
    if (editingId && textareaRef.current) {
      adjustTextarea(textareaRef.current);
      setCursorAndScrollToEnd(textareaRef.current);
    }
  }, [editingId]);

  // 마지막 리뷰 요소를 감지
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
            errorMessage={
              editComment.length > 100
                ? '100글자까지만 작성할 수 있습니다.'
                : null
            }
            textareaRef={textareaRef}
            onEditCommentChange={setEditComment}
            onSave={() => handleSaveClick(review.id)}
            onCancel={() => setEditingId(null)}
          />
          <ReviewActionButtons
            canEdit={review.user_id === user?.id && editingId !== review.id}
            onEdit={() => handleEditClick(review.id, review.comment)}
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
