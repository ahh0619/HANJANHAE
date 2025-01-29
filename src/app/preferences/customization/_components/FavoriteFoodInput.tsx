const FavoriteFoodInput = ({ preferences, handleSelect }) => {
  return (
    <div className="mb-[60px] xl:mb-[148px]">
      {/* 제목 */}
      <label className="mb-[16px] block text-title-mb leading-[21.6px] text-grayscale-900 xl:text-title-lb">
        7. 선호하는 안주를 알려주세요. <br />
        어울리는 전통주를 추천해드려요.
      </label>

      <input
        type="text"
        value={preferences.food}
        onChange={(e) => handleSelect('food', e.target.value)}
        placeholder="예) 골뱅이무침"
        className="w-full rounded-[8px] border border-grayscale-300 p-3 text-caption-lm text-grayscale-900 focus:outline-none"
      />

      {/* 힌트 텍스트 */}
      <p className="mt-[4px] text-caption-sm text-grayscale-600">
        예) 해물파전, 김치전
      </p>
    </div>
  );
};

export default FavoriteFoodInput;
