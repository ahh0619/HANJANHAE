import OptimizedImage from '@/components/common/OptimizedImage';
import { SurveyType } from '@/types/preferences';

import ProgressBar from './ProgressBar';
import StepButton from './StepButton';

type PreferenceLayoutProps = {
  children: React.ReactNode;
  onNext: (data: Partial<SurveyType>) => void;
  onPrev: () => void;
  question: string;
  subquestion?: string;
  disabled: boolean;
  currentStep: number;
};

const PreferenceLayout = ({
  children,
  onNext,
  onPrev,
  question,
  subquestion = null,
  disabled,
  currentStep,
}: PreferenceLayoutProps) => {
  return (
    <div className="flex flex-col items-center">
      {/* 제목 */}
      <div className="relative mb-[32px] flex h-[44px] w-[375px] items-center px-[8px]">
        <div className="absolute left-[8px] p-[8px]" onClick={onPrev}>
          <OptimizedImage
            src="/assets/icons/chevron-left.svg"
            alt="뒤로가기 아이콘"
            width={24}
            height={24}
          />
        </div>
        <h1 className="mx-auto text-title-xl text-grayscale-900">
          내 취향 조사
        </h1>
      </div>

      {/* 진행바 */}
      <ProgressBar currentStep={currentStep} />

      {/* 질문 */}
      <div className={`my-[56px] w-[335px] ${subquestion ? 'mb-[32px]' : ''}`}>
        <h3 className="text-title-lb text-grayscale-900">{question}</h3>
        {subquestion && (
          <p className="text-title-lb text-grayscale-900">{subquestion}</p>
        )}
      </div>

      {/* 선택 옵션 */}
      {children}

      {/* 버튼 */}
      <StepButton
        content={currentStep === 7 ? '완료' : '다음'}
        onClick={onNext}
        disabled={disabled}
      />
    </div>
  );
};

export default PreferenceLayout;
