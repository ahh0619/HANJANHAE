import { useEffect, useState } from 'react';

import { useSurveyStore } from '@/store/surveyStore';
import { fetchRecoData, fetchSurveyData } from '@/utils/preference/action';

const useDrinkRecommendations = (userId: string) => {
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
        console.log('surveyData: ', surveyData);

        if (!surveyData) {
          console.error('No survey data found');
          setDrinks([]);
          return;
        }

        // 라우트 핸들러로 추천 요청
        const response = await fetch('/api/recommend', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ surveyData, userId }),
        });

        if (!response.ok) {
          throw new Error('추천 생성 실패');
        }

        const updatedRecoData = await response.json();
        console.log('updatedRecoData: ', updatedRecoData);

        setDrinks(updatedRecoData);
        setIsSurveyCompleted(true);
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
