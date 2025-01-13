'use client';

import useDrinkRecommendations from '@/hooks/result/useDrinkRecommendations';

import DrinkList from './DrinkList';

type DrinkAuthRecoProps = {
  userId: string;
  nickname: string;
};

const DrinkAuthReco = ({ userId, nickname }: DrinkAuthRecoProps) => {
  const drinks = useDrinkRecommendations(userId);

  if (drinks === null) {
    return <div>Loading...</div>;
  }

  if (drinks.length === 0) {
    return <div>추천 결과 없음</div>;
  }

  return <DrinkList drinks={drinks} title={`${nickname}을 위한 전통주 추천`} />;
};

export default DrinkAuthReco;
