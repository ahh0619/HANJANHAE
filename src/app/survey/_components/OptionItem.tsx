type OptionItemProps = {
  value: string;
  label: string;
  isSelected: boolean;
  index?: number;
  range?: string;
  onSelect: (value: string) => void;
};

const getAlignment = (index?: number) => {
  if (index === undefined) return 'flex flex-col items-center';
  const alignments = [
    'flex flex-col items-start',
    'flex flex-col items-center',
    'flex flex-col items-end',
  ];
  return alignments[index] || '';
};

const OptionItem = ({
  value,
  label,
  isSelected,
  range,
  index,
  onSelect,
}: OptionItemProps) => {
  const alignment = getAlignment(index);

  return (
    <label className={`flex cursor-pointer flex-col ${alignment}`}>
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
      <div
        className={`mt-2 text-caption-mm text-grayscale-900 ${index === undefined ? 'text-center' : alignment}`}
      >
        <p>{label}</p>
        {range && <p>{range}</p>}
      </div>
    </label>
  );
};

export default OptionItem;
