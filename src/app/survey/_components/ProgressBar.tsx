import React from 'react';

type ProgressBarProps = {
  currentStep: number;
};

const ProgressBar = ({ currentStep }: ProgressBarProps) => {
  const steps = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="flex items-center space-x-2">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full text-sm ${
              step === currentStep
                ? 'bg-black text-white' // 현재 단계 스타일
                : 'bg-gray-300 text-gray-500' // 기본 스타일
            }`}
          >
            {step}
          </span>

          {/* 마지막 원 뒤에는 선이 필요 없으므로*/}
          {index < steps.length - 1 && (
            <span className="h-[2px] w-5 bg-gray-300"></span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressBar;
