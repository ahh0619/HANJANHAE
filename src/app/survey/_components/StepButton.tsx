type StepButtonProps = {
  content: string;
  onClick: () => void;
  disabled: boolean;
};

const StepButton = ({
  content,
  onClick,
  disabled = false,
}: StepButtonProps) => {
  return (
    <div className="fixed bottom-[60px] left-0 flex w-full flex-col items-center px-[20px]">
      <button
        className={`w-[335px] rounded-[8px] px-[16px] py-[12px] text-label-xlm ${
          disabled
            ? 'cursor-not-allowed bg-grayscale-200 text-grayscale-500'
            : 'bg-primary text-grayscale-100'
        }`}
        onClick={onClick}
        disabled={disabled}
      >
        {content}
      </button>
      <button className="mb-[20px] mt-[24px] h-[48px] text-label-lm text-grayscale-500 underline">
        그만할래요
      </button>
    </div>
  );
};

export default StepButton;
