type OptionItemProps = {
  value: string; // 옵션 값
  label?: string; // 라벨 텍스트
  isSelected: boolean; // 선택 여부
  range?: string;
  onSelect: (value: string) => void; // 선택 시 실행 함수
};

const OptionItem = ({
  value,
  label,
  isSelected,
  range,
  onSelect,
}: OptionItemProps) => {
  return (
    <label className="flex cursor-pointer flex-col items-center">
      <input
        type="radio"
        value={value}
        checked={isSelected}
        onChange={() => onSelect(value)}
        className="peer hidden h-[40px] w-[40px]"
      />
      {/* 라디오 버튼 */}
      <div
        className={`flex h-[32px] w-[32px] items-center justify-center rounded-full peer-checked:border-primary ${
          isSelected ? 'border-4' : 'border-2'
        }`}
      >
        <div
          className={`h-[18px] w-[18px] rounded-full ${
            isSelected ? 'bg-primary' : 'bg-transparent'
          }`}
        ></div>
      </div>
      {/* 라벨 텍스트 */}
      {label && (
        <span className={`mt-2 text-caption-mm text-grayscale-900`}>
          {label}
        </span>
      )}

      {range && (
        <span className={`text-caption-mm text-grayscale-900`}>{range}</span>
      )}
    </label>
  );
};

export default OptionItem;
