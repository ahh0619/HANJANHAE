import type { Metadata } from 'next';

import { fetchUser } from '../actions/auth';
import MyPageComponent from './_components/MyPageComponent';

export async function generateMetadata(): Promise<Metadata> {
  const userProfile = await fetchUser();

  if (!userProfile) {
    return {
      title: '마이페이지 - 한잔해',
      description: '로그인 후에 마이페이지를 이용할 수 있습니다.',
    };
  }

  return {
    title: `${userProfile.nickname}님의 마이페이지 - 한잔해`,
    description: `${userProfile.nickname}님의 활동 기록과 추천 정보를 확인하세요.`,
  };
}

const MyPage = async () => {
  const userProfile = await fetchUser();

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center">
      <MyPageComponent initialUserProfile={userProfile} />
    </div>
  );
};

export default MyPage;
