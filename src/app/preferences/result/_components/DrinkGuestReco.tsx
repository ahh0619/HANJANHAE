'use client';

import useGuestDrinkRecommendations from '@/hooks/result/useGuestDrinkRecommendations';

import DrinkList from './DrinkList';
import LoadingAnimation from './LoadingAnimation';

const DrinkGuestReco = () => {
  const { drinks, error } = useGuestDrinkRecommendations();

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
      title="게스트님을 위한 전통주 추천"
      userId={null}
    />
  );
};

export default DrinkGuestReco;
