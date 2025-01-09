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
    <div className="fixed bottom-0 left-0 flex w-full flex-col items-center space-y-4 bg-white p-4">
      <button
        className={`w-full rounded-lg py-3 ${
          disabled
            ? 'cursor-not-allowed bg-gray-300 text-gray-500'
            : 'bg-black text-white'
        }`}
        onClick={onClick}
        disabled={disabled}
      >
        {content}
      </button>
      <button className="text-sm text-gray-500 underline">그만할래요</button>
    </div>
  );
};

export default StepButton;
