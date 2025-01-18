'use client';

import { useEffect } from 'react';

import ReviewActionButtons from './ReviewActionButtons';
import ReviewStarRating from './ReviewStarRating';

const ReviewEditingContent = ({
  editComment,
  errorMessage,
  textareaRef,
  onEditCommentChange,
  editRating,
  onRatingChange,
  onSave,
  onCancel,
  canEdit,
}) => {
  useEffect(() => {
    if (textareaRef?.current) {
      textareaRef.current.focus();
    }
  }, [textareaRef]);

  return (
    <div className="relative">
      {/* 별점 수정 */}
      <ReviewStarRating rating={editRating} onClick={onRatingChange} />

      {/* 댓글 수정 영역 */}
      <textarea
        ref={textareaRef}
        value={editComment || ''}
        onChange={(e) => onEditCommentChange(e.target.value)}
        className="mt-2 h-32 min-h-[100px] w-full resize-none overflow-auto rounded-2xl border !bg-grayscale-200 p-4 !text-body-mm !text-grayscale-600 focus:border-grayscale-600"
        maxLength={101}
        placeholder="리뷰를 작성하세요."
      />
      {/* 글자 수 표시 */}
      <span className="absolute bottom-16 right-4 text-caption-mm text-grayscale-600">
        {editComment.length}/100
      </span>
      {/* 에러 메시지 */}
      <div className="h-2">
        {errorMessage && (
          <p className="text-label-sm text-etc-red">{errorMessage}</p>
        )}
      </div>

      {/* 저장 및 취소 버튼 */}
      <ReviewActionButtons
        canEdit={canEdit}
        onSave={onSave}
        onCancel={onCancel}
      />
    </div>
  );
};

export default ReviewEditingContent;
