import { useState } from 'react';

type PreferenceFoodProps = {
  onNext: (data: { food: string }) => void;
  onPrev: () => void;
};

const PreferenceFood = ({ onNext, onPrev }: PreferenceFoodProps) => {
  const [selectedFood, setSelectedFood] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFood(e.target.value);
  };

  const handleNext = () => {
    if (selectedFood) {
      onNext({ food: selectedFood });
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8 p-6">
      {/* 제목 */}
      <div className="relative w-full">
        <p className="absolute left-0" onClick={onPrev}>
          &lt;
        </p>
        <h1 className="text-center text-xl font-bold">내 취향 조사</h1>
      </div>

      {/* 진행바 */}
      <div className="flex items-center space-x-2">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 text-sm text-gray-500">
          1
        </span>
        <span className="h-[2px] w-5 bg-gray-300"></span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 text-sm text-gray-500">
          2
        </span>
        <span className="h-[2px] w-5 bg-gray-300"></span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 text-sm text-gray-500">
          3
        </span>
        <span className="h-[2px] w-5 bg-gray-300"></span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 text-sm text-gray-500">
          4
        </span>
        <span className="h-[2px] w-5 bg-gray-300"></span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 text-sm text-gray-500">
          5
        </span>
        <span className="h-[2px] w-5 bg-gray-300"></span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 text-sm text-gray-500">
          6
        </span>
        <span className="h-[2px] w-5 bg-gray-300"></span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-sm text-white">
          7
        </span>
      </div>

      {/* 질문 */}
      <div className="text-center">
        <h3 className="text-lg font-semibold">
          선호하는 안주를 알려주세요. <br />
          어울리는 전통주를 추천해드려요.
        </h3>
      </div>

      <div className="flex items-center justify-center">
        <input
          type="text"
          placeholder="해물파전, 김치전, 도토리묵"
          className="w-80 rounded-lg border border-gray-300 px-4 py-2 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          value={selectedFood}
          onChange={onChange}
        />
      </div>

      {/* 버튼 */}
      <div className="fixed bottom-0 left-0 flex w-full flex-col items-center space-y-4 bg-white p-4">
        <button
          className={`w-full rounded-lg py-3 ${
            selectedFood
              ? 'bg-black text-white'
              : 'cursor-not-allowed bg-gray-300 text-gray-500'
          }`}
          onClick={handleNext}
          disabled={!selectedFood}
        >
          완료
        </button>
        <button className="text-sm text-gray-500 underline">그만할래요</button>
      </div>
    </div>
  );
};

export default PreferenceFood;
