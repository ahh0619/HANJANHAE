type ProgressBarProps = {
  currentStep: number;
};

const ProgressBar = ({ currentStep }: ProgressBarProps) => {
  const steps = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="mt-[0px] flex h-[20px] w-[375px] px-[20px]">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          {/* 동그라미 */}
          <p
            className={`flex items-center justify-center rounded-full border-2 text-[16.335px] font-bold leading-normal ${
              step === currentStep
                ? 'h-[20px] w-[20px] border-primary-200 bg-primary-200 text-white' // 현재 단계
                : step < currentStep
                  ? 'h-[10px] w-[10px] border-gray-300 bg-gray-300' // 이전 단계
                  : 'h-[10px] w-[10px] border-gray-300 bg-white' // 이후 단계
            }`}
          >
            {step === currentStep ? step : ''}
          </p>

          {/* 선 */}
          {index < steps.length - 1 && (
            <div
              className={`h-[2px] w-[42.5px] ${
                step < currentStep ? 'bg-gray-300' : 'bg-gray-200'
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
