import { useEffect } from 'react';

const ReviewEditingContent = ({
  editComment,
  errorMessage,
  textareaRef,
  onEditCommentChange,
}) => {
  useEffect(() => {
    if (textareaRef?.current) {
      textareaRef.current.focus();
    }
  }, [textareaRef]);

  return (
    <div className="relative mt-2">
      <textarea
        ref={textareaRef}
        value={editComment}
        onChange={(e) => onEditCommentChange(e.target.value)}
        className="h-32 min-h-11 w-full resize-none overflow-auto rounded-lg border !bg-grayscale-200 p-2 !text-body-mm !text-grayscale-900 focus:border-grayscale-600"
        maxLength={101}
        placeholder="리뷰를 작성하세요."
      />
      {/* 글자 수 표시 */}
      <span className="absolute bottom-8 right-4 text-caption-mm text-grayscale-600">
        {editComment.length}/100
      </span>
      {/* 에러 메시지 */}
      <div className="mt-1 h-2">
        {errorMessage && (
          <p className="text-label-sm text-etc-red">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default ReviewEditingContent;
