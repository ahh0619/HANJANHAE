import { useState } from 'react';

import Modal from '@/components/common/Modal';
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
  errorMessage,
  textareaRef,
  onEditCommentChange,
  onSave,
  onCancel,
  updatedRating,
  onRatingChange,
  canEdit,
  onEdit,
  onDelete,
}: ReviewContentProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsModalOpen(false);
    onDelete();
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  // "편집됨" 여부
  const isEdited = review.updated_at && review.updated_at !== review.created_at;

  return (
    <div className="flex flex-col space-y-2">
      {/* 상단: 닉네임, 프로필 이미지, 별점, 날짜 */}
      {editing ? (
        <ReviewEditingContent
          editComment={editComment}
          errorMessage={errorMessage}
          textareaRef={textareaRef}
          onEditCommentChange={onEditCommentChange}
          editRating={updatedRating}
          onRatingChange={onRatingChange}
          onSave={onSave}
          onCancel={onCancel}
          canEdit={canEdit}
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

      {/* 삭제 확인 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        title="리뷰 삭제를 하시겠어요?"
        content="삭제한 리뷰는 복구할 수 없습니다."
        primaryAction={{
          text: '삭제하기',
          onClick: handleConfirmDelete,
        }}
        secondaryAction={{
          text: '취소하기',
          onClick: handleCancelDelete,
        }}
        showCloseButton
      />
    </div>
  );
};

export default ReviewContent;
