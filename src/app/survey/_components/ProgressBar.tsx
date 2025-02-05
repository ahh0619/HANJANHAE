type ProgressBarProps = {
  currentStep: number;
};

const STEPS = [1, 2, 3, 4, 5, 6, 7];

const ProgressBar = ({ currentStep }: ProgressBarProps) => {
  return (
    <div className="relative mt-0 flex h-[20px] w-full items-center px-[20px]">
      {/* 전체 선  */}
      <div className="absolute left-1/2 right-1/2 top-0 h-[2px] w-[calc(100%-40px)] -translate-x-1/2 -translate-y-1/2 transform bg-gray-200" />

      {/* 동그라미 배치 */}
      <div className="relative flex w-full items-center justify-between">
        {STEPS.map((step) => (
          <p
            key={step}
            className={`relative z-10 flex h-[20px] w-[20px] -translate-y-1/2 transform items-center justify-center rounded-full border-2 text-[16.335px] font-bold leading-normal ${
              step === currentStep
                ? 'border-primary-200 bg-primary-200 text-white'
                : step < currentStep
                  ? 'border-gray-300 bg-gray-300' // 이전 단계
                  : 'border-gray-300 bg-white' // 이후 단계
            }`}
          >
            {step === currentStep ? step : ''}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
