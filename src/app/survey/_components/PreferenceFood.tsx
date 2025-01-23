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

  const clearInput = () => {
    setSelectedFood('');
  };

  const handleNext = () => {
    if (selectedFood) {
      onNext({ food: selectedFood });
    }
  };

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
      <ProgressBar currentStep={7} />

      {/* 질문 */}
      <div className="mb-[32px] mt-[56px] w-[335px]">
        <h3 className="text-title-lb text-grayscale-900">
          선호하는 안주를 알려주세요. <br />
          어울리는 전통주를 추천해드려요.
        </h3>
      </div>

      {/* 입력창 */}
      <div className="relative w-[335px]">
        <input
          type="text"
          placeholder="여기에 안주를 입력해주세요"
          className="h-[48px] w-full rounded-[8px] border border-grayscale-300 p-[12px] text-grayscale-900 focus:outline-none"
          value={selectedFood}
          onChange={onChange}
        />
        {/* X 버튼 */}
        {selectedFood && (
          <img
            src="/assets/icons/cancel.svg"
            className="absolute right-[11px] top-1/2 h-[40px] w-[40px] -translate-y-1/2 transform p-[8px]"
            onClick={clearInput}
            style={{
              filter: 'invert(0%) brightness(0%)', // 블랙 색상 적용
            }}
          />
        )}
      </div>

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
