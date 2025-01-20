'use client';

import { useEffect, useState } from 'react';

import { UserType } from '@/types/Auth';
import { fetchUser } from '@/utils/auth/action';

import ResultList from './ResultList';

const FilterSearchResults = () => {
  const [user, setUser] = useState<UserType | null>(null);
  // fetchUser로 정보 불러와서 바로바로 좋아요 해결

  useEffect(() => {
    const getUser = async () => {
      const user = await fetchUser();
      setUser(user);
    };
    getUser();
  }, []);

  return <ResultList user={user} />;
};

export default FilterSearchResults;
