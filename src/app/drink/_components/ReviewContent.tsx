import { ReviewContentProps } from '@/types/review';

import ReviewActionButtons from './ReviewActionButtons';
import ReviewEditDeleteButtons from './ReviewEditDeleteButtons';
import ReviewEditingContent from './ReviewEditingContent';
import ReviewInfo from './ReviewInfo';
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
  updatedRating,
  onRatingChange,
  nickname,
  createdAt,
  profileImage,
  canEdit,
  onEdit,
  onDelete,
}: ReviewContentProps & {
  onSave: () => void;
  onCancel: () => void;
  canEdit: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {/* 상단: 닉네임, 프로필 이미지, 별점, 날짜 및 수정/삭제 버튼 */}
      <div className="relative">
        <ReviewInfo
          nickname={nickname}
          createdAt={createdAt}
          rating={updatedRating}
          profile_image={profileImage}
          editable={editing}
          onRatingChange={onRatingChange}
        />

        {/* 수정/삭제 버튼 */}
        {canEdit && (
          <div className="text-label-sm absolute -bottom-11 right-0 top-0 flex space-x-2 text-grayscale-500">
            <ReviewEditDeleteButtons
              isEditing={editing}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        )}
      </div>

      {/* 댓글 영역 */}
      <div className="mt-2">
        {editing ? (
          <>
            {/* 댓글 수정 영역 */}
            <ReviewEditingContent
              editComment={editComment}
              errorMessage={errorMessage}
              textareaRef={textareaRef}
              onEditCommentChange={onEditCommentChange}
            />
            {/* 저장 및 취소 버튼 */}
            <ReviewActionButtons
              canEdit={canEdit}
              onSave={onSave}
              onCancel={onCancel}
            />
          </>
        ) : (
          <>
            {/* 읽기 모드에서의 댓글 표시 */}
            <ReviewReadOnlyContent comment={comment} />
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewContent;
