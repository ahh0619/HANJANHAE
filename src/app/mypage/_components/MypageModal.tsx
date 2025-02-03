'use client';

import useMyPage from '@/hooks/mypage/useMyPage';
import { useAuthStore } from '@/store/authStore';

import MyPageAccountOptions from './MyPageAccountOptions';
import MyPagePreferences from './MyPagePreferences';
import MyPageProfileSection from './MyPageProfileSection';
import ProfileEditModal from './ProfileEditModal';

const MypageModal = () => {
  const { user } = useAuthStore();

  const { isModalOpen, userData, handleModalOpen, handleModalClose } =
    useMyPage(user);

  return (
    <div className="px-3 pb-7 pt-2">
      <MyPageProfileSection userData={userData} onEditClick={handleModalOpen} />
      <div className="mt-2">
        <MyPagePreferences />
      </div>
      <MyPageAccountOptions />
      <ProfileEditModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        user={userData}
      />
    </div>
  );
};

export default MypageModal;
