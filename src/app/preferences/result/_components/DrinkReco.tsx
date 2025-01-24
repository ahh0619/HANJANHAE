'use client';

import useRecommendations from '@/hooks/result/useRecomendations';

import DrinkList from './DrinkList';
import LoadingAnimation from './LoadingAnimation';

type DrinkAuthRecoProps = {
  userId?: string | undefined;
  nickname: string;
};

const DrinkReco = ({ userId, nickname }: DrinkAuthRecoProps) => {
  const { drinks, error } = useRecommendations(userId);

  if (error !== '') {
    console.log('에러난다~~');
    throw new Error(error);
  }

  if (drinks === null) {
    return <LoadingAnimation />;
  }

  return (
    <DrinkList
      drinks={drinks}
      title={`${nickname}님을 위한 전통주 추천`}
      userId={userId}
    />
  );
};

export default DrinkReco;
