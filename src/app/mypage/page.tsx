import { getUserProfile } from '@/utils/mypage/action';

import MyPageComponent from './_components/MyPageComponent';

const MyPage = async () => {
  // 서버에서 사용자 프로필 데이터를 가져옵니다.
  const userProfile = await getUserProfile();

  if (!userProfile) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>유저 정보를 가져올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center">
      <MyPageComponent userProfile={userProfile} />
    </div>
  );
};

export default MyPage;
