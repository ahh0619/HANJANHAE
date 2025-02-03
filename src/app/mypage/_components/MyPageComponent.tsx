'use client';

import useMyPage from '@/hooks/mypage/useMyPage';

import MyPageAccountOptions from './MyPageAccountOptions';
import MyPageHeader from './MyPageHeader';
import MyPagePreferences from './MyPagePreferences';
import MyPageProfileSection from './MyPageProfileSection';
import ProfileEditModal from './ProfileEditModal';

type UserProfile = {
  nickname: string;
  profile_image: string | null;
  id: string;
};

type MyPageComponentProps = {
  initialUserProfile: UserProfile;
};

const MyPageComponent: React.FC<MyPageComponentProps> = ({
  initialUserProfile,
}) => {
  const {
    isModalOpen,
    userData,
    isLoading,
    isError,
    handleModalOpen,
    handleModalClose,
  } = useMyPage(initialUserProfile);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (isError || !userData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>유저 정보를 가져올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      <MyPageHeader />
      <MyPageProfileSection userData={userData} onEditClick={handleModalOpen} />
      <MyPagePreferences />
      <MyPageAccountOptions />
      <ProfileEditModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        user={userData}
      />
    </>
  );
};

export default MyPageComponent;
