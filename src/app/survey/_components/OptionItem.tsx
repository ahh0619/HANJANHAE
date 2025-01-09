type OptionItemProps = {
  value: string; // 옵션 값
  label?: string; // 라벨 텍스트
  range?: string; // 추가 텍스트
  isSelected: boolean;
  onSelect: (value: string) => void;
  showLabel?: boolean;
};

const OptionItem = ({
  value,
  label,
  range,
  isSelected,
  onSelect,
  showLabel = true,
}: OptionItemProps) => {
  return (
    <div
      className="flex cursor-pointer flex-col items-center"
      onClick={() => onSelect(value)}
    >
      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
          isSelected
            ? 'border-black bg-black text-white'
            : 'border-gray-300 bg-white text-transparent'
        }`}
      >
        {isSelected && (
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      {showLabel && label && (
        <span
          className={`mt-2 text-xs ${
            isSelected ? 'font-bold text-black' : 'text-gray-400'
          }`}
        >
          {label}
        </span>
      )}
      {range && (
        <span
          className={`text-xs ${
            isSelected ? 'font-bold text-black' : 'text-gray-400'
          }`}
        >
          {range}
        </span>
      )}
    </div>
  );
};

export default OptionItem;
