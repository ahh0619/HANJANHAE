import { useEffect, useState } from 'react';

import { useSurveyStore } from '@/store/surveyStore';
import { Tables } from '@/types/supabase';
import { recommendDrinks } from '@/utils/preference/action';

const useGuestDrinkRecommendations = () => {
  const [drinks, setDrinks] = useState<Tables<'reco_results'>[] | null>(null);
  const { setIsSurveyCompleted } = useSurveyStore();

  useEffect(() => {
    const fetchRecommendations = async () => {
      const recoData = localStorage.getItem('recoData');

      if (recoData) {
        setDrinks(JSON.parse(recoData));
        return;
      }

      const surveyData = JSON.parse(localStorage.getItem('surveyData') || '{}');

      if (!surveyData) {
        console.error('No survey data found');
        setDrinks([]);
        return;
      }

      const updatedRecoData = await recommendDrinks({
        surveyData,
      });

      setDrinks(updatedRecoData);
      localStorage.setItem('recoData', JSON.stringify(updatedRecoData));
      setIsSurveyCompleted(true);
    };

    fetchRecommendations();
  }, []);

  return drinks;
};

export default useGuestDrinkRecommendations;
