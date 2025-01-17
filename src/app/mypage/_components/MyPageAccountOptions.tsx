'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/providers/AuthProvider';
import { useAuthStore } from '@/store/authStore';
import { deleteUser } from '@/utils/auth/action';

const MyPageAccountOptions = () => {
  const router = useRouter();

  const { logout } = useAuth();

  const queryClient = useQueryClient();
  const { removeUser } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      queryClient.removeQueries({ queryKey: ['userProfile'] });
    } catch (error: any) {
      window.alert('회원가입에 실패하였습니다.');
    }
  };

  const handleDeleteUser = async () => {
    if (window.confirm('회원 탈퇴를 하시겠어요?')) {
      try {
        await deleteUser();
        removeUser();
      } catch (error: any) {
        window.alert('회원 탈퇴에 실패하였습니다.');
      }
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
          <span className="ml-4 text-label-lm text-grayscale-900">
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
          <span className="ml-4 text-label-lm text-grayscale-900">
            로그아웃
          </span>
        </div>
      </div>

      {/* Delete account section */}
      <div className="absolute bottom-[calc(68px+3rem)] left-0 right-0 flex justify-center">
        <button
          className="cursor-pointer text-label-mm text-grayscale-800 underline"
          onClick={handleDeleteUser}
        >
          회원 탈퇴
        </button>
      </div>
    </div>
  );
};

export default MyPageAccountOptions;
