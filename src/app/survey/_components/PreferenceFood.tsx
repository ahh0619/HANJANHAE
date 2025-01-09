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
    <div className="flex flex-col items-center space-y-8 p-6">
      {/* 제목 */}
      <div className="relative w-full">
        <p className="absolute left-0" onClick={onPrev}>
          &lt;
        </p>
        <h1 className="text-center text-xl font-bold">내 취향 조사</h1>
      </div>

      {/* 진행바 */}
      <ProgressBar currentStep={7} />

      {/* 질문 */}
      <div className="text-center">
        <h3 className="text-lg font-semibold">
          선호하는 안주를 알려주세요. <br />
          어울리는 전통주를 추천해드려요.
        </h3>
      </div>

      <div className="flex items-center justify-center">
        <input
          type="text"
          placeholder="해물파전, 김치전, 도토리묵"
          className="w-80 rounded-lg border border-gray-300 px-4 py-2 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          value={selectedFood}
          onChange={onChange}
        />
      </div>

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
