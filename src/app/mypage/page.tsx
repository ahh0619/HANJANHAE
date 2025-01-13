'use client';

import { useState } from 'react';

import { useAuthStore } from '@/store/authStore';
import { logout } from '@/utils/auth/action';

import ProfileEditModal from './_components/ProfileEditModal';

const MyPage = () => {
  const { removeUser } = useAuthStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center">
      {/* Header */}
      <header className="w-full bg-white py-4">
        <div className="flex items-center justify-center px-4">
          <h1 className="text-lg font-bold">마이 페이지</h1>
        </div>
      </header>

      {/* Profile Section */}
      <div className="mt-6 w-full px-4">
        <div className="flex items-center rounded-lg bg-white px-4 py-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-300 text-xl font-bold">
            프사
          </div>
          <div className="ml-4 flex flex-col justify-center">
            <p className="text-lg font-semibold">슬찌</p>
          </div>
          <button
            onClick={handleModalOpen}
            className="ml-auto rounded bg-gray-200 px-4 py-1 text-sm"
          >
            수정
          </button>
        </div>

        {/* Preferences Section */}
        <div className="mt-4 w-full rounded-lg bg-gray-200 px-4 py-4 text-center text-sm font-medium">
          내 취향 관리
        </div>
      </div>

      {/* Account Options */}
      <div className="mt-6 w-full px-4">
        <div className="divide-y rounded-lg bg-white">
          <div className="flex items-center p-4">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-300">
              <span className="text-sm">👤</span>
            </div>
            <span className="ml-4 text-sm">비밀번호 재설정</span>
          </div>
          <div className="flex items-center p-4">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-300">
              <span className="text-sm">👤</span>
            </div>
            <span
              className="ml-4 cursor-pointer text-sm"
              onClick={async () => {
                await logout();
                removeUser();
              }}
            >
              로그아웃
            </span>
          </div>
        </div>
        <button className="mt-4 w-full text-center text-sm text-gray-500 underline">
          회원 탈퇴
        </button>
      </div>

      {/* Profile Edit Modal */}
      <ProfileEditModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default MyPage;
