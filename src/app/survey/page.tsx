'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import PreferenceAcidity from './_components/PreferenceAcidity';
import PreferenceAlcoholLevel from './_components/PreferenceAlcoholLevel';
import PreferenceBody from './_components/PreferenceBody';
import PreferenceCarbonation from './_components/PreferenceCarbonation';
import PreferenceFood from './_components/PreferenceFood';
import PreferenceSweetness from './_components/PreferenceSweetness';
import PreferenceTypeSelection from './_components/PreferenceTypeSelection';
import Step from './_components/Step';

const Page = () => {
  const [surveyData, setSurveyData] = useState({});
  const [step, setStep] = useState<string>('주종');

  const router = useRouter();

  useEffect(() => {
    if (step === '완료') {
      console.log('data: ', surveyData);
      router.push('/');
    }
  }, [step, router, surveyData]);

  const handleNext = (data: any, nextStep: string) => {
    setSurveyData((prev) => ({ ...prev, ...data }));
    setStep(nextStep);
  };

  const handlePrev = (prevStep: string) => {
    setStep(prevStep);
  };

  return (
    <div>
      <Step name="주종" currentStep={step}>
        <PreferenceTypeSelection onNext={(data) => handleNext(data, '도수')} />
      </Step>
      <Step name="도수" currentStep={step}>
        <PreferenceAlcoholLevel
          onNext={(data) => handleNext(data, '단맛')}
          onPrev={() => handlePrev('주종')}
        />
      </Step>
      <Step name="단맛" currentStep={step}>
        <PreferenceSweetness
          onNext={(data) => handleNext(data, '신맛')}
          onPrev={() => handlePrev('도수')}
        />
      </Step>
      <Step name="신맛" currentStep={step}>
        <PreferenceAcidity
          onNext={(data) => handleNext(data, '청량감')}
          onPrev={() => handlePrev('단맛')}
        />
      </Step>
      <Step name="청량감" currentStep={step}>
        <PreferenceCarbonation
          onNext={(data) => handleNext(data, '바디감')}
          onPrev={() => handlePrev('신맛')}
        />
      </Step>
      <Step name="바디감" currentStep={step}>
        <PreferenceBody
          onNext={(data) => handleNext(data, '안주')}
          onPrev={() => handlePrev('청량감')}
        />
      </Step>
      <Step name="안주" currentStep={step}>
        <PreferenceFood
          onNext={(data) => handleNext(data, '완료')}
          onPrev={() => handlePrev('바디감')}
        />
      </Step>
    </div>
  );
};

export default Page;
