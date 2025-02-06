'use client';

import useRecommendations from '@/hooks/result/useRecomendations';

import DrinkList from './DrinkList';
import LoadingAnimation from './LoadingAnimation';

type DrinkResultProps = {
  userId?: string | null;
  nickname: string;
};

const DrinkResult = ({ userId, nickname }: DrinkResultProps) => {
  const { drinks, error } = useRecommendations(userId);

  if (error !== '') {
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

export default DrinkResult;
