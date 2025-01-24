import { fetchUser } from '@/app/actions/auth';

import DrinkAuthReco from './_components/DrinkAuthReco';
import DrinkGuestReco from './_components/DrinkGuestReco';

const Result = async () => {
  const user = await fetchUser();

  return user ? (
    <DrinkAuthReco userId={user.id} nickname={user.nickname} />
  ) : (
    <DrinkGuestReco />
  );
};

export default Result;
