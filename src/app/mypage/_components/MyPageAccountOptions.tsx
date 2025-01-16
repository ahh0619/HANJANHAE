'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/store/authStore';
import { deleteUser, logout } from '@/utils/auth/action';

const MyPageAccountOptions = () => {
  const router = useRouter();

  const queryClient = useQueryClient();
  const { removeUser } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    queryClient.removeQueries({ queryKey: ['userProfile'] });
    removeUser();
  };

  const handleDeleteUser = async () => {
    if (window.confirm('회원 탈퇴를 하시겠어요?')) {
      await deleteUser();
      removeUser();
    }
  };

  return (
    <div className="mt-6 w-full px-4">
      {/* Account options section */}
      <div className="space-y-6">
        {/* Password Reset */}
        <div
          className="flex cursor-pointer items-center"
          onClick={() => router.push('/password/check')}
        >
          <div className="flex h-12 w-12 items-center justify-center">
            <img
              src="/assets/icons/key.svg"
              alt="Key Icon"
              className="h-6 w-6"
            />
          </div>
          <span className="ml-4 text-base font-medium text-gray-800">
            비밀번호 재설정
          </span>
        </div>

        {/* Logout */}
        <div
          className="flex cursor-pointer items-center"
          onClick={handleLogout}
        >
          <div className="flex h-12 w-12 items-center justify-center">
            <img
              src="/assets/icons/logout.svg"
              alt="Logout Icon"
              className="h-6 w-6"
            />
          </div>
          <span className="ml-4 text-base font-medium text-gray-800">
            로그아웃
          </span>
        </div>
      </div>

      {/* Delete account section */}
      <div className="mt-16 text-center">
        <button
          className="cursor-pointer text-sm font-medium text-gray-600 underline"
          onClick={handleDeleteUser}
        >
          회원 탈퇴
        </button>
      </div>
    </div>
  );
};

export default MyPageAccountOptions;
