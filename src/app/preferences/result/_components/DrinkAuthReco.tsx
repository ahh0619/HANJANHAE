'use client';

import useDrinkRecommendations from '@/hooks/result/useDrinkRecommendations';

import DrinkList from './DrinkList';
import LoadingAnimation from './LoadingAnimation';

type DrinkAuthRecoProps = {
  userId: string;
  nickname: string;
};

const DrinkAuthReco = ({ userId, nickname }: DrinkAuthRecoProps) => {
  const drinks = useDrinkRecommendations(userId);

  if (drinks === null) {
    return <LoadingAnimation />;
  }

  if (drinks.length === 0) {
    return <div>추천 결과 없음</div>;
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
