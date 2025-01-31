import * as Sentry from '@sentry/nextjs';
import type { Metadata } from 'next';

import MobileOnlyProtectorProvider from '@/components/common/MobilePageGuardProvider';

import { fetchUser } from '../actions/auth';
import MyPageComponent from './_components/MyPageComponent';

export const generateMetadata = async (): Promise<Metadata> => {
  try {
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
  } catch (error) {
    Sentry.captureException(error);
    return {
      title: '오류 발생 - 한잔해',
      description: '데이터를 가져오는 중 오류가 발생했습니다.',
    };
  }
};

const MyPage = async () => {
  const userProfile = await fetchUser();

  return (
    <div className="mx-auto flex min-h-screen flex-col items-center">
      <MobileOnlyProtectorProvider redirectUrl="/">
        <MyPageComponent initialUserProfile={userProfile} />
      </MobileOnlyProtectorProvider>
    </div>
  );
};

export default MyPage;
