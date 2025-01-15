'use client';

import React from 'react';
import { FiCamera } from 'react-icons/fi';

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
        <h2 className="mb-4 text-center text-lg font-bold">프로필 수정</h2>
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <ProfileImageUpload
              preview={preview}
              onFileChange={handleFileChange}
            />
            <button
              className="absolute -right-1 bottom-2 flex h-10 w-10 items-center justify-center rounded-full border border-gray-400 bg-pink-200 p-1"
              type="button"
            >
              <FiCamera className="h-6 w-6 text-gray-500" />
            </button>
          </div>
          <ProfileNicknameInput value={nickname} onChange={setNickname} />
        </div>
        <div className="mt-4 flex justify-between">
          <ProfileActionButton
            onClick={onClose}
            className="border-primary text-primary hover:bg-secondary-hover mr-2 w-1/2 border"
          >
            취소하기
          </ProfileActionButton>
          <ProfileActionButton
            onClick={handleUpdateProfile}
            className="bg-primary hover:bg-primary-hover ml-2 w-1/2 text-white"
          >
            완료하기
          </ProfileActionButton>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;
