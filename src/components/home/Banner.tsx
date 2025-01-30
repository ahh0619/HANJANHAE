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
    <div className="flex w-full justify-center px-[20px] xl:p-0">
      {isSurveyCompleted ? <AfterBanner /> : <BeforeBanner />}
    </div>
  );
};

export default Banner;
