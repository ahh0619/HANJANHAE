import { useState } from 'react';

import { PreferenceTypeProps } from '@/types/surveyTypes';

import ProgressBar from './ProgressBar';
import StepButton from './StepButton';

const PreferenceFood = ({
  onNext,
  onPrev,
  surveyData,
}: PreferenceTypeProps) => {
  const [selectedFood, setSelectedFood] = useState<string>(
    surveyData.food || '',
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFood(e.target.value);
  };

  const handleNext = () => {
    if (selectedFood) {
      onNext({ food: selectedFood });
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* 제목 */}
      <div className="relative mb-[32px] flex h-[44px] w-full items-center">
        <div className="absolute left-[12px]">
          <img src={'/assets/icons/chevron-left.svg'} onClick={onPrev} />
        </div>
        <h1 className="mx-auto text-title-xl text-grayscale-900">
          내 취향 조사
        </h1>
      </div>

      {/* 진행바 */}
      <ProgressBar currentStep={7} />

      {/* 질문 */}
      <div className="mb-[32px] mt-[56px] w-full px-[20px]">
        <h3 className="text-title-lb text-grayscale-900">
          선호하는 안주를 알려주세요. <br />
          어울리는 전통주를 추천해드려요.
        </h3>
      </div>

      <input
        type="text"
        placeholder="여기에 안주를 입력해주세요"
        className="h-[48px] w-[335px] rounded-[8px] border border-grayscale-300 p-[12px] text-grayscale-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-gray-500"
        value={selectedFood}
        onChange={onChange}
      />

      <p className="mt-[4px] w-full px-[20px] text-caption-sm text-grayscale-600">
        예) 해물파전, 김치전
      </p>

      {/* 버튼 */}
      <StepButton
        content={'완료'}
        onClick={handleNext}
        disabled={!selectedFood}
      />
    </div>
  );
};

export default PreferenceFood;
