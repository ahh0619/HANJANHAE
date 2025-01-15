'use client';

import { useEffect } from 'react';

import { ReviewEditingContentProps } from '@/types/review';
import {
  adjustTextarea,
  setCursorAndScrollToEnd,
} from '@/utils/review/textarea';

import ReviewStarRating from './ReviewStarRating';

const ReviewEditingContent = ({
  editComment,
  errorMessage,
  textareaRef,
  updatedRating,
  onEditCommentChange,
  onRatingChange,
  onSave,
  onCancel,
}: ReviewEditingContentProps & {
  updatedRating: number;
  onRatingChange: (rating: number) => void;
}) => {
  useEffect(() => {
    if (textareaRef?.current) {
      setCursorAndScrollToEnd(textareaRef.current);
    }
  }, [textareaRef]);

  const handleCommentChange = (value: string) => {
    onEditCommentChange(value);
    if (textareaRef.current) {
      adjustTextarea(textareaRef.current);
    }
  };

  return (
    <div className="relative z-10 rounded-lg bg-white p-4 shadow-md">
      <div className="mb-4">
        <ReviewStarRating rating={updatedRating} onClick={onRatingChange} />
      </div>
      <textarea
        ref={textareaRef}
        value={editComment}
        onChange={(e) => handleCommentChange(e.target.value)}
        className="w-full resize-none rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
        maxLength={101}
        placeholder="최소 2자, 최대 100자"
      ></textarea>
      {errorMessage && (
        <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
      )}
      <div className="mt-2 flex justify-end space-x-2">
        <button
          className="rounded-lg bg-gray-800 px-4 py-1 text-sm text-white hover:bg-gray-700"
          onClick={onSave}
        >
          저장
        </button>
        <button
          className="rounded-lg bg-gray-200 px-4 py-1 text-sm text-gray-800 hover:bg-gray-300"
          onClick={onCancel}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default ReviewEditingContent;
