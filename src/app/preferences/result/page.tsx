import { fetchUser } from '@/app/actions/auth';

import DrinkResult from './_components/DrinkResult';

const Result = async () => {
  const user = await fetchUser();

  return (
    <DrinkResult
      userId={user ? user.id : null}
      nickname={user ? user.nickname : '게스트'}
    />
  );
};

export default Result;
