import { memo } from 'react';

import { PreferenceTypeProps } from '@/types/surveyTypes';

import OptionItem from './OptionItem';
import PreferenceLayout from './PreferenceLayout';

const OPTIONS = [
  { value: '1', label: '매우 약함' },
  { value: '2', label: '약함' },
  { value: '3', label: '보통' },
  { value: '4', label: '강함' },
  { value: '5', label: '매우 강함' },
];

const PreferenceSweetness = ({
  onNext,
  onPrev,
  handlePreferenceChange,
  surveyData,
  currentStep,
}: PreferenceTypeProps) => {
  const handleSelect = (sweetness: string) => {
    handlePreferenceChange('sweetness', sweetness);
  };

  return (
    <PreferenceLayout
      onNext={onNext}
      onPrev={onPrev}
      question={'어느 정도의 단맛을 선호하시나요?'}
      disabled={!surveyData.sweetness}
      currentStep={currentStep}
    >
      <div className="flex w-full justify-between px-[20px]">
        {OPTIONS.map((option, index) => (
          <OptionItem
            key={option.value}
            value={option.value}
            label={option.label}
            isSelected={surveyData.sweetness === option.value}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </PreferenceLayout>
  );
};

export default memo(PreferenceSweetness);
