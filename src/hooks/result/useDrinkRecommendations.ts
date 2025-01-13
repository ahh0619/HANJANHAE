import { useEffect, useState } from 'react';

import {
  fetchRecoData,
  fetchSurveyData,
  recommendDrinks,
} from '@/utils/preference/action';

const useDrinkRecommendations = (userId: string) => {
  const [drinks, setDrinks] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Step 1:전통주 추천리스트(슈퍼베이스 테이블 )
        const recoData = await fetchRecoData(userId);

        if (recoData.length > 0) {
          // Step 2-1:  2-1) 1번 데이터가 있으면 state에 넣어주고
          setDrinks(recoData);
          return;
        }

        // Step 2-2:  1번 데이터가 없으면, 설문조사 결과 가져오기
        const surveyData = await fetchSurveyData(userId);

        if (!surveyData) {
          console.error('No survey data found');
          setDrinks([]);
          return;
        }

        // Step 3: chat gpt로 전통주 추천받고 테이블에 추가
        const updatedRecoData = await recommendDrinks({
          surveyData,
          userId,
        });

        // Step 4: 전통주 추천 결과를 state에 넣어주고
        setDrinks(updatedRecoData);
      } catch (error) {
        console.error('전통주 추천 결과 가져오기 or 생성 실패:', error);
        setDrinks([]);
      }
    };

    fetchRecommendations();
  }, [userId]);

  return drinks;
};

export default useDrinkRecommendations;
