import { memo } from 'react';

import { PreferenceTypeProps } from '@/types/surveyTypes';

import OptionItem from './OptionItem';
import PreferenceLayout from './PreferenceLayout';

const OPTIONS = [
  { value: '저도수', range: '(14도 이하)' },
  { value: '중간도수', range: '(15-30도)' },
  { value: '고도수', range: '(31도 이상)' },
];

const PreferenceAlcoholLevel = ({
  handlePreferenceChange,
  surveyData,
  onNext,
  onPrev,
  currentStep,
}: PreferenceTypeProps) => {
  const handleSelect = (level: string) => {
    handlePreferenceChange('level', level);
  };

  return (
    <PreferenceLayout
      onNext={onNext}
      onPrev={onPrev}
      question={'어느 정도 도수의 술을 선호하시나요?'}
      disabled={!surveyData.level}
      currentStep={currentStep}
    >
      <div className="flex w-full justify-between px-[20px]">
        {OPTIONS.map((option, index) => (
          <OptionItem
            key={option.value}
            value={option.value}
            label={option.value}
            range={option.range}
            index={index}
            isSelected={surveyData.level === option.value}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </PreferenceLayout>
  );
};

export default memo(PreferenceAlcoholLevel);
