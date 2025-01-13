import { useState } from 'react';

import { PreferenceTypeProps } from '@/types/surveyTypes';

import ProgressBar from './ProgressBar';
import StepButton from './StepButton';

const PreferenceTypeSelection = ({
  onNext,
  onPrev,
  surveyData,
}: PreferenceTypeProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string>(
    Array.isArray(surveyData.type) ? surveyData.type.join(',') : '',
  );

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

  const options = [
    '탁주',
    '증류주',
    '청주',
    '약주',
    '리큐르',
    '과실주',
    '기타 주류',
  ];

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      {/* 제목 */}
      <div className="relative w-full">
        <p className="absolute left-0" onClick={onPrev}>
          &lt;
        </p>
        <h1 className="text-center text-xl font-bold">내 취향 조사</h1>
      </div>

      {/* 진행바 */}
      <ProgressBar currentStep={1} />

      {/* 질문 */}
      <div className="text-center">
        <h3 className="text-lg font-semibold">
          어떤 종류의 술을 선호하시나요?
        </h3>
        <p className="text-sm text-gray-500">(중복 선택 가능)</p>
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

      <span className="ml-5 w-full text-sm text-gray-500">
        술종류 <span className="underline">?</span>
      </span>

      {/* 버튼 */}
      <StepButton
        content={'다음'}
        onClick={handleNext}
        disabled={!selectedTypes.trim()}
      />
    </div>
  );
};

export default PreferenceTypeSelection;
