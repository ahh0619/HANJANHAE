import useFilterStore from '@/store/filterStore';

const AlcholType = () => {
  const { selectedTypes, setSelectedTypes } = useFilterStore();
  const alcholList = [
    '탁주',
    '증류주',
    '청주',
    '약주',
    '리큐르',
    '과실주',
    '기타주류',
  ];

  const handleTypeToggle = (type: string) => {
    const updatedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((click) => click !== type)
      : [...selectedTypes, type];
    setSelectedTypes(updatedTypes);
  };

  return (
    <div className="mb-6">
      <h3 className="text-title-mb font-bold leading-[135%] text-grayscale-900">
        술 종류로 찾기 (중복선택 가능)
      </h3>
      <div className="flex flex-wrap gap-4 gap-y-3 pt-[16px]">
        {alcholList.map((type) => (
          <button
            key={type}
            onClick={() => handleTypeToggle(type)}
            className={`text-grayscale flex items-center justify-center rounded-[16px] border border-grayscale-500 bg-[var(--Etc-background)] p-[8px_12px] text-label-lm transition ${
              selectedTypes.includes(type)
                ? 'border-primary-100 bg-primary-100 text-grayscale-100'
                : 'text-grayscale border-grayscale-500 bg-[var(--Etc-background)]'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AlcholType;
