import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import usePreferences from '@/hooks/preference/usePreferences';
import useFunnel from '@/hooks/survey/useFunnel';
import { saveSurveyData } from '@/lib/recommendations';

import PreferenceAcidity from './PreferenceAcidity';
import PreferenceAlcoholLevel from './PreferenceAlcoholLevel';
import PreferenceBody from './PreferenceBody';
import PreferenceCarbonation from './PreferenceCarbonation';
import PreferenceFood from './PreferenceFood';
import PreferenceSweetness from './PreferenceSweetness';
import PreferenceTypeSelection from './PreferenceTypeSelection';

const MobilePreferencesSection = () => {
  const { Funnel, Step, next, prev, currentStep } = useFunnel('주종');
  const {
    preferences: surveyData,
    handlePreferenceChange,
    handleTypeChange,
    isLoading,
  } = usePreferences('create');
  const [submitError, setSubmitError] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (currentStep === '완료') {
      handleSubmit();
    }
  }, [currentStep]);

  if (isLoading) {
    return null;
  }

  if (submitError) {
    throw new Error(submitError);
  }

  const handleNext = (nextStep: string) => {
    next(nextStep);
  };

  const handlePrev = (prevStep: string) => {
    prev(prevStep);
  };

  const handleSubmit = async () => {
    try {
      await saveSurveyData(surveyData);
      router.push('/preferences/result');
    } catch (error) {
      setSubmitError(error.message);
    }
  };

  return (
    <Funnel currentStep={currentStep}>
      <Step name="주종">
        <PreferenceTypeSelection
          surveyData={surveyData}
          handleTypeChange={handleTypeChange}
          onNext={() => handleNext('도수')}
          onPrev={() => router.push('/')}
          currentStep={1}
        />
      </Step>
      <Step name="도수">
        <PreferenceAlcoholLevel
          surveyData={surveyData}
          handlePreferenceChange={handlePreferenceChange}
          onNext={() => handleNext('단맛')}
          onPrev={() => handlePrev('주종')}
          currentStep={2}
        />
      </Step>
      <Step name="단맛">
        <PreferenceSweetness
          surveyData={surveyData}
          handlePreferenceChange={handlePreferenceChange}
          onNext={() => handleNext('신맛')}
          onPrev={() => handlePrev('도수')}
          currentStep={3}
        />
      </Step>
      <Step name="신맛">
        <PreferenceAcidity
          surveyData={surveyData}
          handlePreferenceChange={handlePreferenceChange}
          onNext={() => handleNext('청량감')}
          onPrev={() => handlePrev('단맛')}
          currentStep={4}
        />
      </Step>
      <Step name="청량감">
        <PreferenceCarbonation
          surveyData={surveyData}
          handlePreferenceChange={handlePreferenceChange}
          onNext={() => handleNext('바디감')}
          onPrev={() => handlePrev('신맛')}
          currentStep={5}
        />
      </Step>
      <Step name="바디감">
        <PreferenceBody
          surveyData={surveyData}
          handlePreferenceChange={handlePreferenceChange}
          onNext={() => handleNext('안주')}
          onPrev={() => handlePrev('청량감')}
          currentStep={6}
        />
      </Step>
      <Step name="안주">
        <PreferenceFood
          surveyData={surveyData}
          handlePreferenceChange={handlePreferenceChange}
          onNext={() => handleNext('완료')}
          onPrev={() => handlePrev('바디감')}
          currentStep={7}
        />
      </Step>
    </Funnel>
  );
};

export default MobilePreferencesSection;
