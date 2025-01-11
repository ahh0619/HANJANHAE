import { ReviewContentProps } from '@/types/review';

import ReviewEditingContent from './ReviewEditingContent';
import ReviewReadOnlyContent from './ReviewReadOnlyContent';

const ReviewContent = ({
  editing,
  comment,
  editComment,
  errorMessage,
  textareaRef,
  onEditCommentChange,
  onSave,
  onCancel,
}: ReviewContentProps) => {
  return editing ? (
    <ReviewEditingContent
      editComment={editComment}
      errorMessage={errorMessage}
      textareaRef={textareaRef}
      onEditCommentChange={onEditCommentChange}
      onSave={onSave}
      onCancel={onCancel}
    />
  ) : (
    <ReviewReadOnlyContent comment={comment} />
  );
};

export default ReviewContent;
