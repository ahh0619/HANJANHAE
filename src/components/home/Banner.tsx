'use client';

import { useEffect } from 'react';

import { useSurveyStore } from '@/store/surveyStore';

import AfterBanner from './AfterBanner';
import BeforeBanner from './BeforeBanner';

const Banner = () => {
  const { isSurveyCompleted, fetchSurveyStatus } = useSurveyStore();

  useEffect(() => {
    fetchSurveyStatus();
  }, [fetchSurveyStatus]);

  return (
    <div className="justify-cente flex w-full px-[20px]">
      {isSurveyCompleted ? <AfterBanner /> : <BeforeBanner />}
    </div>
  );
};

export default Banner;
