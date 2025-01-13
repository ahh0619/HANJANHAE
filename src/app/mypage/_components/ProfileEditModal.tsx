'use client';

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
  } = useProfileEdit(user, onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-11/12 max-w-sm rounded-lg bg-white p-6">
        <button className="absolute right-4 top-4 text-xl" onClick={onClose}>
          ×
        </button>
        <h2 className="mb-4 text-center text-lg font-bold">프로필 수정</h2>
        <div className="flex flex-col items-center">
          <ProfileImageUpload
            preview={preview}
            onFileChange={handleFileChange}
          />
          <ProfileNicknameInput value={nickname} onChange={setNickname} />
        </div>
        <div className="mt-4 flex justify-between">
          <ProfileActionButton
            onClick={onClose}
            className="mr-2 w-1/2 bg-gray-300 text-gray-800"
          >
            취소
          </ProfileActionButton>
          <ProfileActionButton
            onClick={handleUpdateProfile}
            className="ml-2 w-1/2 bg-gray-700 text-white"
          >
            완료
          </ProfileActionButton>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;
