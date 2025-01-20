'use client';

import useGuestDrinkRecommendations from '@/hooks/result/useGuestDrinkRecommendations';

import DrinkList from './DrinkList';
import LoadingAnimation from './LoadingAnimation';

const DrinkGuestReco = () => {
  const drinks = useGuestDrinkRecommendations();

  if (drinks === null) {
    return <LoadingAnimation />;
  }

  if (drinks.length === 0) {
    return <div>추천 결과 없음</div>;
  }

  return (
    <DrinkList
      drinks={drinks}
      title="게스트님을 위한 전통주 추천"
      userId={null}
    />
  );
};

export default DrinkGuestReco;
