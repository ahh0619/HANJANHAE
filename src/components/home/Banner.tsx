'use client';

import { useEffect, useState } from 'react';

import { fetchUser } from '@/utils/auth/action';
import { hasSurveyRecord } from '@/utils/preference/action';

import AfterBanner from './AfterBanner';
import BeforeBanner from './BeforeBanner';

const Banner = () => {
  const [isSurveyCompleted, setIsSurveyCompleted] = useState<boolean>(false);

  useEffect(() => {
    const checkSurveyRecord = async () => {
      const user = await fetchUser();
      if (user) {
        console.log('로그인됨: ');
        const isCompleted = await hasSurveyRecord(user.id);
        setIsSurveyCompleted(isCompleted);
      } else {
        console.log('로그인 안됨');
        const isCompleted = !!localStorage.getItem('surveyData');
        setIsSurveyCompleted(isCompleted);
      }
    };

    checkSurveyRecord();
  }, []);

  console.log('isComplted: ', isSurveyCompleted);

  return <>{isSurveyCompleted ? <AfterBanner /> : <BeforeBanner />}</>;
};

export default Banner;
