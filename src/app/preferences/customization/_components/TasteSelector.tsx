import OptionItem from '@/app/survey/_components/OptionItem';

const tasteAttributes = [
  { key: 'sweetness', label: '단맛' },
  { key: 'acidity', label: '신맛' },
  { key: 'carbonation', label: '청량감' },
  { key: 'body', label: '무게감(바디감)' },
];

const intensityOptions = [
  { value: '1', label: '매우 약함' },
  { value: '2', label: '약함' },
  { value: '3', label: '보통' },
  { value: '4', label: '강함' },
  { value: '5', label: '매우 강함' },
];

const TasteSelector = ({ preferences, handleSelect }) => {
  return (
    <>
      {tasteAttributes.map((attr) => (
        <div className="mb-10" key={attr.key}>
          <label className="mb-[16px] block text-title-mb text-grayscale-900">
            {attr.label}으로 찾기
          </label>
          <div className="flex w-full justify-between space-x-8">
            {intensityOptions.map((option) => (
              <OptionItem
                key={option.value}
                value={option.value}
                label={option.label}
                isSelected={preferences[attr.key] === option.value}
                onSelect={(value) => handleSelect(attr.key, value)}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default TasteSelector;
