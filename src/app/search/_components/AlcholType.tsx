import useFilterStore from '@/store/filterStore';

const AlcholType = () => {
  const { selectedTypes, setSelectedTypes } = useFilterStore();

  const handleTypeToggle = (type: string) => {
    const updatedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((click) => click !== type)
      : [...selectedTypes, type];
    setSelectedTypes(updatedTypes);
  };
  console.log(selectedTypes);

  return (
    <div className="mb-6">
      <h3 className="mb-2 text-sm font-semibold">
        술 종류로 찾기 (중복선택 가능)
      </h3>
      <div className="flex flex-wrap gap-2">
        {['탁주', '증류주', '청주', '약주', '리큐르', '과실주', '기타주류'].map(
          (type) => (
            <button
              key={type}
              onClick={() => handleTypeToggle(type)}
              className={`rounded-full px-4 py-1 text-sm transition ${
                selectedTypes.includes(type)
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {type}
            </button>
          ),
        )}
      </div>
    </div>
  );
};

export default AlcholType;
