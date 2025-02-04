import { useEffect, useState } from 'react';

import {
  fetchRecoData,
  fetchSurveyData,
  recommendDrinks,
} from '@/app/actions/preference';
import { useSurveyStore } from '@/store/surveyStore';
import { Tables } from '@/types/supabase';

const useReco = (userId: string | undefined) => {
  const [error, setError] = useState('');
  const [drinks, setDrinks] = useState<Tables<'reco_results'>[] | null>(null);
  const { setIsSurveyCompleted } = useSurveyStore();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        let recoData = null;
        let surveyData = null;

        if (userId) {
          recoData = await fetchRecoData(userId);
          if (recoData.length > 0) {
            setDrinks(recoData);
            return;
          }
          surveyData = await fetchSurveyData(userId);
        } else {
          recoData = localStorage.getItem('recoData');
          if (recoData) {
            setDrinks(JSON.parse(recoData));
            return;
          }
          surveyData = JSON.parse(localStorage.getItem('surveyData') || '{}');
        }

        if (!surveyData || Object.keys(surveyData).length === 0) {
          setError('설문조사한 결과가 없습니다');
          return;
        }

        const updatedRecoData = await recommendDrinks(
          userId ? { surveyData, userId } : { surveyData },
        );
        if (!updatedRecoData) {
          setError('AI 전통주 추천 실패!');
          return;
        }

        setDrinks(updatedRecoData);
        if (!userId) {
          localStorage.setItem('recoData', JSON.stringify(updatedRecoData));
        }
        setIsSurveyCompleted(true);
      } catch (err) {
        console.error('추천 데이터를 가져오는 중 오류가 발생했습니다:', err);
        setError('추천 데이터를 가져오는 중 오류가 발생했습니다.');
        setDrinks([]);
      }
    };

    fetchRecommendations();
  }, [userId]);

  return { drinks, error };
};

export default useReco;
