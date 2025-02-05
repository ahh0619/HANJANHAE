import OptimizedImage from '@/components/common/OptimizedImage';
import { PreferenceProps } from '@/types/preferences';

const FavoriteFoodInput = ({ preferences, handleSelect }: PreferenceProps) => {
  const clearInput = () => {
    handleSelect('food', '');
  };

  return (
    <div className="mb-[60px] xl:mb-[148px]">
      {/* 제목 */}
      <label className="mb-[16px] block text-title-mb leading-[21.6px] text-grayscale-900 xl:mb-[20px] xl:text-title-lb">
        7. 선호하는 안주를 알려주세요. <br />
        어울리는 전통주를 추천해드려요.
      </label>

      <div className="relative">
        <input
          type="text"
          value={preferences.food}
          onChange={(e) => handleSelect('food', e.target.value)}
          placeholder="여기에 안주를 입력해주세요"
          className="w-full rounded-[8px] border border-grayscale-300 p-3 text-caption-lm text-grayscale-900 focus:border-grayscale-900 focus:outline-none"
        />

        {preferences.food && (
          <OptimizedImage
            src="/assets/icons/cancel.svg"
            className="absolute right-[11px] top-1/2 h-[40px] w-[40px] -translate-y-1/2 transform p-[8px]"
            alt="초기화 아이콘"
            width={24}
            height={24}
            onClick={clearInput}
            style={{
              filter: 'invert(0%) brightness(0%)',
            }}
          />
        )}
      </div>

      {/* 힌트 텍스트 */}
      <p className="mt-[4px] text-caption-sm text-grayscale-600">
        예) 해물파전, 김치전
      </p>
    </div>
  );
};

export default FavoriteFoodInput;
