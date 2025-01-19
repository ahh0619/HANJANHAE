import { useState } from 'react';

import BackButton from '@/components/common/BackButton';
import { PreferenceTypeProps } from '@/types/surveyTypes';

import Popup from './Popup';
import ProgressBar from './ProgressBar';
import StepButton from './StepButton';

const options = [
  '탁주',
  '증류주',
  '청주',
  '약주',
  '리큐르',
  '과실주',
  '기타 주류',
];

const PreferenceTypeSelection = ({
  onNext,
  surveyData,
}: PreferenceTypeProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string>(
    surveyData.type || '',
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    document.body.style.overflow = 'hidden'; // 외부 스크롤 차단
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    document.body.style.overflow = ''; // 외부 스크롤 복원
    setIsPopupOpen(false);
  };

  const toggleSelection = (type: string) => {
    const typesArray = selectedTypes ? selectedTypes.split(',') : [];
    if (typesArray.includes(type)) {
      setSelectedTypes(typesArray.filter((item) => item !== type).join(','));
    } else {
      setSelectedTypes([...typesArray, type].join(','));
    }
  };

  const handleNext = () => {
    const typesString = selectedTypes
      .split(',')
      .filter((type) => type.trim() !== '')
      .join(',');
    onNext({ type: typesString });
  };

  return (
    <div className="flex flex-col items-center">
      {/* 제목 */}
      <div className="relative mb-[32px] flex h-[44px] w-full items-center">
        <div className="absolute left-[12px]">
          <BackButton />
        </div>
        <h1 className="mx-auto text-title-xl text-grayscale-900">
          내 취향 조사
        </h1>
      </div>

      <ProgressBar currentStep={1} />

      {/* 질문 */}
      <div className="mb-[32px] mt-[56px] w-full px-[20px]">
        <h3 className="text-title-lb text-grayscale-900">
          어떤 종류의 술을 선호하시나요?
        </h3>
        <p className="text-title-lb text-grayscale-900">(중복 선택 가능)</p>
      </div>

      <div className="flex w-full flex-wrap content-start items-start gap-x-[16px] gap-y-[12px] px-[20px]">
        {options.map((option) => (
          <button
            key={option}
            className={`h-[40px] rounded-[16px] border-[1px] px-[12px] py-[8px] text-label-lm ${
              selectedTypes.split(',').includes(option)
                ? 'border-primary bg-primary text-grayscale-100'
                : 'border-grayscale-500 bg-white text-grayscale-900'
            } transition`}
            onClick={() => toggleSelection(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="mt-[48px] w-full px-[20px]">
        <p
          className="flex w-[147px] items-center p-[12px] text-label-lm text-grayscale-500"
          onClick={openPopup}
        >
          주류용어설명
          <img
            src="/fi_alert-circle.svg"
            alt="설명 아이콘"
            className="ml-[8px] h-[24px] w-[24px] cursor-pointer"
          />
        </p>
      </div>

      <StepButton
        content={'다음'}
        onClick={handleNext}
        disabled={!selectedTypes.trim()}
      />

      <Popup isOpen={isPopupOpen} onClose={closePopup} />
    </div>
  );
};

export default PreferenceTypeSelection;
