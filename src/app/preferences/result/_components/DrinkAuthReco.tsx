'use client';

import useDrinkRecommendations from '@/hooks/result/useDrinkRecommendations';

import DrinkList from './DrinkList';
import LoadingAnimation from './LoadingAnimation';

type DrinkAuthRecoProps = {
  userId: string;
  nickname: string;
};

const DrinkAuthReco = ({ userId, nickname }: DrinkAuthRecoProps) => {
  const { drinks, error } = useDrinkRecommendations(userId);

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

export default DrinkAuthReco;
