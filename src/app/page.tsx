import { Metadata } from 'next';

import UserInitializer from '@/components/auth/UserInitializer';
import ThematicRecommender from '@/components/recommend/ThematicRecommender';
import { getRecommendations } from '@/utils/recommend/recommendationService';

// ISR 설정
export const revalidate = 3600;

export const metadata: Metadata = {
  title: '메인 페이지',
  description: 'AI 추천 기반 전통주를 만나보세요!',
};

const Home = async () => {
  const recommendations = await getRecommendations();

  return (
    <>
      <ThematicRecommender recommendations={recommendations} />
      <UserInitializer />
    </>
  );
};

export default Home;
