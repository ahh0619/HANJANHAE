import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getUserProfile } from '@/utils/mypage/action';

const useMyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const profile = await getUserProfile();
      return profile;
    },
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 유지
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
