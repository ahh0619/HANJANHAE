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
  onPrev,
  surveyData,
}: PreferenceTypeProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string>(
    Array.isArray(surveyData.type) ? surveyData.type.join(',') : '',
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

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
      <div className="mt-[56px] w-full px-[20px]">
        <h3 className="text-lg font-semibold">
          어떤 종류의 술을 선호하시나요?
        </h3>
        <p className="text-lg">(중복 선택 가능)</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {options.map((option) => (
          <button
            key={option}
            className={`rounded-full border px-4 py-2 ${
              selectedTypes.split(',').includes(option)
                ? 'border-black bg-black text-white'
                : 'border-gray-300 bg-gray-100 text-gray-700'
            } transition`}
            onClick={() => toggleSelection(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <span className="ml-5 flex w-full items-center text-sm text-gray-500">
        주류용어설명
        <img
          src="/fi_alert-circle.svg"
          alt="설명 아이콘"
          className="ml-1 h-4 w-4 cursor-pointer"
          onClick={openPopup}
        />
      </span>

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
