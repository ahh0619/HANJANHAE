import { useQueries, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { fetchRecoData, fetchSurveyData, recommendDrinks } from '../action';

type DrinkAuthRecoProps = {
  userId: string;
};

const DrinkAuthReco = ({ userId }: DrinkAuthRecoProps) => {
  const queryClient = useQueryClient();

  const queries = useQueries({
    queries: [
      {
        queryKey: ['recoData', userId],
        queryFn: () => fetchRecoData(userId),
      },
      {
        queryKey: ['surveyData', userId],
        queryFn: () => fetchSurveyData(userId),
      },
    ],
  });

  const [recoData, surveyData] = queries;

  useEffect(() => {
    if (!recoData) {
      const fetchRecoData = async () => {
        const data = await recommendDrinks({
          surveyData: surveyData.data,
          userId,
        });
      };
    }
  }, []);

  return <div>DrinkAuthReco</div>;
};

export default DrinkAuthReco;
