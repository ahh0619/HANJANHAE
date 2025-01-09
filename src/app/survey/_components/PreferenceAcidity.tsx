import { useState } from 'react';

import { PreferenceTypeProps } from '@/types/surveyTypes';

import OptionItem from './OptionItem';
import ProgressBar from './ProgressBar';
import StepButton from './StepButton';

const PreferenceAcidity = ({
  onNext,
  onPrev,
  surveyData,
}: PreferenceTypeProps) => {
  const [selectedAcidity, setSelectedAcidity] = useState<string | null>(
    surveyData.acidity || null,
  );

  const handleSelect = (acidity: string) => {
    setSelectedAcidity(acidity);
  };

  const handleNext = () => {
    if (selectedAcidity) {
      onNext({ acidity: selectedAcidity });
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
    <div className="flex flex-col items-center space-y-8 p-6">
      {/* 제목 */}
      <div className="relative w-full">
        <p className="absolute left-0" onClick={onPrev}>
          &lt;
        </p>
        <h1 className="text-center text-xl font-bold">내 취향 조사</h1>
      </div>

      {/* 진행바 */}
      <ProgressBar currentStep={4} />

      {/* 질문 */}
      <div className="text-center">
        <h3 className="text-lg font-semibold">
          어느 정도의 신맛을 선호하시나요?
        </h3>
      </div>

      <div className="flex w-full justify-between space-x-8">
        {options.map((option, index) => (
          <OptionItem
            key={option.value}
            value={option.value}
            label={option.label}
            isSelected={selectedAcidity === option.value}
            onSelect={handleSelect}
            showLabel={index % 2 === 0}
          />
        ))}
      </div>

      {/* 버튼 */}
      <StepButton
        content={'다음'}
        onClick={handleNext}
        disabled={!selectedAcidity}
      />
    </div>
  );
};

export default PreferenceAcidity;
