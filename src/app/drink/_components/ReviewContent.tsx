'use client';

import { useModal } from '@/app/providers/ModalProvider';
import { ReviewContentProps } from '@/types/review';

import ReviewEditDeleteButtons from './ReviewEditDeleteButtons';
import ReviewEditingContent from './ReviewEditingContent';
import ReviewInfo from './ReviewInfo';
import ReviewReadOnlyContent from './ReviewReadOnlyContent';

const ReviewContent = ({
  review,
  nickname,
  profile_image,
  editing,
  editComment,
  textareaRef,
  onEditCommentChange,
  onSave,
  onCancel,
  updatedRating,
  onRatingChange,
  canEdit,
  isEditValid,
  onEdit,
  onDelete,
}: ReviewContentProps) => {
  const { openModal, closeModal } = useModal();

  const isEdited = review.updated_at && review.updated_at !== review.created_at;

  const handleDeleteClick = () => {
    openModal({
      title: '리뷰 삭제를 하시겠어요?',
      content: '삭제한 리뷰는 복구할 수 없습니다.',
      primaryAction: {
        text: '삭제하기',
        onClick: () => {
          closeModal();
          onDelete();
        },
      },
      secondaryAction: {
        text: '취소하기',
        onClick: closeModal,
      },
    });
  };

  return (
    <div className="flex flex-col space-y-2">
      {/* 편집 모드 */}
      {editing ? (
        <ReviewEditingContent
          editComment={editComment}
          textareaRef={textareaRef}
          onEditCommentChange={onEditCommentChange}
          editRating={updatedRating}
          onRatingChange={onRatingChange}
          onSave={onSave}
          onCancel={onCancel}
          isEditValid={isEditValid}
        />
      ) : (
        <div>
          {/* 리뷰 정보 */}
          <ReviewInfo
            nickname={nickname || ''}
            profile_image={profile_image || ''}
            createdAt={review.created_at || ''}
            rating={updatedRating}
            editable={false}
            canEdit={canEdit}
          />
          {/* 댓글 내용 */}
          <ReviewReadOnlyContent comment={review.content} isEdited={isEdited} />
        </div>
      )}

      {/* 수정/삭제 버튼 */}
      {!editing && canEdit && (
        <div className="!mt-1 flex justify-end space-x-4 text-label-sm text-grayscale-500">
          <ReviewEditDeleteButtons
            onEdit={onEdit}
            onDelete={handleDeleteClick}
          />
        </div>
      )}
    </div>
  );
};

export default ReviewContent;
