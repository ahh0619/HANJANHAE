import { memo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import AlcoholExplanationModal from '@/app/preferences/customization/_components/AlcoholExplanationModal';
import { PreferenceTypeProps } from '@/types/surveyTypes';

import MobileAlcoholExplanationModal from './MobileAlcoholExplanationModal';
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
  surveyData,
  handleTypeChange,
  onNext,
  onPrev,
}: PreferenceTypeProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Tailwind의 sm(640px) 기준으로 반응형 체크
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleNext = () => {
    onNext({ type: surveyData.type });
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

      <ProgressBar currentStep={1} />

      {/* 질문 */}
      <div className="mb-[32px] mt-[56px] w-[335px]">
        <h3 className="text-title-lb text-grayscale-900">
          어떤 종류의 술을 선호하시나요?
        </h3>
        <p className="text-title-lb text-grayscale-900">(중복 선택 가능)</p>
      </div>

      <div className="flex w-[375px] flex-wrap content-start items-start gap-x-[16px] gap-y-[12px] px-[20px]">
        {options.map((option) => (
          <button
            key={option}
            className={`h-[40px] rounded-[16px] border-[1px] px-[12px] py-[8px] text-label-lm ${
              surveyData.type?.split(',').includes(option)
                ? 'border-primary bg-primary text-grayscale-100'
                : 'border-grayscale-500 bg-white text-grayscale-900'
            } transition`}
            onClick={() => handleTypeChange(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="mt-[48px] flex h-[48px] w-full items-center px-[20px]">
        <p
          className="my-auto flex h-[24px] w-[147px] cursor-pointer items-center p-[12px] text-label-lm leading-[24px] text-grayscale-500"
          onClick={openModal}
        >
          주류용어설명
          <img
            src="/fi_alert-circle.svg"
            alt="설명 아이콘"
            className="ml-[8px] h-[24px] w-[24px]"
          />
        </p>
      </div>

      <StepButton
        content={'다음'}
        onClick={handleNext}
        disabled={!surveyData.type?.trim()}
      />

      {/* 모달 */}
      {isMobile ? (
        <MobileAlcoholExplanationModal
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      ) : (
        <AlcoholExplanationModal isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  );
};

export default memo(PreferenceTypeSelection);
