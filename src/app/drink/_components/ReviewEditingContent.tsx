'use client';

import { useEffect } from 'react';

import { ReviewEditingContentProps } from '@/types/review';
import {
  adjustTextarea,
  setCursorAndScrollToEnd,
  validateComment,
} from '@/utils/review/textarea';

const ReviewEditingContent = ({
  editComment,
  errorMessage,
  textareaRef,
  onEditCommentChange,
  onSave,
  onCancel,
}: ReviewEditingContentProps) => {
  useEffect(() => {
    if (textareaRef?.current) {
      setCursorAndScrollToEnd(textareaRef.current);
    }
  }, [textareaRef]);

  const handleCommentChange = (value: string) => {
    onEditCommentChange(value);
    if (textareaRef.current) {
      validateComment(textareaRef.current, value);
      adjustTextarea(textareaRef.current);
    }
  };

  return (
    <div>
      <textarea
        ref={textareaRef}
        value={editComment}
        onChange={(e) => handleCommentChange(e.target.value)}
        className="w-full resize-none rounded-lg border p-2 text-sm focus:ring-2 focus:ring-gray-400"
        style={{ maxHeight: '120px', overflowY: 'auto' }}
        maxLength={101}
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
