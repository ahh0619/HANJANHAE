import Image from 'next/image';

import { PreferenceTypeProps } from '@/types/surveyTypes';

import PreferenceLayout from './PreferenceLayout';

const PreferenceFood = ({
  onNext,
  onPrev,
  handlePreferenceChange,
  surveyData,
  currentStep,
}: PreferenceTypeProps) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handlePreferenceChange('food', e.target.value);
  };

  const clearInput = () => {
    handlePreferenceChange('food', '');
  };

  return (
    <PreferenceLayout
      onNext={onNext}
      onPrev={onPrev}
      question="선호하는 안주를 알려주세요."
      subquestion="어울리는 전통주를 추천해드려요."
      disabled={!surveyData.food}
      currentStep={currentStep}
    >
      {/* 선택 옵션 */}
      <div className="relative w-[335px]">
        <input
          type="text"
          placeholder="여기에 안주를 입력해주세요"
          className="h-[48px] w-full rounded-[8px] border border-grayscale-300 p-[12px] text-grayscale-900 focus:outline-none"
          value={surveyData.food}
          onChange={onChange}
        />

        {/* X 버튼 */}
        {surveyData.food && (
          <Image
            src="/assets/icons/cancel.svg"
            className="absolute right-[11px] top-1/2 h-[40px] w-[40px] -translate-y-1/2 transform p-[8px]"
            alt="초기화 아이콘"
            width={24}
            height={24}
            onClick={clearInput}
            style={{
              filter: 'invert(0%) brightness(0%)',
            }}
          />
        )}
      </div>

      <p className="mt-[4px] w-full px-[20px] text-caption-sm text-grayscale-600">
        예) 해물파전, 김치전
      </p>
    </PreferenceLayout>
  );
};

export default PreferenceFood;
