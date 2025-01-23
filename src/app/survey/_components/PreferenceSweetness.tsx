import { useState } from 'react';

import { PreferenceTypeProps } from '@/types/surveyTypes';

import OptionItem from './OptionItem';
import ProgressBar from './ProgressBar';
import StepButton from './StepButton';

const PreferenceSweetness = ({
  onNext,
  onPrev,
  surveyData,
}: PreferenceTypeProps) => {
  const [selectedSweetness, setSelectedSweetness] = useState<string | null>(
    surveyData.sweetness || null,
  );

  const handleSelect = (sweetness: string) => {
    setSelectedSweetness(sweetness);
  };

  const handleNext = () => {
    if (selectedSweetness) {
      onNext({ sweetness: selectedSweetness });
    }
  };

  const options = [
    { value: '1', label: '매우 약함' },
    { value: '2', label: '약함' },
    { value: '3', label: '보통' },
    { value: '4', label: '강함' },
    { value: '5', label: '매우 강함' },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* 제목 */}
      <div className="relative mb-[32px] flex h-[44px] w-[375px] items-center px-[8px]">
        <img
          src={'/assets/icons/chevron-left.svg'}
          onClick={onPrev}
          className="absolute left-[8px] p-[8px]"
          width={'40px'}
          height={'40px'}
        />
        <h1 className="mx-auto text-title-xl text-grayscale-900">
          내 취향 조사
        </h1>
      </div>

      {/* 진행바 */}
      <ProgressBar currentStep={3} />

      {/* 질문 */}
      <div className="my-[56px] w-[335px]">
        <h3 className="text-title-lb text-grayscale-900">
          어느 정도의 단맛을 선호하시나요?
        </h3>
      </div>

      <div className="flex w-full justify-between px-[20px]">
        {options.map((option, index) => (
          <OptionItem
            key={option.value}
            value={option.value}
            label={option.label}
            isSelected={selectedSweetness === option.value}
            onSelect={handleSelect}
            showLabel={index % 2 === 0}
          />
        ))}
      </div>

      {/* 버튼 */}
      <StepButton
        content={'다음'}
        onClick={handleNext}
        disabled={!selectedSweetness}
      />
    </div>
  );
};

export default PreferenceSweetness;
