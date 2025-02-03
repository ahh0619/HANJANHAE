import OptionItem from '@/app/survey/_components/OptionItem';
import { PreferenceProps } from '@/types/preferences';

const ALCOHOL_OPTIONS = [
  {
    value: '저도수',
    range: '(14도 이하)',
  },
  {
    value: '중간도수',
    range: '(15-30도)',
  },
  {
    value: '고도수',
    range: '(31도 이상)',
  },
];

const AlcoholLevelSelector = ({
  preferences,
  handleSelect,
}: PreferenceProps) => {
  return (
    <div className="mb-10 xl:mb-[72px]">
      <label className="mb-[16px] block text-title-mb text-grayscale-900 xl:mb-[20px] xl:text-title-lb">
        2. 어느 정도 도수의 술을 선호하시나요?
      </label>
      <div className="flex w-full justify-between space-x-8">
        {ALCOHOL_OPTIONS.map((option, index) => (
          <OptionItem
            key={option.value}
            value={option.value}
            label={option.value}
            range={option.range}
            index={index}
            isSelected={preferences.level === option.value}
            onSelect={(value) => handleSelect('level', value)}
          />
        ))}
      </div>
    </div>
  );
};

export default AlcoholLevelSelector;
