import { memo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import AlcoholExplanationModal from '@/app/preferences/customization/_components/AlcoholExplanationModal';
import { PreferenceTypeProps } from '@/types/surveyTypes';

import MobileAlcoholExplanationModal from './MobileAlcoholExplanationModal';
import PreferenceLayout from './PreferenceLayout';

const OPTIONS = [
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
  currentStep,
}: PreferenceTypeProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Tailwind의 sm(640px) 기준으로 반응형 체크
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <PreferenceLayout
        onNext={onNext}
        onPrev={onPrev}
        question="어떤 종류의 술을 선호하시나요?"
        subquestion="(중복 선택 가능)"
        disabled={!surveyData.type?.trim()}
        currentStep={currentStep}
      >
        <div className="flex w-[375px] flex-wrap content-start items-start gap-x-[16px] gap-y-[12px] px-[20px]">
          {OPTIONS.map((option) => (
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
      </PreferenceLayout>

      {/* 모달 */}
      {isMobile ? (
        <MobileAlcoholExplanationModal
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      ) : (
        <AlcoholExplanationModal isOpen={isModalOpen} onClose={closeModal} />
      )}
    </>
  );
};

export default memo(PreferenceTypeSelection);
