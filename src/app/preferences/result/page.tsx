import { fetchUser } from '@/app/actions/auth';

const Result = async () => {
  const user = await fetchUser();

  return user ? (
    <DrinkAuthRecㅐ userId={user.id} nickname={user.nickname} />
  ) : (
    <DrinkGuestReco />
  );
};

export default Result;
