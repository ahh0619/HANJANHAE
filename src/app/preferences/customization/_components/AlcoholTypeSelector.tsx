const alcoholTypes = [
  { key: '탁주', label: '탁주' },
  { key: '증류주', label: '증류주' },
  { key: '청주', label: '청주' },
  { key: '약주', label: '약주' },
  { key: '리큐르', label: '리큐르' },
  { key: '과실주', label: '과실주' },
  { key: '기타주류', label: '기타주류' },
];

const AlcoholTypeSelector = ({ preferences, handleTypeChange }) => {
  return (
    <div className="mb-10 w-full xl:mb-[72px]">
      {/* 제목 */}
      <label className="mb-[16px] block text-title-mb xl:mb-[20px] xl:text-title-lb">
        1. 어떤 종류의 술을 선호하시나요?
        <span className="ml-1 inline xl:block xl:before:content-['\2002']">
          (중복선택 가능)
        </span>
      </label>
      {/* 버튼 목록 */}
      <div className="flex h-[92px] w-[311px] flex-wrap gap-x-[16px] gap-y-[12px]">
        {alcoholTypes.map((type) => (
          <button
            key={type.key}
            onClick={() => handleTypeChange(type.key)}
            className={`flex items-center justify-center rounded-full border px-[12px] py-[8px] text-label-lm leading-5 ${
              preferences?.type?.includes(type.key)
                ? 'border-transparent bg-primary-100 text-grayscale-50'
                : 'border-grayscale-500 bg-white text-grayscale-900'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AlcoholTypeSelector;
