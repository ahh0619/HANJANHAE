'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { surveyProps } from '@/types/surveyTypes';

import PreferenceAcidity from './_components/PreferenceAcidity';
import PreferenceAlcoholLevel from './_components/PreferenceAlcoholLevel';
import PreferenceBody from './_components/PreferenceBody';
import PreferenceCarbonation from './_components/PreferenceCarbonation';
import PreferenceFood from './_components/PreferenceFood';
import PreferenceSweetness from './_components/PreferenceSweetness';
import PreferenceTypeSelection from './_components/PreferenceTypeSelection';
import Step from './_components/Step';

const Page = () => {
  const [surveyData, setSurveyData] = useState<surveyProps>({
    type: null,
    alcoholLevel: null,
    sweetness: null,
    acidity: null,
    carbonation: null,
    body: null,
    food: null,
  });
  const [step, setStep] = useState<string>('주종');

  const router = useRouter();

  useEffect(() => {
    if (step === '완료') {
      console.log('data: ', surveyData);
      router.push('/');
    }
  }, [step, router, surveyData]);

  const handleNext = (data: Partial<surveyProps>, nextStep: string) => {
    setSurveyData((prev) => ({ ...prev, ...data }));
    setStep(nextStep);
  };

  const handlePrev = (prevStep: string) => {
    setStep(prevStep);
  };

  return (
    <div>
      <Step name="주종" currentStep={step}>
        <PreferenceTypeSelection
          surveyData={surveyData}
          onNext={(data) => handleNext(data, '도수')}
          onPrev={() => router.push('/')}
        />
      </Step>
      <Step name="도수" currentStep={step}>
        <PreferenceAlcoholLevel
          surveyData={surveyData}
          onNext={(data) => handleNext(data, '단맛')}
          onPrev={() => handlePrev('주종')}
        />
      </Step>
      <Step name="단맛" currentStep={step}>
        <PreferenceSweetness
          surveyData={surveyData}
          onNext={(data) => handleNext(data, '신맛')}
          onPrev={() => handlePrev('도수')}
        />
      </Step>
      <Step name="신맛" currentStep={step}>
        <PreferenceAcidity
          surveyData={surveyData}
          onNext={(data) => handleNext(data, '청량감')}
          onPrev={() => handlePrev('단맛')}
        />
      </Step>
      <Step name="청량감" currentStep={step}>
        <PreferenceCarbonation
          surveyData={surveyData}
          onNext={(data) => handleNext(data, '바디감')}
          onPrev={() => handlePrev('신맛')}
        />
      </Step>
      <Step name="바디감" currentStep={step}>
        <PreferenceBody
          surveyData={surveyData}
          onNext={(data) => handleNext(data, '안주')}
          onPrev={() => handlePrev('청량감')}
        />
      </Step>
      <Step name="안주" currentStep={step}>
        <PreferenceFood
          surveyData={surveyData}
          onNext={(data) => handleNext(data, '완료')}
          onPrev={() => handlePrev('바디감')}
        />
      </Step>
    </div>
  );
};

export default Page;
