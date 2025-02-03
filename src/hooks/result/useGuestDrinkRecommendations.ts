import { useEffect, useState } from 'react';

import { recommendDrinks } from '@/app/actions/preference';
import { useSurveyStore } from '@/store/surveyStore';
import { ResultType } from '@/types/preferences';

const useGuestDrinkRecommendations = () => {
  const [error, setError] = useState('');
  const [drinks, setDrinks] = useState<ResultType[] | null>(null);
  const { setIsSurveyCompleted } = useSurveyStore();

  useEffect(() => {
    const fetchRecommendations = async () => {
      const recoData = localStorage.getItem('recoData');

      if (recoData) {
        setDrinks(JSON.parse(recoData));
        return;
      }

      const surveyData = JSON.parse(localStorage.getItem('surveyData') || '{}');

      if (!surveyData || Object.keys(surveyData).length === 0) {
        console.log('설문조사 없음');
        setError('설문조사한 결과가 없습니다');
        return;
      }

      const updatedRecoData = await recommendDrinks({
        surveyData,
      });

      if (!updatedRecoData) {
        setError('AI 전통주 추천 실패!');
        return;
      }

      setDrinks(updatedRecoData);
      localStorage.setItem('recoData', JSON.stringify(updatedRecoData));
      setIsSurveyCompleted(true);
    };

    fetchRecommendations();
  }, []);

  return { error, drinks };
};

export default useGuestDrinkRecommendations;
