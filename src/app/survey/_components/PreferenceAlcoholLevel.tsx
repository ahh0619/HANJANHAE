import { useState } from 'react';

import { PreferenceTypeProps } from '@/types/surveyTypes';

import OptionItem from './OptionItem';
import ProgressBar from './ProgressBar';
import StepButton from './StepButton';

const PreferenceAlcoholLevel = ({
  onNext,
  onPrev,
  surveyData,
}: PreferenceTypeProps) => {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(
    surveyData.alcoholLevel || null,
  );

  const handleSelect = (level: string) => {
    setSelectedLevel(level);
  };

  const handleNext = () => {
    if (selectedLevel) {
      onNext({ alcoholLevel: selectedLevel });
    }
  };

  const options = [
    { value: '저도수', range: '(6~15도)' },
    { value: '중간도수', range: '(15~30도)' },
    { value: '고도수', range: '(30도 이상)' },
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
      <ProgressBar currentStep={2} />

      {/* 질문 */}
      <div className="text-center">
        <h3 className="text-lg font-semibold">
          어느 정도 도수의 술을 선호하시나요?
        </h3>
      </div>

      <div className="flex w-full justify-between space-x-8">
        {options.map((option) => (
          <OptionItem
            key={option.value}
            value={option.value}
            label={option.value}
            range={option.range}
            isSelected={selectedLevel === option.value}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {/* 버튼 */}
      <StepButton
        content={'다음'}
        onClick={handleNext}
        disabled={!selectedLevel}
      />
    </div>
  );
};

export default PreferenceAlcoholLevel;
