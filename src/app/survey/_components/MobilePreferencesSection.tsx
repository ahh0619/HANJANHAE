import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import usePreferences from '@/hooks/preference/usePreferences';
import useFunnel from '@/hooks/survey/useFunnel';

import PreferenceAcidity from './PreferenceAcidity';
import PreferenceAlcoholLevel from './PreferenceAlcoholLevel';
import PreferenceBody from './PreferenceBody';
import PreferenceCarbonation from './PreferenceCarbonation';
import PreferenceFood from './PreferenceFood';
import PreferenceSweetness from './PreferenceSweetness';
import PreferenceTypeSelection from './PreferenceTypeSelection';

// 1. Funnel 패턴의 각 단계에 불필요한 state가 계속 존재한다. -> surveryData로만 관리하는 것이 좋겠다.
// 2. surveyData는 usePreferences의 preferences state와 구조가 동일하다. -> 변경 로직도 동일하다.
// 3. 다른 부분은 useEffect 부분이 다르다
//    -> 모바일 버전 컴포넌트, 데스크탑 버전 컴포넌트를 따로 만들어 useEffect는 따로 사용한다.
const MobilePreferencesSection = () => {
  const { Funnel, Step, next, prev, currentStep } = useFunnel('주종');
  const {
    preferences: surveyData,
    handlePreferenceChange,
    handleTypeChange,
    handleSubmit,
    isLoading,
    error,
  } = usePreferences('create');

  const router = useRouter();

  useEffect(() => {
    if (currentStep === '완료') {
      handleSubmit();
    }
  }, [currentStep, handleSubmit]);

  if (isLoading) {
    return null;
  }

  if (error) {
    throw new Error(error);
  }

  const handleNext = (nextStep: string) => {
    next(nextStep);
  };

  const handlePrev = (prevStep: string) => {
    prev(prevStep);
  };

  return (
    <div className="flex w-full justify-center">
      <Funnel currentStep={currentStep}>
        <Step name="주종">
          <PreferenceTypeSelection
            surveyData={surveyData}
            handleTypeChange={handleTypeChange}
            onNext={() => handleNext('도수')}
            onPrev={() => router.push('/')}
          />
        </Step>
        <Step name="도수">
          <PreferenceAlcoholLevel
            surveyData={surveyData}
            handlePreferenceChange={handlePreferenceChange}
            onNext={() => handleNext('단맛')}
            onPrev={() => handlePrev('주종')}
          />
        </Step>
        <Step name="단맛">
          <PreferenceSweetness
            surveyData={surveyData}
            handlePreferenceChange={handlePreferenceChange}
            onNext={() => handleNext('신맛')}
            onPrev={() => handlePrev('도수')}
          />
        </Step>
        <Step name="신맛">
          <PreferenceAcidity
            surveyData={surveyData}
            handlePreferenceChange={handlePreferenceChange}
            onNext={() => handleNext('청량감')}
            onPrev={() => handlePrev('단맛')}
          />
        </Step>
        <Step name="청량감">
          <PreferenceCarbonation
            surveyData={surveyData}
            handlePreferenceChange={handlePreferenceChange}
            onNext={() => handleNext('바디감')}
            onPrev={() => handlePrev('신맛')}
          />
        </Step>
        <Step name="바디감">
          <PreferenceBody
            surveyData={surveyData}
            handlePreferenceChange={handlePreferenceChange}
            onNext={() => handleNext('안주')}
            onPrev={() => handlePrev('청량감')}
          />
        </Step>
        <Step name="안주">
          <PreferenceFood
            surveyData={surveyData}
            handlePreferenceChange={handlePreferenceChange}
            onNext={() => handleNext('완료')}
            onPrev={() => handlePrev('바디감')}
          />
        </Step>
      </Funnel>
    </div>
  );
};

export default MobilePreferencesSection;
