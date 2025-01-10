import useFilterStore from '@/store/filterStore';

const AlcholeStrength = () => {
  const { alcoholStrength, setAlcoholStrength } = useFilterStore();

  const handleStrengthChange = (strength: number) => {
    setAlcoholStrength(strength);
  };

  return (
    <div className="mb-6">
      <h3 className="mb-2 text-sm font-semibold">도수로 찾기</h3>
      <div className="flex items-center justify-between">
        {[1, 2, 3, 4, 5].map((level) => (
          <button
            key={level}
            onClick={() => handleStrengthChange(level)}
            className={`h-8 w-8 rounded-full text-center ${
              alcoholStrength === level
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {level * 10}%
          </button>
        ))}
      </div>
    </div>
  );
};

export default AlcholeStrength;
