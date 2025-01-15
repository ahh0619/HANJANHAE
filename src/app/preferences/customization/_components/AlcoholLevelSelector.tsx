import OptionItem from '@/app/survey/_components/OptionItem';

const alcoholOptions = [
  { value: '저도수', range: '(6~15도)' },
  { value: '중간도수', range: '(15~30도)' },
  { value: '고도수', range: '(30도 이상)' },
];

const AlcoholLevelSelector = ({ preferences, handleSelect }) => {
  return (
    <div className="mb-6">
      <label className="mb-3 block text-lg font-medium">
        어느 정도 도수의 술을 선호하시나요?
      </label>
      <div className="flex w-full justify-between space-x-8">
        {alcoholOptions.map((option) => (
          <OptionItem
            key={option.value}
            value={option.value}
            label={option.value}
            range={option.range}
            isSelected={preferences.level === option.value}
            onSelect={(value) => handleSelect('level', value)}
          />
        ))}
      </div>
    </div>
  );
};

export default AlcoholLevelSelector;
