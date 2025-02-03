'use client';

import { useEffect } from 'react';

import ReviewActionButtons from './ReviewActionButtons';
import ReviewStarRating from './ReviewStarRating';

const ReviewEditingContent = ({
  editComment,
  editRating,
  textareaRef,
  onEditCommentChange,
  onRatingChange,
  onSave,
  onCancel,
  isEditValid,
}) => {
  useEffect(() => {
    if (textareaRef?.current) {
      textareaRef.current.focus();
    }
  }, [textareaRef]);

  return (
    <div className="relative">
      {/* 별점 수정 (필수 항목 아니면 자유롭게) */}
      <ReviewStarRating rating={editRating} onClick={onRatingChange} />

      {/* 댓글 수정 영역 */}
      <textarea
        ref={textareaRef}
        value={editComment || ''}
        onChange={(e) => onEditCommentChange(e.target.value)}
        className="mb-1 mt-2 h-32 min-h-[100px] w-full resize-none overflow-auto rounded-2xl border border-grayscale-600 bg-grayscale-150 p-4 text-body-mm text-grayscale-600 focus:border-grayscale-700"
        maxLength={100}
        placeholder="리뷰를 작성하세요."
      />
      {/* 글자 수 표시 */}
      <span className="absolute bottom-[60px] right-4 text-caption-mm text-grayscale-600">
        {editComment.length}/100
      </span>

      {/* 저장 및 취소 버튼 */}
      <ReviewActionButtons
        onSave={onSave}
        onCancel={onCancel}
        isEditValid={isEditValid}
      />
    </div>
  );
};

export default ReviewEditingContent;
