import { fetchUser } from '@/app/actions/auth';

import DrinkReco from './_components/DrinkReco';

const Result = async () => {
  const user = await fetchUser();

  return (
    <DrinkReco
      userId={user ? user.id : null}
      nickname={user ? user.nickname : '게스트'}
    />
  );
};

export default Result;
