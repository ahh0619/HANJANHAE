import { useEffect, useState } from 'react';

import { fetchAuthRecommend, fetchGuestRecommend } from '@/lib/recommendations';
import { useSurveyStore } from '@/store/surveyStore';

const useRecommendations = (userId: string | undefined) => {
  const [error, setError] = useState('');
  const [drinks, setDrinks] = useState(null);
  const { setIsSurveyCompleted } = useSurveyStore();

  useEffect(() => {
    if (userId) {
      fetchAuthRecommend({
        setDrinks,
        setError,
        setIsSurveyCompleted,
        userId,
      });
    } else {
      fetchGuestRecommend({
        setDrinks,
        setError,
        setIsSurveyCompleted,
        userId,
      });
    }
  }, [userId]);

  return { drinks, error };
};

export default useRecommendations;
