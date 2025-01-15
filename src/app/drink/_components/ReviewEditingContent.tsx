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
    <div className="mt-2">
      <textarea
        ref={textareaRef}
        value={editComment}
        onChange={(e) => onEditCommentChange(e.target.value)}
        className="mt-2 max-h-32 w-full resize-none overflow-auto rounded-lg border bg-gray-200 p-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
        maxLength={101}
        placeholder="리뷰를 작성하세요."
      />
      {errorMessage && (
        <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default ReviewEditingContent;
