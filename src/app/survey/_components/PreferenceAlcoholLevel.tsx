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
    surveyData.level || null,
  );

  const handleSelect = (level: string) => {
    setSelectedLevel(level);
  };

  const handleNext = () => {
    if (selectedLevel) {
      onNext({ level: selectedLevel });
    }
  };

  const options = [
    { value: '저도수', range: '(6~15도)' },
    { value: '중간도수', range: '(15~30도)' },
    { value: '고도수', range: '(30도 이상)' },
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
      <ProgressBar currentStep={2} />
      {/* 질문 */}
      <div className="my-[56px] flex w-[335px]">
        <h3 className="text-title-lb text-grayscale-900">
          어느 정도 도수의 술을 선호하시나요?
        </h3>
      </div>

      <div className="flex w-full justify-between px-[20px]">
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
