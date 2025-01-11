'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import useFunnel from '@/hooks/useFunnel';
import { surveyProps } from '@/types/surveyTypes';

import PreferenceAcidity from './_components/PreferenceAcidity';
import PreferenceAlcoholLevel from './_components/PreferenceAlcoholLevel';
import PreferenceBody from './_components/PreferenceBody';
import PreferenceCarbonation from './_components/PreferenceCarbonation';
import PreferenceFood from './_components/PreferenceFood';
import PreferenceSweetness from './_components/PreferenceSweetness';
import PreferenceTypeSelection from './_components/PreferenceTypeSelection';

const Page = () => {
  const { Funnel, Step, next, prev, currentStep } = useFunnel('주종');
  const [surveyData, setSurveyData] = useState<surveyProps>({
    type: null,
    level: null,
    sweetness: null,
    acidity: null,
    carbonation: null,
    body: null,
    food: null,
  });

  const router = useRouter();

  useEffect(() => {
    if (currentStep === '완료') {
      console.log('data: ', surveyData);
      // 비로그인 유저 - 로컬스토리지 저장
      localStorage.setItem('surveyData', JSON.stringify(surveyData));
      // 로그인 유저 - 슈퍼베이스 테이블에 저장
      router.push('/result');
    }
  }, [currentStep, router, surveyData]);

  const handleNext = (data: Partial<surveyProps>, nextStep: string) => {
    setSurveyData((prev) => ({ ...prev, ...data }));
    next(nextStep);
  };

  const handlePrev = (prevStep: string) => {
    prev(prevStep);
  };

  return (
    <Funnel>
      <Step name="주종">
        <PreferenceTypeSelection
          surveyData={surveyData}
          onNext={(data) => handleNext(data, '도수')}
          onPrev={() => router.push('/')}
        />
      </Step>
      <Step name="도수">
        <PreferenceAlcoholLevel
          surveyData={surveyData}
          onNext={(data) => handleNext(data, '단맛')}
          onPrev={() => handlePrev('주종')}
        />
      </Step>
      <Step name="단맛">
        <PreferenceSweetness
          surveyData={surveyData}
          onNext={(data) => handleNext(data, '신맛')}
          onPrev={() => handlePrev('도수')}
        />
      </Step>
      <Step name="신맛">
        <PreferenceAcidity
          surveyData={surveyData}
          onNext={(data) => handleNext(data, '청량감')}
          onPrev={() => handlePrev('단맛')}
        />
      </Step>
      <Step name="청량감">
        <PreferenceCarbonation
          surveyData={surveyData}
          onNext={(data) => handleNext(data, '바디감')}
          onPrev={() => handlePrev('신맛')}
        />
      </Step>
      <Step name="바디감">
        <PreferenceBody
          surveyData={surveyData}
          onNext={(data) => handleNext(data, '안주')}
          onPrev={() => handlePrev('청량감')}
        />
      </Step>
      <Step name="안주">
        <PreferenceFood
          surveyData={surveyData}
          onNext={(data) => handleNext(data, '완료')}
          onPrev={() => handlePrev('바디감')}
        />
      </Step>
    </Funnel>
  );
};

export default Page;
