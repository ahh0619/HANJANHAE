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
  console.log('recodata: ', recoData.data);
  console.log('surveydata: ', surveyData.data);

  useEffect(() => {
    console.log('im in');
    if (recoData.data?.length === 0 && !!surveyData.data) {
      const fetchRecommnedDrinks = async () => {
        try {
          await recommendDrinks({
            surveyData: surveyData.data,
            userId,
          });

          queryClient.invalidateQueries({ queryKey: ['recoData', userId] });
        } catch (error) {
          console.error('failed to fetch recommendation');
        }
      };

      fetchRecommnedDrinks();
    }
  }, [surveyData]);

  if (queries.some((query) => query.isPending)) {
    return <div>Loading...</div>;
  }

  if (recoData.data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {recoData.data.map((drink) => (
        <div key={drink.id} className="mb-8">
          <h1>{drink.name}</h1>
          <p>{drink.type}</p>
          <span>{drink.reason}</span>
        </div>
      ))}
    </div>
  );
};

export default DrinkAuthReco;
