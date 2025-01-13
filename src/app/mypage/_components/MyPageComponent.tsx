'use client';

import { useState } from 'react';

import MyPageAccountOptions from './MyPageAccountOptions';
import MyPageHeader from './MyPageHeader';
import MyPagePreferences from './MyPagePreferences';
import MyPageProfileSection from './MyPageProfileSection';
import ProfileEditModal from './ProfileEditModal';

type UserProfile = {
  nickname: string;
  profile_image: string | null;
};

type MyPageComponentProps = {
  userProfile: UserProfile;
};

const MyPageComponent: React.FC<MyPageComponentProps> = ({ userProfile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <>
      <MyPageHeader />
      <MyPageProfileSection
        userData={userProfile}
        onEditClick={handleModalOpen}
      />
      <MyPagePreferences />
      <MyPageAccountOptions />
      <ProfileEditModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        user={userProfile}
      />
    </>
  );
};

export default MyPageComponent;
