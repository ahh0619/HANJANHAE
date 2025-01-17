import { useState } from 'react';

import Modal from '@/components/common/Modal';
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 삭제 버튼 클릭 시 모달 열기
  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  // 모달에서 삭제 확인
  const handleConfirmDelete = () => {
    setIsModalOpen(false);
    onDelete();
  };

  // 모달에서 취소
  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col space-y-2">
      {/* 상단: 닉네임, 프로필 이미지, 별점, 날짜 */}
      <div className="relative">
        <ReviewInfo
          nickname={nickname}
          createdAt={createdAt}
          rating={updatedRating}
          profile_image={profileImage}
          editable={editing}
          onRatingChange={onRatingChange}
        />
      </div>

      {/* 댓글 영역 */}
      <div className="mt-2">
        {editing ? (
          <>
            {/* 댓글 수정 영역 */}
            {/* 댓글 수정 영역 */}
            <ReviewEditingContent
              editComment={editComment}
              errorMessage={errorMessage}
              textareaRef={textareaRef}
              onEditCommentChange={onEditCommentChange}
            />
            {errorMessage && (
              <p className="mt-1 text-left text-label-sm text-etc-red">
                {errorMessage}
              </p>
            )}
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

      {/* 수정/삭제 버튼 */}
      {!editing && canEdit && (
        <div className="!mr-3 !mt-4 flex justify-end space-x-4 text-label-sm text-grayscale-500">
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
