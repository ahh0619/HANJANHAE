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
    <div className="mb-6">
      <label className="mb-3 flex items-center text-lg font-medium">
        어떤 종류의 술을 선호하시나요?{' '}
        <span className="ml-1 text-sm">(중복 선택 가능)</span>
      </label>
      <div className="flex flex-wrap gap-2">
        {alcoholTypes.map((type) => (
          <button
            key={type.key}
            onClick={() => handleTypeChange(type.key)}
            className={`rounded-full border px-4 py-2 ${
              preferences.types.includes(type.key)
                ? 'bg-black text-white'
                : 'border-gray-300 bg-white text-black'
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
