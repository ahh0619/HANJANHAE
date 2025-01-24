import { useEffect, useState } from 'react';

import {
  fetchRecoData,
  fetchSurveyData,
  recommendDrinks,
} from '@/app/actions/preference';
import { useSurveyStore } from '@/store/surveyStore';

const useDrinkRecommendations = (userId: string) => {
  const [error, setError] = useState('');
  const [drinks, setDrinks] = useState(null);
  const { setIsSurveyCompleted } = useSurveyStore();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Step 1:전통주 추천리스트(슈퍼베이스 테이블 )
        const recoData = await fetchRecoData(userId);
        console.log('recoData: ', recoData);

        if (recoData.length > 0) {
          // Step 2-1:  2-1) 1번 데이터가 있으면 state에 넣어주고
          setDrinks(recoData);
          return;
        }

        // Step 2-2:  1번 데이터가 없으면, 설문조사 결과 가져오기
        const surveyData = await fetchSurveyData(userId);

        if (!surveyData) {
          console.log('설문조사 없음');
          setError('설문조사한 결과가 없습니다');
          return;
        }

        const updatedRecoData = await recommendDrinks({
          surveyData,
          userId,
        });

        if (!updatedRecoData) {
          setError('AI 전통주 추천 실패!');
          return;
        }

        setDrinks(updatedRecoData);
        setIsSurveyCompleted(true);
      } catch (error) {
        console.error('전통주 추천 결과 가져오기 or 생성 실패:', error);
        setDrinks([]);
      }
    };

    fetchRecommendations();
  }, [userId]);

  return { drinks, error };
};

export default useDrinkRecommendations;
