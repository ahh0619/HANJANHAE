import { fetchUser } from '@/utils/auth/action';

import MyPageComponent from './_components/MyPageComponent';

const MyPage = async () => {
  const userProfile = await fetchUser();

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center">
      <MyPageComponent initialUserProfile={userProfile} />
    </div>
  );
};

export default MyPage;
