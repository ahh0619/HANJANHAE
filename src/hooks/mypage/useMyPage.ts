import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { fetchUser } from '@/utils/auth/action';

type UserProfile = {
  nickname: string;
  profile_image: string | null;
};

const useMyPage = (initialUserProfile: UserProfile) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const profile = await fetchUser();
      return profile;
    },
    initialData: initialUserProfile,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  return {
    isModalOpen,
    userData,
    isLoading,
    isError,
    handleModalOpen,
    handleModalClose,
  };
};

export default useMyPage;
