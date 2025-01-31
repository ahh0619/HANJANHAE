import React from 'react';

import useProfileEdit from '@/hooks/mypage/useProfileEdit';

import ProfileActionButton from './ProfileActionButton';
import ProfileImageUpload from './ProfileImageUpload';
import ProfileNicknameInput from './ProfileNicknameInput';

type ProfileEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user: {
    nickname: string;
    profile_image: string | null;
  };
};

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const {
    nickname,
    setNickname,
    preview,
    handleFileChange,
    handleUpdateProfile,
    errorMessage,
    resetNickname,
    handleRemoveImage,
  } = useProfileEdit(user, onClose);

  if (!isOpen) return null;

  const handleProfileEditModalClose = () => {
    resetNickname();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-11/12 max-w-sm rounded-lg bg-etc-white p-5">
        <h2 className="mb-5 text-center text-title-lb">프로필 수정</h2>
        <div className="flex flex-col items-center">
          {/* 프로필 이미지 업로드 */}
          <ProfileImageUpload
            preview={preview}
            onFileChange={handleFileChange}
            onRemoveImage={handleRemoveImage}
          />

          {/* 닉네임 입력 */}
          <ProfileNicknameInput value={nickname} onChange={setNickname} />
          <div className="mt-1 min-h-[1rem] self-start text-left">
            {errorMessage && (
              <p className="text-label-sm text-grayscale-600">{errorMessage}</p>
            )}
          </div>
        </div>

        {/* 취소 및 완료 버튼 */}
        <div className="mt-10 flex w-full justify-between gap-2">
          <ProfileActionButton
            onClick={handleProfileEditModalClose}
            className="border border-primary text-primary hover:bg-secondary-hover"
          >
            취소하기
          </ProfileActionButton>
          <ProfileActionButton
            onClick={handleUpdateProfile}
            className="bg-primary text-white hover:bg-primary-hover"
          >
            완료하기
          </ProfileActionButton>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;
