'use client';

import { useEffect, useState } from 'react';

import { Tables } from '@/types/supabase';

import { recommendDrinks } from '../action';

const DrinkGuestReco = () => {
  // const [recoData, setRecoData] = useState<Tables<'reco_results'> | null>(
  //   JSON.parse(localStorage.getItem('recoData')),
  // );

  const [recoData, setRecoData] = useState<Tables<'reco_results'>[] | null>([]);

  useEffect(() => {
    const storedRecoData = localStorage.getItem('recoData');

    if (storedRecoData) {
      setRecoData(JSON.parse(storedRecoData));
    } else {
      const fetchRecoData = async () => {
        const surveyData = JSON.parse(
          localStorage.getItem('surveyData') || '{}',
        );
        console.log('local survey: ', surveyData);
        const data = await recommendDrinks({ surveyData });
        setRecoData(data);

        localStorage.setItem('recoData', JSON.stringify(data));
      };

      fetchRecoData();
    }
  }, []);

  return (
    <div>
      {recoData.map((drink) => (
        <div key={drink.id} className="mb-8">
          <h1>{drink.name}</h1>
          <p>{drink.type}</p>
          <span>{drink.reason}</span>
        </div>
      ))}
    </div>
  );
};

export default DrinkGuestReco;
